
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPaymeeChecksum } from "@/lib/paymee";

function parseMaybeJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const rawText = await request.text();

    let payload: Record<string, unknown> = {};

    const asJson = parseMaybeJson(rawText);

    if (asJson && typeof asJson === "object") {
      payload = asJson as Record<string, unknown>;
    } else {
      const params = new URLSearchParams(rawText);
      payload = Object.fromEntries(params.entries());
    }

    const orderId = String(payload.order_id ?? "");
    const token = String(payload.token ?? "");
    const paymentStatus = String(payload.payment_status ?? "");
    const checksum = String(payload.check_sum ?? "");

    if (!orderId || !token || !paymentStatus || !checksum) {
      return NextResponse.json(
        { error: "Missing required Paymee webhook fields." },
        { status: 400 }
      );
    }

    const verified = verifyPaymeeChecksum(token, paymentStatus, checksum);

    if (!verified) {
      return NextResponse.json(
        { error: "Invalid Paymee checksum." },
        { status: 400 }
      );
    }

    if (paymentStatus === "1") {
      await prisma.booking.update({
        where: { id: orderId },
        data: {
          paymentMethod: "PAYMEE",
          paymentStatus: "PAID",
          status: "Confirmed",
          paymentReference: token,
          paidAt: new Date(),
        },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("PAYMEE WEBHOOK ERROR:", error);

    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
