
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import MessageComposer from "@/components/messages/MessageComposer";

type MessageItem = {
  id: string;
  sender: string;
  text: string;
  createdAt: Date;
};

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const trip = await prisma.trip.findUnique({
    where: { id },
    include: {
      driver: true,
      bookings: true,
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!trip) {
    notFound();
  }

  const isDriver = trip.driverId === user.id;
  const isPassenger = trip.bookings.some(
    (booking) => booking.passengerId === user.id
  );

  if (!isDriver && !isPassenger) {
    redirect("/messages");
  }

  const messages: MessageItem[] = trip.messages.map((message) => ({
    id: message.id,
    sender: message.sender,
    text: message.text,
    createdAt: message.createdAt,
  }));

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">
          Conversation: {trip.fromCity} → {trip.toCity}
        </h1>
        <p className="page-subtitle">
          Driver: {trip.driver.name} | {trip.date} at {trip.time}
        </p>
      </section>

      <section
        className="surface info-box"
        style={{ maxWidth: "760px", marginBottom: "24px" }}
      >
        {messages.length > 0 ? (
          messages.map((message: MessageItem) => (
            <div
              key={message.id}
              style={{
                padding: "14px 16px",
                border: "1px solid #eee",
                borderRadius: "10px",
                marginBottom: "12px",
              }}
            >
              <p style={{ margin: 0, fontWeight: 600 }}>{message.sender}</p>
              <p style={{ margin: "8px 0 0 0" }}>{message.text}</p>
            </div>
          ))
        ) : (
          <p>No messages yet. Start the conversation below.</p>
        )}
      </section>

      <div style={{ maxWidth: "760px" }}>
        <MessageComposer tripId={trip.id} />
      </div>
    </main>
  );
}
