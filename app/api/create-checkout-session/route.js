import Stripe from "stripe";
import { useBookingStore } from "@/store/useBookingStore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received body on server:", body);

    const { vehicle, extras = [], passenger, pickup, dropoff, date, time, extrasData } = body;

    if (!vehicle) console.log("Missing vehicle");
    if (!passenger) console.log("Missing passenger");

    // Calculate total using the same logic as your store
    const basePrice = vehicle.price != null
      ? vehicle.price
      : useBookingStore.getState().calculateBasePrice(pickup, dropoff, new Date(date), time);

    const extrasTotal = useBookingStore.getState().calculateExtrasTotal(extras, extrasData);

    const total = Math.round((basePrice + extrasTotal) * 100) / 100;

    if (!total || isNaN(total)) {
      return new Response(JSON.stringify({ error: "Invalid total amount" }), { status: 400 });
    }

    const line_items = [
      {
        price_data: {
          currency: "eur",
          product_data: { name: vehicle.title },
          unit_amount: Math.round(total * 100), // in cents
        },
        quantity: 1,
      },
      ...extras.map(e => {
        const price = Math.round((e.price || 0) * 100);
        if (price <= 0) return null;
        return {
          price_data: {
            currency: "eur",
            product_data: { name: e.title },
            unit_amount: price,
          },
          quantity: e.quantity || 1,
        };
      }).filter(Boolean),
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/booking-receved`,
      cancel_url: `${req.headers.get("origin")}/cancel`,
      customer_email: passenger.email,
    });

    return new Response(JSON.stringify({ url: session.url, total }), { status: 200 });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
