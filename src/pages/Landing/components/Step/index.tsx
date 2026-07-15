import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-10">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.35, ease: "easeOut" as const },
              },
            }}
            className="flex gap-4 flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm mx-auto">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground/90 text-center">
                {t("landing:step_badge")}
              </span>
            </div>
            <div className="flex gap-2 flex-col items-center text-center">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-foreground">
                {t("landing:step_title")}
              </h2>
            </div>
          </motion.div>

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
