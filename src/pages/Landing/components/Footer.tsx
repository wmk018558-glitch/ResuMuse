import { Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">AI 简历工作台</span>
            </a>
            <p className="text-sm text-muted-foreground max-w-xs">
              {/* 品牌描述 */}
            </p>
          </div>

          {/* 产品链接 */}
          <div>
            <h4 className="font-semibold text-sm mb-4">产品</h4>
            <ul className="space-y-3">{/* 链接列表 */}</ul>
          </div>

          {/* 支持链接 */}
          <div>
            <h4 className="font-semibold text-sm mb-4">支持</h4>
            <ul className="space-y-3">{/* 链接列表 */}</ul>
          </div>

          {/* 公司链接 */}
          <div>
            <h4 className="font-semibold text-sm mb-4">公司</h4>
            <ul className="space-y-3">{/* 链接列表 */}</ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          © 2026 AI 简历工作台。All rights reserved.
        </div>
      </div>
    </footer>
  )
}
