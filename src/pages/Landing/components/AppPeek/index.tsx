import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { NAV_ITEMS } from "./constants";

export function AppPeek() {
  const { t } = useTranslation();
  return (
    <section className="overflow-hidden">
      <div className="container-landing">
        {/* Preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.4, ease: "easeOut" }}
          className="relative mx-auto max-w-4xl"
        >
          {/* Browser chrome */}
          <div className="rounded-t-xl border border-border bg-muted/50 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 flex justify-center">
              <span className="text-xs text-muted-foreground/60 bg-background px-4 py-1 rounded-md border border-border">
                app.resumuse.ai
              </span>
            </div>
          </div>
          {/* App preview area */}
          <div className="border-x border-b border-border rounded-b-xl bg-background overflow-hidden">
            <div className="flex">
              {/* Sidebar */}
              <div className="w-16 lg:w-48 shrink-0 bg-sidebar border-r border-border p-3 space-y-2">
                <div className="flex items-center gap-2 mb-6 px-1">
                  <Sparkles className="w-5 h-5 text-sidebar-accent shrink-0" />
                  <span className="font-bold text-xs hidden lg:block truncate text-sidebar-foreground">
                    {t("sidebar:workspace_title")}
                  </span>
                </div>
                {NAV_ITEMS.map(({ icon: Icon, key }) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sidebar-foreground/70 hover:bg-sidebar-accent/10 transition-colors"
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-xs hidden lg:block">
                      {t(`sidebar:${key}`)}
                    </span>
                  </div>
                ))}
              </div>
              {/* Main content */}
              <div className="flex-1 p-4 lg:p-6 space-y-4">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-4 w-20 bg-muted rounded" />
                </div>
                {/* Resume cards */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-card p-3 space-y-2"
                    >
                      <div className="h-24 bg-muted rounded-md" />
                      <div className="h-3 w-3/4 bg-muted rounded" />
                      <div className="h-3 w-1/2 bg-muted rounded" />
                    </div>
                  ))}
                </div>
                {/* Bottom row */}
                <div className="flex gap-3">
                  <div className="h-8 flex-1 bg-muted rounded-md" />
                  <div className="h-8 w-24 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
