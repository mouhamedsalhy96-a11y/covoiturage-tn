
import { getLang } from "@/lib/getLang";
import { extraMessages } from "@/lib/extraI18n";

export default async function ContactPage() {
  const lang = await getLang();
  const t = extraMessages[lang].contact;

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">{t.title}</h1>
        <p className="page-subtitle">{t.subtitle}</p>
      </section>

      <section className="stack" style={{ maxWidth: "900px" }}>
        <div className="surface info-box">
          <h2 className="section-title">{t.emailTitle}</h2>
          <p className="helper-text">{t.emailText}</p>
        </div>

        <div className="surface info-box">
          <h2 className="section-title">{t.supportTitle}</h2>
          <p className="helper-text">{t.supportText}</p>
        </div>

        <div className="surface info-box">
          <h2 className="section-title">{t.noteTitle}</h2>
          <p className="helper-text">{t.noteText}</p>
        </div>
      </section>
    </main>
  );
}
