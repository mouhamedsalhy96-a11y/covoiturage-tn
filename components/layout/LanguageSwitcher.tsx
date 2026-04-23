
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Lang } from "@/lib/i18n";

type LanguageSwitcherProps = {
  currentLang: Lang;
  label: string;
  frenchLabel: string;
  arabicLabel: string;
  englishLabel: string;
};

export default function LanguageSwitcher({
  currentLang,
  label,
  frenchLabel,
  arabicLabel,
  englishLabel,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  async function changeLang(lang: Lang) {
    await fetch("/api/language", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lang }),
    });

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="lang-dropdown-wrap">
      <label className="lang-dropdown-label" htmlFor="site-language">
        {label}
      </label>

      <select
        id="site-language"
        className="lang-dropdown"
        value={currentLang}
        onChange={(e) => changeLang(e.target.value as Lang)}
        disabled={pending}
      >
        <option value="fr">{frenchLabel}</option>
        <option value="ar">{arabicLabel}</option>
        <option value="en">{englishLabel}</option>
      </select>
    </div>
  );
}
