import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const stats = [
  { val: "240,000+", key: "stats_active_users" },
  { val: "98%", key: "stats_satisfaction" },
  { val: "3.8×", key: "stats_interview_boost" },
];

export function StatsBar() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 5.2, duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-center gap-10 py-10"
    >
      {stats.map(({ val, key }) => (
        <div key={key} className="text-center">
          <div className="text-xl font-semibold text-foreground">{val}</div>
          <div className="text-xs mt-0.5 text-muted-foreground/50">
            {t(`landing:${key}`)}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
