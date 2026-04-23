
import { getLang } from "@/lib/getLang";
import { finalMessages } from "@/lib/finalI18n";

type TripTimelineProps = {
  fromCity: string;
  toCity: string;
  pickupPoint?: string | null;
  notes?: string | null;
};

export default async function TripTimeline({
  fromCity,
  toCity,
  pickupPoint,
  notes,
}: TripTimelineProps) {
  const lang = await getLang();
  const t = finalMessages[lang].timeline;

  return (
    <div className="timeline">
      <div className="timeline-item">
        <div className="timeline-dot">1</div>
        <h4>{t.departure}</h4>
        <p>{fromCity}</p>
      </div>

      <div className="timeline-item">
        <div className="timeline-dot">2</div>
        <h4>{t.pickup}</h4>
        <p>{pickupPoint ?? t.pickupFallback}</p>
      </div>

      <div className="timeline-item">
        <div className="timeline-dot">3</div>
        <h4>{t.destination}</h4>
        <p>{toCity}</p>
      </div>

      <div className="timeline-item">
        <div className="timeline-dot">4</div>
        <h4>{t.notes}</h4>
        <p>{notes ?? t.notesFallback}</p>
      </div>
    </div>
  );
}
