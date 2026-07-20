import React, { Suspense, useMemo } from "react";
import { cn } from "@/lib/utils";

// Lazy-load react-markdown to reduce initial bundle size
const ReactMarkdown = React.lazy(() => import("react-markdown"));

// These plugins are small enough to import statically
let remarkGfm: any = null;
let rehypeHighlight: any = null;

const loadPlugins = async () => {
  if (!remarkGfm) {
    remarkGfm = (await import("remark-gfm")).default;
  }
  if (!rehypeHighlight) {
    rehypeHighlight = (await import("rehype-highlight")).default;
  }
  return { remarkGfm, rehypeHighlight };
};

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Skeleton shown while react-markdown loads
function MarkdownSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-1/2" />
      <div className="h-4 bg-muted rounded w-5/6" />
    </div>
  );
}

// Internal component that handles async plugin loading
function MarkdownContent({ content }: { content: string }) {
  const [plugins, setPlugins] = React.useState<{
    remarkGfm: any;
    rehypeHighlight: any;
  } | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    loadPlugins().then((p) => {
      if (!cancelled) setPlugins(p);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!plugins) {
    return <MarkdownSkeleton />;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[plugins.remarkGfm]}
      rehypePlugins={[plugins.rehypeHighlight]}
      components={{
        code: CodeBlock,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// Custom code block renderer
function CodeBlock({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const isInline =
    !className?.includes("language-") ||
    (props as any).node?.properties?.className == null;

  if (isInline) {
    return (
      <code
        className={cn(
          "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
          className,
        )}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="relative my-4 rounded-lg border bg-muted/30 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-1.5 border-b bg-muted/50">
        <span className="text-xs text-muted-foreground font-mono">
          {className?.replace("language-", "") || "code"}
        </span>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className={cn("text-sm font-mono", className)} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
}

export const MarkdownRenderer = React.memo(function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div className={cn("prose dark:prose-invert max-w-none text-sm", className)}>
      <Suspense fallback={<MarkdownSkeleton />}>
        <MarkdownContent content={content} />
      </Suspense>
    </div>
  );
});
