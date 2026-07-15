import { useTranslation } from "react-i18next";
import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { AppPeek } from "./components/AppPeek";
import { FeatureGrid } from "./components/FeatureGrid";
import { Step } from "./components/Step";
import { Testimonials } from "./components/Testimonials";
export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Hero />
      <StatsBar />
      <AppPeek />
      <FeatureGrid />

      <Step />

      <Testimonials />

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
