import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { fullname, email, subject, message } = await req.json();

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'omair786955@gmail.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${fullname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Error sending contact email:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
