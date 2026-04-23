
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const { tripId } = await params;

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
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
      return NextResponse.json(
        { error: "Trip not found." },
        { status: 404 }
      );
    }

    const isDriver = trip.driverId === user.id;
    const isPassenger = trip.bookings.some(
      (booking) => booking.passengerId === user.id
    );

    if (!isDriver && !isPassenger) {
      return NextResponse.json(
        { error: "You do not have access to this conversation." },
        { status: 403 }
      );
    }

    return NextResponse.json({
      trip: {
        id: trip.id,
        fromCity: trip.fromCity,
        toCity: trip.toCity,
        date: trip.date,
        time: trip.time,
        driverName: trip.driver.name,
      },
      messages: trip.messages.map((message) => ({
        id: message.id,
        sender: message.sender,
        text: message.text,
        createdAt: message.createdAt,
      })),
    });
  } catch (error) {
    console.error("MESSAGES GET ERROR:", error);

    return NextResponse.json(
      { error: "Server error while loading messages." },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const { tripId } = await params;
    const body = await request.json();
    const text = body.text?.trim();

    if (!text) {
      return NextResponse.json(
        { error: "Message text is required." },
        { status: 400 }
      );
    }

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        bookings: true,
      },
    });

    if (!trip) {
      return NextResponse.json(
        { error: "Trip not found." },
        { status: 404 }
      );
    }

    const isDriver = trip.driverId === user.id;
    const isPassenger = trip.bookings.some(
      (booking) => booking.passengerId === user.id
    );

    if (!isDriver && !isPassenger) {
      return NextResponse.json(
        { error: "You do not have access to this conversation." },
        { status: 403 }
      );
    }

    const message = await prisma.message.create({
      data: {
        sender: user.name,
        text,
        tripId,
      },
    });

    return NextResponse.json(
      {
        id: message.id,
        sender: message.sender,
        text: message.text,
        createdAt: message.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("MESSAGES POST ERROR:", error);

    return NextResponse.json(
      { error: "Server error while sending message." },
      { status: 500 }
    );
  }
}
