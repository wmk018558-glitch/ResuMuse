import { Sparkles, FileText, FolderKanban, MessageSquare } from "lucide-react";

export const NAV_ITEMS = [
  { icon: Sparkles, key: "smart_generate" },
  { icon: FileText, key: "templates" },
  { icon: FolderKanban, key: "my_resumes" },
  { icon: MessageSquare, key: "ai_chat" },
] as const;
