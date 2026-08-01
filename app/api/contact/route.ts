import { NextResponse } from "next/server";
import { supabaseInsert } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const full_name = String(body.full_name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim() || null;
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();

    if (!full_name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject and message are required." },
        { status: 400 },
      );
    }

    const result = await supabaseInsert("contact_messages", {
      full_name,
      email,
      phone,
      subject,
      message,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact api", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
