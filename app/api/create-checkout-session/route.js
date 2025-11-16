import Stripe from "stripe";
import { Resend } from "resend"; // Correct named import

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { vehicle, extras = [], passenger, pickup, dropoff, date, time } = body;

    // Calculate total
    const total = Math.round(
      (vehicle.price + extras.reduce((a, e) => a + (e.price || 0), 0)) * 100
    ) / 100;

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: vehicle.title },
            unit_amount: Math.round(total * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/booking-receved`,
      cancel_url: `${req.headers.get("origin")}/cancel`,
      customer_email: passenger.email,
      metadata: {
        pickup: pickup.address,
        dropoff: dropoff.address,
        date,
        time,
        vehicle: vehicle.title,
      },
    });

    // --- Send email via Resend ---
    try {
      const extrasList =
        extras.length > 0
          ? extras.map(e => `${e.title || e.id} x${e.quantity || 1}`).join(", ")
          : "None";

      const emailHtml = `
        <h2>Booking Confirmation</h2>
        <p>Hi ${passenger.firstName} ${passenger.lastName},</p>
        <p>Thanks for your booking! Here are the details:</p>
        <ul>
          <li><strong>Pickup Address:</strong> ${pickup.address}</li>
          <li><strong>Dropoff Address:</strong> ${dropoff.address}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Vehicle:</strong> ${vehicle.title}</li>
          <li><strong>Extras:</strong> ${extrasList}</li>
          <li><strong>Total Price:</strong> €${total}</li>
        </ul>
        <p>We look forward to serving you!</p>
        <p>— Malik Executive Travel</p>
      `;

      await resend.emails.send({
        from: "onboarding@resend.dev", 
        to: [passenger.email, "omariqbal2017@gmail.com"], // Passenger + owner
        subject: `Booking Confirmed: ${vehicle.title}`,
        html: emailHtml,
      });

    } catch (err) {
      console.error("Resend email error:", err);
    }

    return new Response(JSON.stringify({ url: session.url, total }), { status: 200 });

  } catch (err) {
    console.error("Stripe checkout error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
