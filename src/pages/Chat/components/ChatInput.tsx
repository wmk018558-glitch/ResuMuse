import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUp, Square } from "lucide-react";

interface ChatInputProps {
  onSend: (content: string) => void;
  onStop?: () => void;
  isStreaming: boolean;
  disabled?: boolean;
}

export function ChatInput({
  onSend,
  onStop,
  isStreaming,
  disabled,
}: ChatInputProps) {
  const { t } = useTranslation("chat");
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isStreaming || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, isStreaming, disabled, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <div className="px-4 py-3">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-2 rounded-2xl border bg-muted/40 px-3 py-2 transition-colors focus-within:border-primary/50 focus-within:bg-background focus-within:shadow-sm">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("input_placeholder")}
            disabled={disabled}
            rows={1}
            className="flex-1 resize-none bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted-foreground/50 disabled:opacity-50"
          />

          {isStreaming ? (
            <button
              onClick={onStop}
              className="h-8 w-8 shrink-0 inline-flex items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
              title={t("stop_generating")}
            >
              <Square className="icon-sm" />
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!value.trim() || disabled}
              className="h-8 w-8 shrink-0 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              title={t("send")}
            >
              <ArrowUp className="icon-md" />
            </button>
          )}
        </div>

        <p className="text-[10px] text-muted-foreground/40 text-center mt-2">
          ResuMuse AI 仅供学习参考，请核实重要信息
        </p>
      </div>
    </div>
  );
}
