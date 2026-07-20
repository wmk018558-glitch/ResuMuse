import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MessageCirclePlus, Search, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChatSidebarItem } from "./ChatSidebarItem";
import { ChatSidebarUser } from "./ChatSidebarUser";
import { groupConversationsByTime, filterConversations } from "../utils";
import type { Conversation } from "@/types/chat";
import styles from "./ChatSidebar.module.css";

// Extracted Tailwind class combinations — used where CSS Module would conflict
// with shadcn/ui component CVA styles (due to CSS layer ordering in build output).
const SEARCH_INPUT =
  "pl-9 pr-8 h-10 text-sm rounded-3xl border bg-white shadow-md hover:shadow-lg focus:shadow-lg dark:bg-[#1a1d24] dark:shadow-lg dark:hover:shadow-xl dark:focus:shadow-xl transition-shadow duration-200 focus-visible:ring-0 focus-visible:ring-offset-0";

const ACCORDION_TRIGGER =
  "px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:no-underline transition-colors rounded-lg hover:bg-accent/40 data-[state=open]:text-foreground";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  collapsed: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
  onToggleCollapse: () => void;
}

export function ChatSidebar({
  conversations,
  activeId,
  collapsed,
  onSelect,
  onDelete,
  onNew,
}: ChatSidebarProps) {
  const { t } = useTranslation("chat");
  const [searchQuery, setSearchQuery] = useState("");

  // 搜索过滤
  const filteredConversations = useMemo(
    () => filterConversations(conversations, searchQuery),
    [conversations, searchQuery],
  );

  // 时间分组
  const groupedConversations = useMemo(
    () => groupConversationsByTime(filteredConversations, t),
    [filteredConversations, t],
  );

  // 搜索时默认展开所有分组；无搜索时默认展开"今天"和"昨天"
  const defaultExpanded = useMemo(() => {
    if (searchQuery.trim()) {
      return groupedConversations.map((g) => g.group);
    }
    return ["today", "yesterday"];
  }, [searchQuery, groupedConversations]);

  const handleSearchClear = useCallback(() => {
    setSearchQuery("");
  }, []);

  if (collapsed) {
    return null;
  }

  const hasResults = filteredConversations.length > 0;
  const isSearching = searchQuery.trim().length > 0;

  return (
    <aside className={styles.sidebar}>
      {/* ── Logo ── */}
      <Link to="/" className={styles.logoLink}>
        <BrandLogo />
        <span className="font-bold text-2xl tracking-tight">ResuMuse</span>
      </Link>

      {/* ── 新建对话 ── */}
      <div className="px-3 py-2 shrink-0">
        <button onClick={onNew} className={styles.newChatBtn}>
          <MessageCirclePlus className="icon-lg" />
          <span>{t("new_chat")}</span>
        </button>
      </div>
      {/* ── 搜索框 ── */}
      <div className={styles.searchWrap}>
        <div className="relative">
          <Search className={styles.searchIcon} />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("search_placeholder")}
            className={SEARCH_INPUT}
          />
          {searchQuery && (
            <button onClick={handleSearchClear} className={styles.clearBtn}>
              <X className="icon-sm" />
            </button>
          )}
        </div>
      </div>

      {/* ── 对话列表 ── */}
      <div className={styles.convList}>
        <ScrollArea className="h-full px-2">
          {/* 无对话空状态 */}
          {!hasResults && !isSearching && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              {t("no_conversations")}
            </p>
          )}

          {/* 搜索无结果 */}
          {!hasResults && isSearching && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              {t("no_search_results")}
            </p>
          )}

          {/* 时间分组 */}
          {hasResults && (
            <Accordion
              type="multiple"
              defaultValue={defaultExpanded}
              className="mt-1"
            >
              {groupedConversations.map(
                ({ group, label, conversations: items }) => (
                  <AccordionItem
                    key={group}
                    value={group}
                    className="border-none"
                  >
                    <AccordionTrigger className={ACCORDION_TRIGGER}>
                      <span>{label}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0.5">
                      <div className="flex flex-col gap-0.5">
                        {items.map((conv) => (
                          <ChatSidebarItem
                            key={conv.id}
                            conversation={conv}
                            isActive={conv.id === activeId}
                            onSelect={onSelect}
                            onDelete={onDelete}
                          />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ),
              )}
            </Accordion>
          )}
        </ScrollArea>
      </div>

      {/* ── 底部 ── */}
      <div className={styles.footer}>
        <ChatSidebarUser />
      </div>
    </aside>
  );
}
