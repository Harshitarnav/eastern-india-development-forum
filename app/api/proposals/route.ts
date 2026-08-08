import { NextRequest, NextResponse } from "next/server";
import { appendProposalForm } from "@/lib/cms/forms-store";
import { checkRateLimit } from "@/lib/auth/rate-limit";

function clientKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  const rate = checkRateLimit(`proposal:${clientKey(request)}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } }
    );
  }

  try {
    const body = await request.json();
    const title = String(body.title || "").trim();
    const state = String(body.state || "").trim();
    const sector = String(body.sector || "").trim();
    const budget = String(body.budget || "").trim();
    const summary = String(body.summary || "").trim();
    const contact_name = String(body.contact_name || "").trim();
    const contact_email = String(body.contact_email || "").trim();
    const contact_phone = String(body.contact_phone || "").trim() || null;
    const dpr_note = String(body.dpr_note || "").trim() || null;

    if (!title || !state || !sector || !budget || !summary || !contact_name || !contact_email) {
      return NextResponse.json(
        {
          error:
            "Title, state, sector, budget, summary, contact name and email are required.",
        },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const row = await appendProposalForm({
      title,
      state,
      sector,
      budget,
      summary,
      contact_name,
      contact_email,
      contact_phone,
      dpr_note,
    });

    return NextResponse.json({ ok: true, ref_id: row.ref_id });
  } catch (err) {
    console.error("proposals api", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
