import { NextResponse } from "next/server";
import { isValidEmail } from "../../../lib/email";

type Payload = { email?: string };

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  const webhook = process.env.WAITLIST_WEBHOOK_URL;

  // Option A: send to a webhook (Zapier/Make/Sheet/CRM) that you configure later.
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "evidentai-launch", ts: new Date().toISOString() })
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "We couldn't add you right now. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  }

  // If no webhook is configured yet, keep the UI working but tell you what to do.
  return NextResponse.json(
    {
      ok: false,
      error:
        "Waitlist backend not configured. Set WAITLIST_WEBHOOK_URL in Vercel environment variables."
    },
    { status: 501 }
  );
}
