
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getLang } from "@/lib/getLang";
import { isRTL } from "@/lib/i18n";

export const metadata = {
  title: "CovoiturageTN",
  description: "Tunisia-friendly ride-sharing platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await getLang();
  const dir = isRTL(lang) ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir}>
      <body>
        <Navbar />
        <div className="app-shell">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
