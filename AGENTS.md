# ResuMuse Web — Coding Conventions for Codex

## Tech Stack & Patterns

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS 3 (with `tailwindcss-animate` plugin)
- **Component Library**: shadcn/ui (New York style) — components live in `src/components/ui/`
- **Icons**: Lucide React
- **Animation**: framer-motion for scroll/reveal/stagger animations
- **Routing**: React Router v7
- **i18n**: react-i18next + i18next, locale files in `src/locales/{en-US,zh-CN}/*.json`
- **Theme**: Custom ThemeProvider with `next-themes`-style class toggle (`.dark` on `<html>`)

## Project Structure

```
src/
├── components/              # Shared/reusable components
│   └── ui/                  # shadcn/ui components ONLY — add via `npx shadcn@latest add <name>`
├── layout/                  # Layout components (LandingLayout, etc.)
├── pages/
│   └── Landing/             # Landing page
│       ├── components/      # Section components (Hero, FeatureGrid, Step, Testimonials, etc.)
│       │   ├── Hero/
│       │   ├── FeatureGrid/
│       │   ├── Step/
│       │   ├── Testimonials/
│       │   └── ...
│       └── index.tsx        # Landing page assembly
├── locales/
│   ├── en-US/
│   └── zh-CN/
├── lib/
│   └── utils.ts             # cn() helper (clsx + tailwind-merge)
├── App.tsx
└── main.tsx
```

## Component Conventions

### Section Components (Landing page sections)
- Each section is a directory under `pages/Landing/components/<Name>/` with `index.tsx`
- Use `"use client"` directive at the top if component uses hooks or browser APIs
- Follow the established section pattern:
  ```tsx
  <section className="w-full py-20 lg:py-40">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10">
        {/* Section header: Badge + Title + Description */}
        {/* Content */}
      </div>
    </div>
  </section>
  ```
- Section header pattern (matching FeatureGrid):
  - Badge: `<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm mx-auto">` with icon + text
  - Title: `<h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-foreground">`
  - Description: `<p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground">`
- Use `framer-motion` with `whileInView` for scroll-triggered animations
  - Header animation: `variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } } }}` with `viewport={{ once: true, amount: 0.3 }}`
- All text content goes through `react-i18next` (`useTranslation()` + `t("landing:key")`)

### shadcn/ui Components
- **NEVER manually create files under `src/components/ui/`**
- Always install via: `npx shadcn@latest add <component-name>`
- Examples: Button, Badge, Avatar, Card, Carousel, Input, Label, Form, etc.

## Code Style

- Use **named exports** for section components: `export const ComponentName`
- Use **default exports** only for page-level components (`LandingPage`)
- Import paths: use `@/` alias (e.g., `@/components/ui/button`, `@/lib/utils`)
- CSS classes: use `cn()` utility from `@/lib/utils` for conditional classes
- Use `hsl(var(--variable))` color references, not hardcoded colors
- Prefer Tailwind utility classes over custom CSS
- Use `tracking-tight` / `tracking-tighter` for typography
- Use `text-muted-foreground` for secondary text
- Use `bg-muted` / `bg-card` / `bg-background` for backgrounds

## i18n Patterns
- Keys use snake_case, grouped by section (e.g., `features_badge`, `testimonial_1`)
- Each component's translation keys are prefixed by `landing:` when in the Landing page
- Both `en-US` and `zh-CN` locale files must be updated together
- Use `t("landing:key")` in components under `pages/Landing/`

## TypeScript & Build
- Run `npx tsc --noEmit` to type-check before finishing
- Build: `npm run build` (runs tsc + vite build)
- Use `--noUnusedLocals: false`, `--noUnusedParameters: false` — unused vars are acceptable
- Path alias `@/*` maps to `./src/*` (configured in both tsconfig.json and vite.config.ts)

## Constants & Data Files

- Each section component that has static data (items list, features, steps, testimonials, etc.) **must** extract that data into a separate `constants.ts` file in the same directory
- Constants file pattern:
  - Named exports only
  - Use `as const` assertion on array/object literals
  - Lucide icon components can be part of the data struct
  - framer-motion `Variants` types are also placed here
- Example locations:
  - `pages/Landing/components/FeatureGrid/constants.ts`
  - `pages/Landing/components/Step/constants.ts`
  - `pages/Landing/components/Testimonials/constants.ts`
- Do **not** inline data arrays directly in the component `index.tsx` — always extract to `constants.ts`

## Theme Support

- Theme is toggled via `.dark` class on `<html>` element (controlled by `ThemeProvider` in `src/components/theme-provider.tsx`)
- **Never use hardcoded color values** (e.g., `text-gray-900`, `bg-white`, `text-black`, `#fff`)
- Always use **CSS variable-based Tailwind classes**:
  - Text: `text-foreground`, `text-muted-foreground`, `text-card-foreground`, `text-primary`
  - Backgrounds: `bg-background`, `bg-card`, `bg-muted`, `bg-primary`, `bg-secondary`
  - Borders: `border-border`, `border-input`
  - Hover states: `hover:bg-muted`, `hover:bg-accent`, `hover:text-accent-foreground`
  - Rings/shadows: `ring-ring`, `shadow-sm`
- For decorative elements that need color (icons, glows, accent lines):
  - Use `text-primary` or `hsl(var(--primary))` for primary accent
  - Use Tailwind opacity modifiers: `text-primary/80`, `bg-primary/10`, `border-primary/20`
  - Use `hsl(var(--xxx) / <opacity>)` syntax in inline `style` attributes
- Exceptions — only use hardcoded colors for:
  - True semantic colors (e.g., red for errors, green for success, yellow for stars) — but prefer CSS variables if defined
  - Avatar images / external content (not affected by theme)
- The badge icon in section headers uses `text-blue-500` followed by all existing sections — keep consistent
- Before creating any new section or component, verify all colors adapt to both `.dark` and `:root` themes
