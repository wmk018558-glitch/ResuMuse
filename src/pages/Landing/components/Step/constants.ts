import { Upload, Sparkles, Target, Mic } from "lucide-react";

export const STEPS = [
  { step: "01", icon: Upload },
  { step: "02", icon: Sparkles },
  { step: "03", icon: Target },
  { step: "04", icon: Mic },
] as const;

import type { Variants } from "framer-motion";

export const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};
