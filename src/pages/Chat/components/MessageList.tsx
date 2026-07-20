import { useEffect, useRef, useMemo, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import type { Message } from "@/types/chat";

interface MessageListProps {
  messages: Message[];
  isStreaming: boolean;
  streamingContent: string;
  streamingMessageId?: string;
}

export function MessageList({
  messages,
  isStreaming,
  streamingContent,
  streamingMessageId,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  // Auto-scroll on new messages or streaming content
  useEffect(() => {
    scrollToBottom();
  }, [messages.length, streamingContent, scrollToBottom]);

  const messageElements = useMemo(
    () =>
      messages.map((msg) => {
        const isLastAssistant =
          msg.role === "assistant" &&
          msg.id === messages[messages.length - 1]?.id;

        return (
          <MessageBubble
            key={msg.id}
            message={msg}
            isStreaming={isLastAssistant && isStreaming}
            streamingContent={
              isLastAssistant && msg.id === streamingMessageId
                ? streamingContent
                : ""
            }
          />
        );
      }),
    [messages, isStreaming, streamingContent, streamingMessageId],
  );

  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full">
        <div className="max-w-3xl mx-auto">
          {messageElements}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
    </div>
  );
}
