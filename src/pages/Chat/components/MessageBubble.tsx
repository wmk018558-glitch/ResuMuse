import React from "react";
import { Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "./MarkdownRenderer";
import type { Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
  streamingContent?: string;
}

export const MessageBubble = React.memo(function MessageBubble({
  message,
  isStreaming = false,
  streamingContent = "",
}: MessageBubbleProps) {
  const isUser = message.role === "user";
  const displayContent = isStreaming
    ? message.content + streamingContent
    : message.content;

  return (
    <div
      className={cn(
        "flex gap-3 py-3 px-4 max-w-3xl mx-auto",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5",
          isUser
            ? "bg-muted"
            : "bg-gradient-to-br from-purple-500 to-blue-500",
        )}
      >
        {isUser ? (
          <User className="icon-sm text-foreground" />
        ) : (
          <Sparkles className="icon-sm text-white" />
        )}
      </div>

      {/* Bubble */}
      <div className={cn("min-w-0", isUser ? "max-w-[70%]" : "max-w-[85%]")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5",
            isUser
              ? "bg-muted/60 text-foreground rounded-tr-md"
              : "text-foreground",
          )}
        >
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
              {displayContent}
            </p>
          ) : isStreaming && !displayContent ? (
            <div className="flex items-center gap-1 py-0.5">
              <span className="flex gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          ) : isStreaming ? (
            <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
              {displayContent}
              <span className="inline-block w-1.5 h-4 bg-foreground/50 animate-pulse ml-0.5 align-middle" />
            </p>
          ) : (
            <MarkdownRenderer content={displayContent} />
          )}
        </div>
      </div>
    </div>
  );
},
(prevProps, nextProps) => {
  return (
    prevProps.message.id === nextProps.message.id &&
    prevProps.message.content === nextProps.message.content &&
    prevProps.isStreaming === nextProps.isStreaming &&
    prevProps.streamingContent === nextProps.streamingContent
  );
});
