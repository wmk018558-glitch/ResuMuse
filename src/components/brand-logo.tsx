import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { box: "w-7 h-7 rounded-md", icon: "icon-sm" },
  md: { box: "w-8 h-8 rounded-lg", icon: "icon-lg" },
  lg: { box: "w-[76px] h-[76px] rounded-2xl", icon: "h-10 w-10" },
} as const;

export function BrandLogo({ size = "md", className }: BrandLogoProps) {
  const s = sizeMap[size];

  return (
    <div
      className={cn(
        "bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shrink-0",
        s.box,
        size === "lg" && "shadow-lg shadow-purple-500/25",
        className,
      )}
    >
      <Sparkles className={cn("text-white", s.icon)} />
    </div>
  );
}
