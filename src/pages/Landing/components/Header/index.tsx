import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, MoveRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleToggle } from "@/components/locale-toggle";
import { BrandLogo } from "@/components/brand-logo";
import { NAV_ITEMS } from "./constants";

export function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-background border-b">
      <div className="container relative mx-auto min-h-16 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <div className="flex justify-start items-center gap-2">
          <a href="#" className="flex items-center gap-2 shrink-0">
            <BrandLogo />
            <span className="font-bold text-base lg:text-lg whitespace-nowrap">
              {t("common:app_name")}
            </span>
          </a>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center justify-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(`landing:${item.key}`)}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center justify-end gap-2">
          <ThemeToggle />
          <LocaleToggle />
          <Button variant="ghost" className="text-sm font-medium">
            {t("common:login")}
          </Button>
          <Button
            className="text-sm font-medium px-5"
            onClick={() => navigate("/chat")}
          >
            {t("common:free_start")}
          </Button>
        </div>

        {/* Mobile: Hamburger */}
        <div className="flex lg:hidden items-center justify-end gap-1">
          <ThemeToggle />
          <LocaleToggle />
          <Button variant="ghost" size="sm" className="text-sm font-medium">
            {t("common:login")}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t bg-background shadow-lg">
          <div className="container px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="flex justify-between items-center text-lg py-2"
                onClick={() => setOpen(false)}
              >
                <span>{t(`landing:${item.key}`)}</span>
                <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t">
              <Button variant="outline" className="w-full">
                {t("common:login")}
              </Button>
              <Button className="w-full" onClick={() => { setOpen(false); navigate("/chat"); }}>
                {t("common:free_start")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
