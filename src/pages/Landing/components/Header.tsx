import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, MoveRight } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navigationItems = [
  { title: "首页", href: "#hero", description: "" },
  { title: "功能", href: "#features", description: "" },
  { title: "模板", href: "#templates", description: "" },
  { title: "定价", href: "#pricing", description: "" },
];

export function Header() {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-background border-b">
      <div className="container relative mx-auto min-h-16 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <div className="flex justify-start items-center gap-2">
          <a href="#" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-base lg:text-lg whitespace-nowrap">
              ResuMuse
            </span>
          </a>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center justify-center gap-8">
          {navigationItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center justify-end gap-2">
          <ThemeToggle />
          <Button variant="ghost" className="text-sm font-medium">
            登录
          </Button>
          <Button className="text-sm font-medium px-5">免费开始</Button>
        </div>

        {/* Mobile: Hamburger */}
        <div className="flex lg:hidden items-center justify-end gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="text-sm font-medium">
            登录
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t bg-background shadow-lg">
          <div className="container px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4">
            {navigationItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex justify-between items-center text-lg py-2"
                onClick={() => setOpen(false)}
              >
                <span>{item.title}</span>
                <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t">
              <Button variant="outline" className="w-full">
                登录
              </Button>
              <Button className="w-full">免费开始</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
