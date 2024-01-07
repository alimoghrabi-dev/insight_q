import Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const userId = session.metadata?.userId;
  const courseId = session.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId && !courseId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.purchase.create({
      data: {
        userId: userId || "",
        courseId: courseId || "",
      },
    });
  } else {
    return new NextResponse(`Webhook Error: ${event.type}`, { status: 200 });
  }

  return new NextResponse("OK", { status: 200 });
}
