
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: {
      trip: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to create a booking." },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body.tripId) {
      return NextResponse.json(
        { error: "tripId is required" },
        { status: 400 }
      );
    }

    const trip = await prisma.trip.findUnique({
      where: { id: body.tripId },
    });

    if (!trip) {
      return NextResponse.json(
        { error: "Trip not found." },
        { status: 404 }
      );
    }

    const seatsBooked = Number(body.seatsBooked);

    if (!seatsBooked || seatsBooked < 1) {
      return NextResponse.json(
        { error: "Invalid number of seats." },
        { status: 400 }
      );
    }

    const totalPrice = seatsBooked * trip.price;

    const booking = await prisma.booking.create({
      data: {
        passengerName: user.name,
        passengerEmail: user.email,
        seatsBooked,
        totalPrice,
        status: "Pending",
        paymentStatus: "UNPAID",
        tripId: trip.id,
        passengerId: user.id,
      },
      include: {
        trip: true,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("BOOKING POST ERROR:", error);

    return NextResponse.json(
      { error: "Server error while creating booking." },
      { status: 500 }
    );
  }
}
``
