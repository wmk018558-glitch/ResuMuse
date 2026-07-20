import type { TFunction } from "i18next";
import type { Conversation } from "@/types/chat";

export type TimeGroup =
  | "today"
  | "yesterday"
  | "thisWeek"
  | "thisMonth"
  | "earlier";

export interface GroupedConversations {
  group: TimeGroup;
  label: string;
  conversations: Conversation[];
}

/**
 * 判断日期属于哪个时间段分组
 */
export function getTimeGroup(dateStr: string): TimeGroup {
  const now = new Date();
  const date = new Date(dateStr);

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  // 本周一
  const dayOfWeek = startOfToday.getDay();
  const startOfThisWeek = new Date(startOfToday);
  startOfThisWeek.setDate(
    startOfToday.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1),
  );

  // 本月1号
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  if (date >= startOfToday) return "today";
  if (date >= startOfYesterday) return "yesterday";
  if (date >= startOfThisWeek) return "thisWeek";
  if (date >= startOfThisMonth) return "thisMonth";
  return "earlier";
}

/**
 * 获取时间段分组标签
 */
export function getTimeGroupLabel(group: TimeGroup, t: TFunction): string {
  const map: Record<TimeGroup, string> = {
    today: t("today"),
    yesterday: t("yesterday"),
    thisWeek: t("this_week"),
    thisMonth: t("this_month"),
    earlier: t("earlier"),
  };
  return map[group];
}

/**
 * 将对话列表按时间分组排序
 * 返回有序的分组数组（今天 → 昨天 → 本周 → 本月 → 更早）
 * 空分组不会出现在结果中
 */
export function groupConversationsByTime(
  conversations: Conversation[],
  t: TFunction,
): GroupedConversations[] {
  const order: TimeGroup[] = [
    "today",
    "yesterday",
    "thisWeek",
    "thisMonth",
    "earlier",
  ];

  const map = new Map<TimeGroup, Conversation[]>();

  for (const conv of conversations) {
    const group = getTimeGroup(conv.updatedAt);
    const list = map.get(group) || [];
    list.push(conv);
    map.set(group, list);
  }

  return order
    .filter((group) => map.has(group) && map.get(group)!.length > 0)
    .map((group) => ({
      group,
      label: getTimeGroupLabel(group, t),
      conversations: map.get(group)!,
    }));
}

/**
 * 根据搜索关键词过滤对话
 */
export function filterConversations(
  conversations: Conversation[],
  query: string,
): Conversation[] {
  if (!query.trim()) return conversations;
  const lower = query.toLowerCase();
  return conversations.filter(
    (conv) =>
      conv.title.toLowerCase().includes(lower) ||
      conv.lastMessage.toLowerCase().includes(lower),
  );
}
