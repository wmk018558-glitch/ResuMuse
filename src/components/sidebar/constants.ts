import { Sparkles, FileText, FolderKanban, MessageSquare } from "lucide-react";

export const NAV_ITEMS = [
  { to: "/", icon: Sparkles, label: "smart_generate" },
  { to: "/templates", icon: FileText, label: "templates" },
  { to: "/resumes", icon: FolderKanban, label: "my_resumes" },
  { to: "/chat", icon: MessageSquare, label: "ai_chat" },
] as const;
