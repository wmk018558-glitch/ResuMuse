import { useTranslation } from "react-i18next";

export function LocaleToggle() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === "zh-CN";

  const toggle = () => {
    const next = isZh ? "en-US" : "zh-CN";
    i18n.changeLanguage(next);
    localStorage.setItem("i18nextLng", next);
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center px-6 w-8 h-8  rounded-md border border-input bg-background font-mono italic text-[10px] hover:bg-accent transition-colors"
      title={t(isZh ? "common:switch_to_en" : "common:switch_to_zh")}
    >
      <span
        className={
          isZh ? "text-foreground font-semibold " : "text-muted-foreground"
        }
      >
        Zh
      </span>
      <span className="text-muted-foreground/50 mx-[3px]">/</span>
      <span
        className={
          !isZh ? "text-foreground font-semibold" : "text-muted-foreground"
        }
      >
        En
      </span>
    </button>
  );
}
