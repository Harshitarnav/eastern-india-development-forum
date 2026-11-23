import { NextResponse } from "next/server";
import { getPublicRedirects } from "@/lib/cms/public-redirects";

/** Public read of active redirects for proxy/middleware. */
export async function GET() {
  try {
    const redirects = await getPublicRedirects();
    return NextResponse.json(
      {
        redirects,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch {
    return NextResponse.json({ redirects: [] });
  }
}
