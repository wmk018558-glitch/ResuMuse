/**
 *
 *
 * 这个脚本做三件事：
 * 1. 同步 key 结构 — 如果 zh-CN/landing.json 新增了一个 key，它会拷贝到 en-US/landing.json；如果删了一个 key，它也会从 en-US 中删除
 * 2. 翻译 ：
 * 通过 Google 或 OpenAI 接口自动翻译新的中文文案为英文（当前因为网络环境限制，翻译功能用不了，退化为直接拷贝中文）
 * 3. 清理死 key — 代码里不再引用的 key 会自动从所有语言文件中移除
 *
 *
 * 当前状态：翻译功能不可用，实际只是在做"同步结构 + 拷贝中文"。你在 zh-CN JSON 里加中文后手动填英文
 *
 *
 * 目前 国际化 需要 手动在代码中填写 t("命名空间: 中文")  并在 locales中 手动创建 中英文
 *
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";

const LOCALES_DIR = resolve("src/locales");
const SOURCE_LANG = "zh-CN";
const TARGET_LANGS = ["en-US"];
const NAMESPACES = [
  "common",
  "landing",
  "header",
  "footer",
  "sidebar",
  "upload",
];

// 翻译服务: google | openai | none
const SERVICE = process.env.TRANSLATE_SERVICE || "none";

function containsChinese(text) {
  return /[\u4e00-\u9fff]/.test(text);
}

function isSkippable(key, value) {
  if (key === "app_name" || key.endsWith("_cta")) return true;
  // 纯英文不需要翻译
  if (/^[\w\s\-_./]+$/.test(value) && !/[\u4e00-\u9fff]/.test(value))
    return true;
  return false;
}

async function translateGoogle(text) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=en&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data[0]?.map((seg) => seg[0]).join("") || text;
}

async function translateOpenAI(text) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY not set");
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Translate Chinese text to English. Return only the translation, no explanation.",
        },
        { role: "user", content: text },
      ],
    }),
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || text;
}

const translators = { google: translateGoogle, openai: translateOpenAI };

async function main() {
  const translator = translators[SERVICE];
  if (SERVICE !== "none" && !translator) {
    console.warn(
      `Unknown TRANSLATE_SERVICE "${SERVICE}". Skipping translation.`,
    );
  }

  for (const ns of NAMESPACES) {
    const sourcePath = resolve(LOCALES_DIR, SOURCE_LANG, `${ns}.json`);
    const source = JSON.parse(readFileSync(sourcePath, "utf-8"));
    const sourceKeys = new Set(Object.keys(source));

    for (const targetLang of TARGET_LANGS) {
      const targetDir = resolve(LOCALES_DIR, targetLang);
      if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });

      const targetPath = resolve(targetDir, `${ns}.json`);
      const targetExists = existsSync(targetPath);
      const target = targetExists
        ? JSON.parse(readFileSync(targetPath, "utf-8"))
        : {};

      let changed = false;

      // 移除不再存在于源的 key
      for (const key of Object.keys(target)) {
        if (!sourceKeys.has(key)) {
          delete target[key];
          changed = true;
          console.log(`  [${targetLang}/${ns}] Removed: ${key}`);
        }
      }

      // 同步/翻译新增 key
      for (const [key, value] of Object.entries(source)) {
        if (isSkippable(key, value)) {
          if (target[key] !== value) {
            target[key] = value;
            changed = true;
          }
          continue;
        }

        if (!target[key] || containsChinese(target[key])) {
          if (translator) {
            console.log(`  [${targetLang}/${ns}] Translating: ${key}`);
            target[key] = await translator(value);
            await new Promise((r) => setTimeout(r, 300));
          } else {
            // 兜底：拷贝中文
            target[key] = value;
          }
          changed = true;
        }
      }

      if (changed) {
        const sorted = Object.keys(target)
          .sort()
          .reduce((acc, k) => {
            acc[k] = target[k];
            return acc;
          }, {});
        writeFileSync(targetPath, JSON.stringify(sorted, null, 2) + "\n");
        console.log(`✓ Updated ${targetLang}/${ns}.json`);
      } else {
        console.log(`  ${targetLang}/${ns}.json is up to date`);
      }
    }
  }
  console.log("\n✅ Sync complete!");
}

main().catch(console.error);
