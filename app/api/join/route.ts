import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/auth/rate-limit";
import { appendMembershipForm } from "@/lib/cms/forms-store";
import { isSupabaseConfigured } from "@/lib/cms/supabase-store";
import { intentLabel, parseJoinBody } from "@/lib/join";
import { notifySignup } from "@/lib/notify/signup-alert";
import { supabaseInsert } from "@/lib/supabase/server";

function clientKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  const rate = checkRateLimit(`join:${clientKey(request)}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later. थोड़ी देर बाद फिर कोशिश करें।" },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (String(body.website || "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseJoinBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { data } = parsed;
  const row = {
    full_name: data.full_name,
    email: data.email,
    phone: data.phone,
    city: data.place,
    country: data.state,
    contribution_type: data.intent,
    message: `Landing signup · ${data.state} · ${data.place} · ${intentLabel(data.intent)}`,
  };

  try {
    if (isSupabaseConfigured()) {
      const result = await supabaseInsert("membership_applications", row);
      if (!result.ok) await appendMembershipForm(row);
    } else {
      await appendMembershipForm(row);
    }
  } catch (err) {
    console.error("join api", err);
    return NextResponse.json(
      { error: "Could not save your name. Please try again. नाम सहेजा नहीं जा सका।" },
      { status: 500 }
    );
  }

  const alerts = await notifySignup(data);
  return NextResponse.json({ ok: true, alerts });
}
