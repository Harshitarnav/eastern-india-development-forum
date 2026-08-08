import { NextRequest, NextResponse } from "next/server";
import { supabaseInsert } from "@/lib/supabase/server";
import { appendContactForm } from "@/lib/cms/forms-store";
import { isSupabaseConfigured } from "@/lib/cms/supabase-store";
import { checkRateLimit } from "@/lib/auth/rate-limit";

function clientKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  const rate = checkRateLimit(`contact:${clientKey(request)}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } }
    );
  }

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
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const row = {
      full_name,
      email,
      phone,
      subject,
      message,
    };

    if (isSupabaseConfigured()) {
      const result = await supabaseInsert("contact_messages", row);
      if (!result.ok) {
        // Fall back to local store so public forms never hard-fail locally
        await appendContactForm(row);
      }
    } else {
      await appendContactForm(row);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact api", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
