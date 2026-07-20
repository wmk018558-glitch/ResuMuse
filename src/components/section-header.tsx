import { type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { sectionHeaderVariants } from "@/lib/animations";

interface SectionHeaderProps {
  icon: LucideIcon;
  iconColor?: string;
  badgeText: string;
  title: string;
  description?: string;
}

export function SectionHeader({
  icon: Icon,
  iconColor = "text-blue-500",
  badgeText,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionHeaderVariants}
      className="flex gap-4 flex-col items-center"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm mx-auto">
        <Icon size={14} className={iconColor} />
        <span className="text-xs text-muted-foreground/90 text-center">
          {badgeText}
        </span>
      </div>
      <div className="flex gap-2 flex-col items-center text-center">
        <h2 className="section-heading">{title}</h2>
        {description && (
          <p className="section-subtitle">{description}</p>
        )}
      </div>
    </motion.div>
  );
}
