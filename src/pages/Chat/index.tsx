import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useChat } from "@/hooks/useChat";
import { ChatSidebar } from "./components/ChatSidebar";
import { ChatArea } from "./components/ChatArea";

export default function ChatPage() {
  const {
    conversations,
    activeId,
    messages,
    isStreaming,
    streamingContent,
    streamingMessageId,
    createConversation,
    selectConversation,
    deleteConversation,
    sendMessage,
    stopStreaming,
  } = useChat();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNew = useCallback(() => {
    createConversation();
  }, [createConversation]);

  const handleSelect = useCallback(
    (id: string) => {
      selectConversation(id);
    },
    [selectConversation],
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteConversation(id);
    },
    [deleteConversation],
  );

  const handleSend = useCallback(
    (content: string) => {
      sendMessage(content);
    },
    [sendMessage],
  );

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          "lg:relative",
          // On mobile, sidebar is part of AppLayout overlay logic
          "hidden lg:block",
        )}
      >
        <ChatSidebar
          conversations={conversations}
          activeId={activeId}
          collapsed={sidebarCollapsed}
          onSelect={handleSelect}
          onDelete={handleDelete}
          onNew={handleNew}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        />
      </div>

      {/* Main Chat Area */}
      <ChatArea
        messages={messages}
        isStreaming={isStreaming}
        streamingContent={streamingContent}
        streamingMessageId={streamingMessageId}
        activeId={activeId}
        onSend={handleSend}
        onStop={stopStreaming}
      />
    </div>
  );
}
