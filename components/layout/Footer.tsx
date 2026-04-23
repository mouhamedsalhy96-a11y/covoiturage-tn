
import Link from "next/link";
import BrandLogo from "@/components/layout/BrandLogo";
import { getLang } from "@/lib/getLang";
import { messages } from "@/lib/i18n";

export default async function Footer() {
  const lang = await getLang();
  const t = messages[lang];

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <BrandLogo lang={lang} />
            <p className="footer-text" style={{ marginTop: "12px" }}>
              {t.footer.about}
            </p>
          </div>

          <div>
            <h3 className="footer-title">{t.footer.explore}</h3>
            <div className="footer-links">
              <Link href="/">{t.nav.home}</Link>
              <Link href="/search">{t.nav.search}</Link>
              <Link href="/how-it-works">{t.nav.howItWorks}</Link>
              <Link href="/safety">{t.nav.safety}</Link>
            </div>
          </div>

          <div>
            <h3 className="footer-title">{t.footer.account}</h3>
            <div className="footer-links">
              <Link href="/login">{t.nav.login}</Link>
              <Link href="/register">{t.nav.register}</Link>
              <Link href="/dashboard">{t.nav.dashboard}</Link>
              <Link href="/messages">{t.footer.messages}</Link>
            </div>
          </div>

          <div>
            <h3 className="footer-title">{t.footer.support}</h3>
            <div className="footer-links">
              <Link href="/faq">{t.nav.faq}</Link>
              <Link href="/contact">{t.nav.contact}</Link>
              <Link href="/dashboard/bookings">{t.footer.bookings}</Link>
              <Link href="/admin/bookings">{t.footer.admin}</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
