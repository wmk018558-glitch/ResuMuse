import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Mobile header bar */}
      <div className="lg:hidden flex items-center h-12 px-4 border-b bg-background shrink-0 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="shrink-0"
        >
          {sidebarOpen ? (
            <X className="icon-lg" />
          ) : (
            <Menu className="icon-lg" />
          )}
        </Button>
        <span className="ml-3 font-semibold text-sm">ResuMuse AI</span>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={closeSidebar}
          />
        )}

        {/* Content area - the children handle their own sidebar layout */}
        <div className="flex-1 flex overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
