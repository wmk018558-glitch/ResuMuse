import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NAV_GROUPS } from "./constants";

export function Footer() {
  const { t } = useTranslation();

  return (
    <div className="w-full py-20 lg:py-40 bg-background text-foreground border-t">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex gap-8 flex-col items-start">
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                {t("common:app_name")}
              </h2>
              <p className="text-lg max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                {t("footer:tagline")}
              </p>
            </div>
            <div className="flex gap-20 flex-row">
              <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-gray-400 text-left">
                <p>{t("footer:address_line1")}</p>
                <p>{t("footer:address_line2")}</p>
                <p>{t("footer:postal_code")}</p>
              </div>
              <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-gray-400 text-left">
                <Link to="/">{t("footer:terms")}</Link>
                <Link to="/">{t("footer:privacy")}</Link>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {NAV_GROUPS.map((group) => (
              <div
                key={group.titleKey}
                className="flex text-base gap-1 flex-col items-start"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-xl">{t(group.titleKey)}</p>
                  {group.items.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.href}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-400">
                        {subItem.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
