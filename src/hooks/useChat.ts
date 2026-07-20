import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useReducer,
} from "react";
import type { Conversation, Message } from "@/types/chat";
import { chatApi } from "@/services/chat";

// ── State ──────────────────────────────────────────────────

interface ChatState {
  conversations: Conversation[];
  activeId: string | null;
  messages: Message[];
  isStreaming: boolean;
  streamingContent: string;
  streamingMessageId: string | null;
  error: string | null;
}

type ChatAction =
  | { type: "SET_CONVERSATIONS"; conversations: Conversation[] }
  | { type: "ADD_CONVERSATION"; conversation: Conversation }
  | { type: "REMOVE_CONVERSATION"; id: string }
  | { type: "SET_ACTIVE"; id: string | null }
  | { type: "SET_MESSAGES"; messages: Message[] }
  | { type: "ADD_MESSAGE"; message: Message }
  | { type: "START_STREAMING"; messageId: string }
  | { type: "APPEND_STREAM"; content: string }
  | { type: "END_STREAMING"; message: Message }
  | { type: "SET_ERROR"; error: string | null };

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "SET_CONVERSATIONS":
      return { ...state, conversations: action.conversations };
    case "ADD_CONVERSATION":
      return {
        ...state,
        conversations: [action.conversation, ...state.conversations],
        activeId: action.conversation.id,
        messages: [],
      };
    case "REMOVE_CONVERSATION":
      return {
        ...state,
        conversations: state.conversations.filter(
          (c) => c.id !== action.id,
        ),
        activeId:
          state.activeId === action.id ? null : state.activeId,
        messages:
          state.activeId === action.id ? [] : state.messages,
      };
    case "SET_ACTIVE":
      return { ...state, activeId: action.id };
    case "SET_MESSAGES":
      return { ...state, messages: action.messages };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.message] };
    case "START_STREAMING":
      return {
        ...state,
        isStreaming: true,
        streamingContent: "",
        streamingMessageId: action.messageId,
        error: null,
      };
    case "APPEND_STREAM":
      return {
        ...state,
        streamingContent: state.streamingContent + action.content,
      };
    case "END_STREAMING":
      return {
        ...state,
        isStreaming: false,
        streamingContent: "",
        streamingMessageId: null,
        messages: [...state.messages, action.message],
      };
    case "SET_ERROR":
      return { ...state, error: action.error, isStreaming: false };
    default:
      return state;
  }
}

const initialState: ChatState = {
  conversations: [],
  activeId: null,
  messages: [],
  isStreaming: false,
  streamingContent: "",
  streamingMessageId: null,
  error: null,
};

// ── Hook ───────────────────────────────────────────────────

export interface UseChatReturn {
  conversations: Conversation[];
  activeId: string | null;
  messages: Message[];
  isStreaming: boolean;
  streamingContent: string;
  streamingMessageId: string | null;
  error: string | null;
  createConversation: () => Promise<void>;
  selectConversation: (id: string) => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  stopStreaming: () => void;
}

export function useChat(): UseChatReturn {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const abortRef = useRef<AbortController | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingContentRef = useRef<string>("");

  // ── Load conversations on mount ──
  useEffect(() => {
    chatApi.getConversations().then((conversations) => {
      dispatch({ type: "SET_CONVERSATIONS", conversations });
    });
  }, []);

  // ── Cleanup on unmount ──
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Actions ──

  const createConversation = useCallback(async () => {
    const conv = await chatApi.createConversation();
    dispatch({ type: "ADD_CONVERSATION", conversation: conv });
  }, []);

  const selectConversation = useCallback(async (id: string) => {
    // Abort any ongoing stream
    abortRef.current?.abort();

    dispatch({ type: "SET_ACTIVE", id });
    const messages = await chatApi.getMessages(id);
    dispatch({ type: "SET_MESSAGES", messages });
  }, []);

  const deleteConversation = useCallback(async (id: string) => {
    await chatApi.deleteConversation(id);
    dispatch({ type: "REMOVE_CONVERSATION", id });
  }, []);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    dispatch({ type: "SET_ERROR", error: null });
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      let convId = state.activeId;

      // Create a conversation if none active
      if (!convId) {
        const conv = await chatApi.createConversation(
          content.slice(0, 50),
        );
        dispatch({ type: "ADD_CONVERSATION", conversation: conv });
        convId = conv.id;
      }

      // Optimistically add user message
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        conversationId: convId,
        role: "user",
        content,
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: "ADD_MESSAGE", message: userMsg });

      // Prepare streaming assistant message
      const streamingId = `assistant-${Date.now()}`;
      dispatch({ type: "START_STREAMING", messageId: streamingId });

      const controller = new AbortController();
      abortRef.current = controller;
      pendingContentRef.current = "";

      try {
        const generator = chatApi.streamMessage(convId, content);

        while (true) {
          const result = await generator.next();
          if (result.done) break;

          const event = result.value;
          if (event.type === "token") {
            pendingContentRef.current += event.content;

            // rAF batching: only dispatch once per frame
            if (!rafRef.current) {
              rafRef.current = requestAnimationFrame(() => {
                if (pendingContentRef.current) {
                  dispatch({
                    type: "APPEND_STREAM",
                    content: pendingContentRef.current,
                  });
                  pendingContentRef.current = "";
                }
                rafRef.current = null;
              });
            }
          } else if (event.type === "done") {
            // Flush any remaining pending content
            if (rafRef.current) {
              cancelAnimationFrame(rafRef.current);
              rafRef.current = null;
            }

            const fullContent =
              state.streamingContent + pendingContentRef.current;
            pendingContentRef.current = "";

            const assistantMsg: Message = {
              id: event.messageId,
              conversationId: convId,
              role: "assistant",
              content: fullContent,
              createdAt: new Date().toISOString(),
            };
            dispatch({ type: "END_STREAMING", message: assistantMsg });

            // Refresh conversation list to update title/preview
            chatApi.getConversations().then((conversations) => {
              dispatch({
                type: "SET_CONVERSATIONS",
                conversations,
              });
            });
          } else if (event.type === "error") {
            dispatch({ type: "SET_ERROR", error: event.error });
          }
        }
      } catch (err: any) {
        if (err.name === "AbortError") return;
        dispatch({
          type: "SET_ERROR",
          error: err.message || "Stream error",
        });
      }
    },
    [state.activeId, state.streamingContent],
  );

  return {
    conversations: state.conversations,
    activeId: state.activeId,
    messages: state.messages,
    isStreaming: state.isStreaming,
    streamingContent: state.streamingContent,
    streamingMessageId: state.streamingMessageId,
    error: state.error,
    createConversation,
    selectConversation,
    deleteConversation,
    sendMessage,
    stopStreaming,
  };
}
