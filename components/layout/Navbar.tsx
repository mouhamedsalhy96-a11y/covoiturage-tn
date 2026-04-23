
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import BrandLogo from "@/components/layout/BrandLogo";
import LogoutButton from "@/components/layout/LogoutButton";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { getLang } from "@/lib/getLang";
import { messages } from "@/lib/i18n";

export default async function Navbar() {
  const user = await getCurrentUser();
  const lang = await getLang();
  const t = messages[lang];

  const isDriver = user?.role === "DRIVER" || user?.role === "BOTH";

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <BrandLogo lang={lang} />

        <div className="navbar-right">
          <nav className="nav-links">
            <Link href="/">{t.nav.home}</Link>
            <Link href="/search">{t.nav.search}</Link>

            {isDriver && <Link href="/driver/publish">{t.nav.publish}</Link>}

            {user ? (
              <>
                <Link href="/dashboard">{t.nav.dashboard}</Link>
                <LogoutButton
                  label={t.nav.logout}
                  loadingLabel={`${t.nav.logout}...`}
                />
              </>
            ) : (
              <>
                <Link href="/login">{t.nav.login}</Link>
                <Link href="/register">{t.nav.register}</Link>
              </>
            )}

            <Link href="/how-it-works">{t.nav.howItWorks}</Link>
            <Link href="/safety">{t.nav.safety}</Link>
            <Link href="/faq">{t.nav.faq}</Link>
            <Link href="/contact">{t.nav.contact}</Link>
          </nav>

          <LanguageSwitcher
            currentLang={lang}
            label={t.nav.language}
            frenchLabel={t.nav.french}
            arabicLabel={t.nav.arabic}
            englishLabel={t.nav.english}
          />
        </div>
      </div>
    </header>
  );
}
