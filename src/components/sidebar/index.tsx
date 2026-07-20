import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import {
  Sparkles,
  Sun,
  Moon,
  ChevronLeft,
} from 'lucide-react'
import { useState } from 'react'
import { NAV_ITEMS } from './constants'

export function Sidebar() {
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <aside
      className={cn(
        'flex flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300',
        collapsed ? 'w-16' : 'w-56'
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b px-4">
        <Sparkles className="h-6 w-6 text-sidebar-accent shrink-0" />
        {!collapsed && (
          <span className="font-bold text-sm truncate">{t("sidebar:workspace_title")}</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-2">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}>
            {({ isActive }) => (
              <Button
                variant="sidebar"
                size={collapsed ? 'icon' : 'default'}
                className={cn(
                  'w-full',
                  isActive && 'bg-sidebar-accent text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="icon-lg" />
                {!collapsed && <span>{t(`sidebar:${item.label}`)}</span>}
              </Button>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="border-t p-2 space-y-1">
        <Button
          variant="sidebar"
          size={collapsed ? 'icon' : 'default'}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="icon-lg" /> : <Moon className="icon-lg" />}
          {!collapsed && <span>{t("sidebar:toggle_theme")}</span>}
        </Button>
        <Button
          variant="sidebar"
          size={collapsed ? 'icon' : 'default'}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={cn('h-5 w-5 transition-transform', collapsed && 'rotate-180')} />
          {!collapsed && <span>{t("sidebar:collapse")}</span>}
        </Button>
      </div>
    </aside>
  )
}
