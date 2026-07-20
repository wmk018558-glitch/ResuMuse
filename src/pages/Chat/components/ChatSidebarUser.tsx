import { useTranslation } from "react-i18next";
import { MoreHorizontal, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ChatSidebarUser() {
  const { t } = useTranslation("chat");

  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium">
          U
        </AvatarFallback>
      </Avatar>
      <span className="flex-1 text-sm font-medium truncate">
        {t("user")}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 shrink-0 inline-flex items-center justify-center rounded-lg hover:bg-accent/50 transition-colors text-muted-foreground">
            <MoreHorizontal className="icon-md" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top" className="w-48">
          <DropdownMenuLabel>{t("user")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <LayoutDashboard />
              <span>{t("console")}</span>
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              <span>{t("settings")}</span>
              <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <LogOut />
            <span>{t("logout")}</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
