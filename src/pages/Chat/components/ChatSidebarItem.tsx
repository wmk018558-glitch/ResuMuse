import React, { useCallback } from "react";
import { MessageSquare, MoreHorizontal, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Conversation } from "@/types/chat";

interface ChatSidebarItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ChatSidebarItem = React.memo(function ChatSidebarItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
}: ChatSidebarItemProps) {
  const { t } = useTranslation("chat");

  const handleSelect = useCallback(() => {
    onSelect(conversation.id);
  }, [conversation.id, onSelect]);

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete(conversation.id);
    },
    [conversation.id, onDelete],
  );

  return (
    <div
      onClick={handleSelect}
      className={cn(
        "group flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all",
        isActive
          ? "bg-purple-50 dark:bg-[#1e2028] text-purple-700 dark:text-gray-300 shadow-sm"
          : "hover:bg-accent/50 text-foreground hover:shadow-sm",
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleSelect();
      }}
    >
      <MessageSquare
        className={cn(
          "icon-md",
          isActive
            ? "text-purple-500 dark:text-gray-400"
            : "text-muted-foreground",
        )}
      />

      <span className="text-sm truncate flex-1">{conversation.title}</span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "h-6 w-6 shrink-0 inline-flex items-center justify-center rounded-md transition-all",
              "opacity-0 group-hover:opacity-100",
              "hover:bg-accent text-muted-foreground",
            )}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <MoreHorizontal className="icon-md" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="right" className="w-40">
          <DropdownMenuItem
            onClick={handleDelete}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 />
            <span>{t("delete_conversation")}</span>
            <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
