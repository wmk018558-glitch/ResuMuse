import { ArrowRight, ChevronRight, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeUp, slideLeft } from "./constants";
import styles from "./index.module.css";

export function Hero() {
  const { t } = useTranslation();
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    const handleEnd = (e: AnimationEvent) => {
      (e.currentTarget as HTMLElement).classList.add(styles.typingLineDone);
    };
    const els = document.querySelectorAll(`.${styles.typingLine}`);
    els.forEach((el) => el.addEventListener("animationend", handleEnd as EventListener, { once: true }));
    return () => {
      els.forEach((el) => el.removeEventListener("animationend", handleEnd as EventListener));
    };
  }, []);

  return (
    <div className="w-full relative overflow-hidden">
      <div className="flex gap-8 pt-20 lg:pt-32 items-center justify-center flex-col relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm mx-auto">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground/90 text-center">
              {t("landing:badge")}
            </span>
            <ChevronRight size={13} className="text-green-500" />
          </div>
        </motion.div>

        <div className="flex gap-4 flex-col max-w-4xl mx-auto">
          <h1 className="scroll-m-20 text-center text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-balance">
            <span className="block">
              <span
                className={styles.typingLine}
                style={{ "--d": "0.8s" } as React.CSSProperties}
              >
                {t("landing:hero_line1")}
              </span>
            </span>
            <span
              className={`block mt-3 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent ${styles.typingLine}`}
              style={{ "--d": "0.8s", "--delay": "0.8s" } as React.CSSProperties}
            >
              {t("landing:hero_line2")}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.35, ease: "easeOut" }}
            className="text-xs md:text-lg leading-tight tracking-tight text-muted-foreground text-center mt-5"
          >
            {t("landing:hero_desc")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.35, ease: "easeOut" }}
          className="max-w-xl mx-auto w-full px-4"
        >
          <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-border bg-card/50 shadow-sm transition-all">
            <Upload size={17} className="text-muted-foreground/50 shrink-0" />
            <Input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={t("landing:hero_input_placeholder")}
              className="flex-1 bg-transparent border-0 shadow-none text-sm outline-none placeholder:text-muted-foreground/50 focus-visible:ring-0"
            />
            <motion.div initial="hidden" animate="show" variants={slideLeft} transition={{ delay: 2.4 }}>
              <Button className="gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg shrink-0">
                {t("landing:hero_cta")}
                <ArrowRight size={14} />
              </Button>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.3 }}
            className="mt-3 text-xs text-muted-foreground/40 text-center"
          >
            {t("landing:hero_supported_formats")}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
