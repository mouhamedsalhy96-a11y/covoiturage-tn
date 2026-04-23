
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getPaymeeApiKey, getPaymeeBaseUrl } from "@/lib/paymee";

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

    const appUrl = process.env.APP_URL;

    if (!appUrl) {
      return NextResponse.json(
        { error: "APP_URL is missing." },
        { status: 500 }
      );
    }

    const baseUrl = getPaymeeBaseUrl();
    const apiKey = getPaymeeApiKey();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(`${baseUrl}/api/v2/payments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${apiKey}`,
        },
        body: JSON.stringify({
          amount: booking.totalPrice,
          note: `${booking.trip.fromCity} -> ${booking.trip.toCity}`,
          first_name: user.name.split(" ")[0] || user.name,
          last_name: user.name.split(" ").slice(1).join(" ") || user.name,
          email: user.email,
          phone: user.phone || "00000000",
          return_url: `${appUrl}/payments/paymee-return?booking_id=${booking.id}`,
          cancel_url: `${appUrl}/payments/cancel?booking_id=${booking.id}`,
          webhook_url: `${appUrl}/api/webhooks/paymee`,
          order_id: booking.id,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const result = await response.json();

      if (!response.ok) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: {
            paymentMethod: "PAYMEE",
            paymentStatus: "PROVIDER_UNAVAILABLE",
            status: "Pending",
          },
        });

        return NextResponse.json({
          redirectUrl: `/payments/local-info/${booking.id}?provider=paymee&state=error`,
        });
      }

      if (!result.data?.payment_url) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: {
            paymentMethod: "PAYMEE",
            paymentStatus: "PROVIDER_UNAVAILABLE",
            status: "Pending",
          },
        });

        return NextResponse.json({
          redirectUrl: `/payments/local-info/${booking.id}?provider=paymee&state=missing_url`,
        });
      }

      await prisma.booking.update({
        where: { id: booking.id },
        data: {
          paymentMethod: "PAYMEE",
          paymentStatus: "PENDING_ONLINE_PAYMENT",
          status: "Pending",
          paymentReference: result.data.token ?? null,
        },
      });

      return NextResponse.json({
        redirectUrl: result.data.payment_url,
      });
    } catch (providerError) {
      clearTimeout(timeout);

      console.error("PAYMEE FETCH ERROR:", providerError);

      await prisma.booking.update({
        where: { id: booking.id },
        data: {
          paymentMethod: "PAYMEE",
          paymentStatus: "PROVIDER_UNAVAILABLE",
          status: "Pending",
        },
      });

      return NextResponse.json({
        redirectUrl: `/payments/local-info/${booking.id}?provider=paymee&state=unreachable`,
      });
    }
  } catch (error) {
    console.error("LOCAL GATEWAY PREP ERROR:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Server error while preparing local online payment." },
      { status: 500 }
    );
  }
}
