import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "bg-color": [
        "bg-popover",
        "bg-sidebar",
        "bg-sidebar-accent",
      ],
      "text-color": [
        "text-popover-foreground",
        "text-sidebar-foreground",
        "text-sidebar-accent-foreground",
      ],
      "border-color": [
        "border-sidebar",
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
