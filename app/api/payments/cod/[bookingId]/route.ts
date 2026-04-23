
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
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found." },
        { status: 404 }
      );
    }

    if (booking.passengerId !== user.id) {
      return NextResponse.json(
        { error: "You do not have access to this booking." },
        { status: 403 }
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        paymentMethod: "CASH_ON_DELIVERY",
        paymentStatus: "PENDING_CASH_COLLECTION",
        cashCollectionStatus: "PENDING_COLLECTION",
        status: "Confirmed",
      },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("COD PAYMENT ERROR:", error);

    return NextResponse.json(
      { error: "Server error while confirming cash on delivery." },
      { status: 500 }
    );
  }
}
