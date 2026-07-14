# ResuMuse Web — AI 简历工作台

> AI 驱动的求职全链路平台 · 简历解析 · 智能优化 · 岗位匹配 · 面试准备

## 简介

ResuMuse 是一个基于 AI 的求职辅助平台，帮助求职者从上传简历到拿到 Offer，一站式搞定。  
该项目使用 React + TypeScript + Tailwind CSS + Vite 构建，包含 Landing 首页展示。

## 特性

- **打字机效果标题** — 带有逐字动画和光标的渐变标题
- **AI 简历优化** — 智能解析、优化、匹配
- **深色/浅色主题** — 支持系统主题跟随和手动切换
- **响应式设计** — 适配桌面端和移动端

## 技术栈

| 技术 | 用途 |
|------|------|
| React 18 | UI 框架 |
| TypeScript | 类型安全 |
| Vite | 构建工具 |
| Tailwind CSS 3 | 样式方案 |
| shadcn/ui | 组件库（Button、Badge 等） |
| Lucide React | 图标库 |
| React Router | 路由管理 |
| next-themes / 自定义 ThemeProvider | 主题切换 |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（Landing 页面）
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
src/
├── components/          # 公共组件
│   ├── ui/             # shadcn/ui 组件
│   ├── theme-provider.tsx
│   └── sidebar.tsx
├── layout/             # 布局组件
│   └── LandingLayout.tsx
├── pages/
│   └── Landing/        # Landing 页面
│       ├── components/
│       │   ├── Hero.tsx
│       │   ├── Header.tsx
│       │   └── Footer.tsx
│       └── index.tsx
├── lib/
│   └── utils.ts
├── App.tsx
└── main.tsx
```

## License

MIT
