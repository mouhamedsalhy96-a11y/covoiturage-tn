
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
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

    if (booking.passengerId !== user.id) {
      return NextResponse.json(
        { error: "You do not have access to this booking." },
        { status: 403 }
      );
    }

    return NextResponse.json({
      booking: {
        id: booking.id,
        totalPrice: booking.totalPrice,
        seatsBooked: booking.seatsBooked,
        paymentStatus: booking.paymentStatus,
        status: booking.status,
      },
      trip: {
        id: booking.trip.id,
        fromCity: booking.trip.fromCity,
        toCity: booking.trip.toCity,
        date: booking.trip.date,
        time: booking.trip.time,
      },
    });
  } catch (error) {
    console.error("PAYMENT PREP ERROR:", error);

    return NextResponse.json(
      { error: "Server error while preparing payment." },
      { status: 500 }
    );
  }
}
