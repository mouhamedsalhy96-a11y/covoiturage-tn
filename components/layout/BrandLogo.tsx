
import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { messages } from "@/lib/i18n";

type BrandLogoProps = {
  lang: Lang;
  large?: boolean;
};

export default function BrandLogo({
  lang,
  large = false,
}: BrandLogoProps) {
  const t = messages[lang];

  return (
    <Link href="/" className={large ? "brand-logo brand-logo-large" : "brand-logo"}>
      <span className="brand-car-wrap" aria-hidden="true">
        <span className="brand-car">🚗</span>
      </span>

      <span className="brand-text-wrap">
        <span className="brand-name">{t.brand.name}</span>
        <span className="brand-tagline">{t.brand.tagline}</span>
      </span>
    </Link>
  );
}
