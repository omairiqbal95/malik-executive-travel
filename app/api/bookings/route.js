import clientPromise from "@/lib/mongodb";

// GET /api/bookings
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("met");

    // Fetch all bookings
    const bookings = await db.collection("bookings").find({}).toArray();

    return new Response(JSON.stringify(bookings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API GET Error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch bookings" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// POST /api/bookings
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("met");

    const newBooking = await req.json();

    if (!newBooking || Object.keys(newBooking).length === 0) {
      return new Response(JSON.stringify({ error: "Booking data is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await db.collection("bookings").insertOne(newBooking);

    return new Response(JSON.stringify({ message: "Booking created", id: result.insertedId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API POST Error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to create booking" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
