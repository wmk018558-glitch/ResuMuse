import { ChatEmpty } from "./ChatEmpty";
import { ChatWelcome } from "./ChatWelcome";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import type { Message } from "@/types/chat";

interface ChatAreaProps {
  messages: Message[];
  isStreaming: boolean;
  streamingContent: string;
  streamingMessageId: string | null;
  activeId: string | null;
  onSend: (content: string) => void;
  onStop: () => void;
}

export function ChatArea({
  messages,
  isStreaming,
  streamingContent,
  streamingMessageId,
  activeId,
  onSend,
  onStop,
}: ChatAreaProps) {
  const showMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-full min-w-0 flex-1 bg-gradient-to-r from-background via-blue-50/40 to-sky-100/60 dark:from-background dark:via-blue-950/15 dark:to-sky-950/30">
      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {showMessages ? (
          <MessageList
            messages={messages}
            isStreaming={isStreaming}
            streamingContent={streamingContent}
            streamingMessageId={streamingMessageId || undefined}
          />
        ) : (
          <ChatWelcome onPromptClick={onSend} />
        )}
      </div>

      {/* Input Area */}
      <ChatInput
        onSend={onSend}
        onStop={onStop}
        isStreaming={isStreaming}
      />
    </div>
  );
}
