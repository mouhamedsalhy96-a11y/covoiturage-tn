
import { getLang } from "@/lib/getLang";
import { extraMessages } from "@/lib/extraI18n";

export default async function HowItWorksPage() {
  const lang = await getLang();
  const t = extraMessages[lang].howItWorks;

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">{t.title}</h1>
        <p className="page-subtitle">{t.subtitle}</p>
      </section>

      <section className="feature-grid">
        <div className="feature-card">
          <h3>{t.step1Title}</h3>
          <p>{t.step1Text}</p>
        </div>

        <div className="feature-card">
          <h3>{t.step2Title}</h3>
          <p>{t.step2Text}</p>
        </div>

        <div className="feature-card">
          <h3>{t.step3Title}</h3>
          <p>{t.step3Text}</p>
        </div>

        <div className="feature-card">
          <h3>{t.step4Title}</h3>
          <p>{t.step4Text}</p>
        </div>
      </section>
    </main>
  );
}
