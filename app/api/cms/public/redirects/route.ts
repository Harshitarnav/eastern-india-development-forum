import { NextResponse } from "next/server";
import { getCmsRedirects } from "@/lib/cms/repository";

/** Public read of active redirects for proxy/middleware. */
export async function GET() {
  try {
    const redirects = await getCmsRedirects();
    return NextResponse.json(
      {
        redirects: redirects.map((r) => ({
          from_path: r.from_path,
          to_path: r.to_path,
          status_code: r.status_code || 301,
        })),
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
