import { NextRequest, NextResponse } from "next/server";
import { supabaseInsert } from "@/lib/supabase/server";
import { appendMembershipForm } from "@/lib/cms/forms-store";
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
  const rate = checkRateLimit(`membership:${clientKey(request)}`);
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
    const city = String(body.city || "").trim() || null;
    const country = String(body.country || "").trim() || null;
    const phone = String(body.phone || "").trim() || null;
    const contribution_type = String(body.contribution_type || "").trim() || null;
    const message = String(body.message || "").trim() || null;

    if (!full_name || !email) {
      return NextResponse.json(
        { error: "Full name and email are required." },
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
      city,
      country,
      contribution_type,
      message,
    };

    if (isSupabaseConfigured()) {
      const result = await supabaseInsert("membership_applications", row);
      if (!result.ok) {
        await appendMembershipForm(row);
      }
    } else {
      await appendMembershipForm(row);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("membership api", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
