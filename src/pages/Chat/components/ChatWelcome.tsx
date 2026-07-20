import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FileText, Search, MessageSquare, Target } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";

interface ChatWelcomeProps {
  onPromptClick: (prompt: string) => void;
}

const promptIcons = [FileText, Search, MessageSquare, Target];
const promptIconGradients = [
  "from-purple-500 to-blue-500",
  "from-blue-500 to-cyan-500",
  "from-orange-400 to-pink-500",
  "from-green-400 to-emerald-500",
];

const promptBgColors = [
  "bg-purple-50/60 dark:bg-purple-950/20",
  "bg-blue-50/60 dark:bg-blue-950/20",
  "bg-orange-50/60 dark:bg-orange-950/20",
  "bg-green-50/60 dark:bg-green-950/20",
];

export function ChatWelcome({ onPromptClick }: ChatWelcomeProps) {
  const { t } = useTranslation("chat");

  const prompts = [
    { title: t("suggested_1"), desc: t("suggested_1_desc") },
    { title: t("suggested_2"), desc: t("suggested_2_desc") },
    { title: t("suggested_3"), desc: t("suggested_3_desc") },
    { title: t("suggested_4"), desc: t("suggested_4_desc") },
  ];

  const handleClick = useCallback(
    (prompt: string) => {
      onPromptClick(prompt);
    },
    [onPromptClick],
  );

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
      {/* Large Logo */}
      <BrandLogo size="lg" className="mb-8" />

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-3">{t("welcome_title")}</h2>
      <p className="text-muted-foreground mb-10 max-w-md leading-relaxed">
        {t("welcome_subtitle")}
      </p>

      {/* Suggested Prompt Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full">
        {prompts.map((prompt, idx) => {
          const Icon = promptIcons[idx];
          return (
            <button
              key={idx}
              onClick={() => handleClick(prompt.title)}
              className={cn(
                "flex flex-col items-start gap-2 p-4 rounded-2xl border text-left transition-all",
                "hover:border-primary/50 hover:shadow-md",
                promptBgColors[idx],
              )}
            >
              <div
                className={cn(
                  "w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0",
                  promptIconGradients[idx],
                )}
              >
                <Icon className="icon-lg text-white" />
              </div>
              <span className="text-sm font-medium leading-snug">
                {prompt.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
