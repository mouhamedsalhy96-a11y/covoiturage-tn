
import Link from "next/link";

type ConversationCardProps = {
  id: string;
  name: string;
  lastMessage: string;
  tripRoute: string;
};

export default function ConversationCard({
  id,
  name,
  lastMessage,
  tripRoute,
}: ConversationCardProps) {
  return (
    <Link href={`/messages/${id}`}>
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "16px",
        }}
      >
        <h3 style={{ marginBottom: "8px" }}>{name}</h3>
        <p style={{ marginBottom: "6px" }}>{tripRoute}</p>
        <p>{lastMessage}</p>
      </div>
    </Link>
  );
}
