import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/section-header";
import { FEATURES, containerVariants, cardVariants } from "./constants";

export const FeatureGrid = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full pt-20 lg:pt-40">
      <div className="container-landing">
        <div className="flex flex-col gap-10">
          {/* Section header */}
          <SectionHeader
            icon={Zap}
            iconColor="text-blue-500"
            badgeText={t("landing:features_badge")}
            title={t("landing:features_title")}
            description={t("landing:features_desc")}
          />

          {/* Cards grid with staggered animation */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {FEATURES.map(({ icon: Icon, key, color }) => (
              <motion.div
                key={key}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.25, ease: "easeOut" as const },
                }}
                className="group relative p-6 rounded-2xl border bg-card text-card-foreground transition-colors duration-300 cursor-default overflow-hidden"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                {/* Animated hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at 50% 0%, ${color}10, transparent 60%)`,
                  }}
                />

                {/* Icon */}
                <div className="relative flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: `${color}18` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="relative text-base font-semibold text-foreground mb-2">
                  {t(`landing:feature_${key}_title`)}
                </h3>

                {/* Description */}
                <p className="relative text-sm leading-relaxed text-muted-foreground">
                  {t(`landing:feature_${key}_desc`)}
                </p>

                {/* Bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: color }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
