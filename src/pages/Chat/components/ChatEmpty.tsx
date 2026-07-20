import { useTranslation } from "react-i18next";
import { MessageSquare } from "lucide-react";

export function ChatEmpty() {
  const { t } = useTranslation("chat");

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <MessageSquare className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{t("select_conversation")}</h3>
    </div>
  );
}
