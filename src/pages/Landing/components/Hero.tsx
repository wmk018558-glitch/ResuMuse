import { MoveRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  if (typeof document !== "undefined") {
    const s = document.createElement("style");
    s.textContent = `
      @keyframes typing { from { width: 0 } to { width: 100% } }
      @keyframes blink { 50% { border-color: transparent } }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      .tl { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: typing var(--d,1.5s) steps(30,end) forwards; animation-delay: var(--delay,0s); }
      .tl::after { content: " "; animation: blink .7s step-end infinite; margin-left: 2px; color: #8b5cf6; font-weight: bold; }
      .tl-done::after { content: none; }
    `;
    document.head.appendChild(s);

    // Remove cursor after each typing line finishes
    document.querySelectorAll(".tl").forEach((el) => {
      el.addEventListener("animationend", () => el.classList.add("tl-done"), {
        once: true,
      });
    });
  }

  return (
    <div className="w-full relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-32 items-center justify-center flex-col relative z-10">
          <div>
            <Button
              size="sm"
              className="gap-0 rounded-full border-blue-200 dark:border-blue-900 text-gray-600 dark:text-gray-400 h-6"
              variant="outline"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />
              <p className="leading-7 text-[12px]  ">全新升级 · AI 智能简历</p>
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="scroll-m-20 text-center text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-balance">
              <span className="block">
                <span
                  className="tl"
                  style={{ "--d": "1.5s" } as React.CSSProperties}
                >
                  每一份简历，
                </span>
              </span>
              <span
                className="block  tl mt-3 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
                style={
                  { "--d": "1.5s", "--delay": "1.5s" } as React.CSSProperties
                }
              >
                {/* <span className="tl" style={{ "--d": "1.5s", "--delay": "1.5s" } as React.CSSProperties}> */}
                都值得被精准看见
                {/* </span> */}
              </span>
            </h1>
            <p
              className="text-xs md:text-lg leading-tight tracking-tight text-muted-foreground max-w-2xl text-center mt-5"
              style={
                {
                  opacity: 0,
                  animation: "fadeIn 0.6s ease-out 3.5s forwards",
                } as React.CSSProperties
              }
            >
              AI 驱动的求职全链路平台 · 简历解析 · 智能优化 · 岗位匹配 ·
              面试准备 从上传到拿到 Offer，一个工作台搞定
            </p>
          </div>
          <div
            className="flex gap-4 flex-wrap justify-center mt-8"
            style={
              {
                opacity: 0,
                animation: "fadeIn 0.6s ease-out 2.8s forwards",
              } as React.CSSProperties
            }
          >
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg"
            >
              Get Started
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
