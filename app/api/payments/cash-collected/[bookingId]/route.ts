
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const { bookingId } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        trip: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found." },
        { status: 404 }
      );
    }

    const isInternalOperator =
      user.role === "DRIVER" || user.role === "BOTH";

    if (!isInternalOperator) {
      return NextResponse.json(
        { error: "You are not allowed to mark cash as collected." },
        { status: 403 }
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        paymentStatus: "PAID",
        cashCollectionStatus: "COLLECTED",
        cashCollectedAt: new Date(),
        paidAt: new Date(),
        status: "Confirmed",
      },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("CASH COLLECTED ERROR:", error);

    return NextResponse.json(
      { error: "Server error while marking cash as collected." },
      { status: 500 }
    );
  }
}
``
