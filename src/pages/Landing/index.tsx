import { useTranslation } from "react-i18next";
import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { AppPeek } from "./components/AppPeek";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Hero />
      <StatsBar />
      <AppPeek />

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("landing:features_placeholder")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 功能卡片 */}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("landing:section_how_it_works")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 步骤卡片 */}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("landing:section_templates")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 模板卡片 */}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("landing:section_pricing")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* 定价卡片 */}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("landing:section_faq")}
          </h2>
          <div className="space-y-3">{/* FAQ 项 */}</div>
        </div>
      </section>
    </div>
  );
}
