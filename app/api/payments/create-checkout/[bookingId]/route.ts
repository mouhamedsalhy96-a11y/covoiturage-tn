
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";

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

    if (booking.passengerId !== user.id) {
      return NextResponse.json(
        { error: "You do not have access to this booking." },
        { status: 403 }
      );
    }

    if (booking.paymentStatus === "PAID") {
      return NextResponse.json(
        { error: "This booking is already paid." },
        { status: 400 }
      );
    }

    const baseUrl = process.env.APP_URL;

    if (!baseUrl) {
      return NextResponse.json(
        { error: "APP_URL is missing from environment variables." },
        { status: 500 }
      );
    }

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: booking.id,
      customer_email: booking.passengerEmail,
      success_url: `${baseUrl}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/payments/cancel?booking_id=${booking.id}`,
      metadata: {
        bookingId: booking.id,
        passengerId: user.id,
        tripId: booking.trip.id,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            unit_amount: Math.round(booking.totalPrice * 100),
            product_data: {
              name: `${booking.trip.fromCity} → ${booking.trip.toCity}`,
              description: `${booking.seatsBooked} seat(s) on ${booking.trip.date} at ${booking.trip.time}`,
            },
          },
        },
      ],
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("CREATE CHECKOUT ERROR:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Server error while creating Stripe checkout." },
      { status: 500 }
    );
  }
}
