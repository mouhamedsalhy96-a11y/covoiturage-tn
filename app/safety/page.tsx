
import { getLang } from "@/lib/getLang";
import { extraMessages } from "@/lib/extraI18n";

export default async function SafetyPage() {
  const lang = await getLang();
  const t = extraMessages[lang].safety;

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">{t.title}</h1>
        <p className="page-subtitle">{t.subtitle}</p>
      </section>

      <section className="benefit-grid">
        <div className="benefit-card">
          <h3>{t.item1Title}</h3>
          <p>{t.item1Text}</p>
        </div>

        <div className="benefit-card">
          <h3>{t.item2Title}</h3>
          <p>{t.item2Text}</p>
        </div>

        <div className="benefit-card">
          <h3>{t.item3Title}</h3>
          <p>{t.item3Text}</p>
        </div>

        <div className="benefit-card">
          <h3>{t.item4Title}</h3>
          <p>{t.item4Text}</p>
        </div>
      </section>
    </main>
  );
}
