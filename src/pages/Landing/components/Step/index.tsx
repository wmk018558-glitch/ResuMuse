import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/section-header";
import { STEPS, containerVariants, cardVariants } from "./constants";

export const Step = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full pt-20 relative overflow-hidden">
      {/* Background gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(var(--primary) / 0.04) 0%, transparent 70%)",
        }}
      />
      <div className="container-landing relative z-10">
        <div className="flex flex-col gap-10">
          {/* Section header */}
          <SectionHeader
            icon={Sparkles}
            iconColor="text-primary"
            badgeText={t("landing:step_badge")}
            title={t("landing:step_title")}
          />

          {/* Steps grid */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {STEPS.map(({ step, icon: Icon }) => (
              <motion.div
                key={step}
                variants={cardVariants}
                className="relative"
              >
                <div className="relative z-10 space-y-5">
                  {/* Icon + step number row */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        background: "hsl(var(--primary) / 0.08)",
                        border: "1px solid hsl(var(--primary) / 0.15)",
                      }}
                    >
                      <Icon size={20} className="text-primary" />
                    </div>
                    <span
                      className="text-[2.5rem] font-bold leading-none text-foreground/[0.06]"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-foreground">
                    {t(`landing:step_${step}_title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(`landing:step_${step}_desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
