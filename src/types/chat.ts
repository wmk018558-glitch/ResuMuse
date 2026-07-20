export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  createdAt: string; // ISO 8601
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string; // ISO 8601
  isStreaming?: boolean;
}

export type StreamEvent =
  | { type: "token"; content: string }
  | { type: "done"; messageId: string }
  | { type: "error"; error: string };

export type StreamingStatus = "idle" | "streaming" | "error";
