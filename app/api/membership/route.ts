import { NextResponse } from "next/server";
import { supabaseInsert } from "@/lib/supabase/server";

export async function POST(request: Request) {
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
        { status: 400 },
      );
    }

    const result = await supabaseInsert("membership_applications", {
      full_name,
      email,
      phone,
      city,
      country,
      contribution_type,
      message,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("membership api", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
