
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const trips = await prisma.trip.findMany({
    include: {
      driver: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(trips);
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to publish a trip." },
        { status: 401 }
      );
    }

    if (user.role !== "DRIVER" && user.role !== "BOTH") {
      return NextResponse.json(
        { error: "Only drivers can publish trips." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const trip = await prisma.trip.create({
      data: {
        fromCity: body.fromCity,
        toCity: body.toCity,
        date: body.date,
        time: body.time,
        price: Number(body.price),
        seats: Number(body.seats),
        pickupPoint: body.pickupPoint || null,
        luggage: body.luggage || null,
        notes: body.notes || null,
        driverId: user.id,
      },
      include: {
        driver: true,
      },
    });

    return NextResponse.json(trip, { status: 201 });
  } catch (error) {
    console.error("TRIP POST ERROR:", error);

    return NextResponse.json(
      { error: "Server error while publishing trip." },
      { status: 500 }
    );
  }
}
