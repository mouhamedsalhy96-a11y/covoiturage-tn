
import { getLang } from "@/lib/getLang";
import { extraMessages } from "@/lib/extraI18n";

export default async function FAQPage() {
  const lang = await getLang();
  const t = extraMessages[lang].faq;

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">{t.title}</h1>
        <p className="page-subtitle">{t.subtitle}</p>
      </section>

      <section className="stack" style={{ maxWidth: "900px" }}>
        <div className="surface info-box">
          <h2 className="section-title">{t.q1}</h2>
          <p>{t.a1}</p>
        </div>

        <div className="surface info-box">
          <h2 className="section-title">{t.q2}</h2>
          <p>{t.a2}</p>
        </div>

        <div className="surface info-box">
          <h2 className="section-title">{t.q3}</h2>
          <p>{t.a3}</p>
        </div>

        <div className="surface info-box">
          <h2 className="section-title">{t.q4}</h2>
          <p>{t.a4}</p>
        </div>
      </section>
    </main>
  );
}
