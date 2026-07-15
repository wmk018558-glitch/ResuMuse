import { FileText, GitBranch, MessageSquare, Mic, Target, Upload } from "lucide-react";
import type { Variants } from "framer-motion";

export const FEATURES = [
  { icon: Upload, key: "parse", color: "#5b8def" },
  { icon: FileText, key: "editor", color: "#f97316" },
  { icon: MessageSquare, key: "chat", color: "#ec4899" },
  { icon: Target, key: "match", color: "#8b5cf6" },
  { icon: Mic, key: "interview", color: "#14b8a6" },
  { icon: GitBranch, key: "version", color: "#f43f5e" },
] as const;

export const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};
