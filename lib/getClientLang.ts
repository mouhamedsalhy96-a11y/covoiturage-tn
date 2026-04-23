
"use client";

import { defaultLang, isValidLang, type Lang } from "@/lib/i18n";

export function getClientLang(): Lang {
  if (typeof document === "undefined") {
    return defaultLang;
  }

  const match = document.cookie.match(/(?:^|;\s*)lang=([^;]+)/);
  const raw = match ? decodeURIComponent(match[1]) : defaultLang;

  if (isValidLang(raw)) {
    return raw;
  }

  return defaultLang;
}
