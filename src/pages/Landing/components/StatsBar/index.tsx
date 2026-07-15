import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { STATS } from "./constants";

export function StatsBar() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.2, duration: 0.35, ease: "easeOut" }}
      className="flex items-center justify-center gap-10 py-10"
    >
      {STATS.map(({ val, key }) => (
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
