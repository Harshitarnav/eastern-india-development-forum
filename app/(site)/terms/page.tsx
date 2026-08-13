import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { getPublicCmsBundle } from "@/lib/cms/server";
import { buildPageMetadata } from "@/lib/cms/seo";
import { DEFAULT_PAGES } from "@/lib/cms/page-settings";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/terms", { title: "Terms of Use" });
}

export default async function TermsPage() {
  const { site } = await getPublicCmsBundle();
  const page = site.pages?.terms || DEFAULT_PAGES.terms;

  return (
    <>
      <PageHero
        crumb={page.crumb}
        title={page.title}
        description={page.description}
        compact
      />
      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="border-l-2 border-gold pl-5 text-sm leading-relaxed text-muted md:text-[15px]">
            {page.intro}
          </div>

          <div className="mt-12 space-y-10">
            {page.sections.map((section, i) => (
              <article key={section.title} className="border-t border-line pt-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] font-bold text-gold-label">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-xl font-bold tracking-tight text-navy md:text-2xl">
                    {section.title}
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-[15px]">
                  {section.body}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-12 border-t border-line pt-6 text-xs text-muted/80">
            Last updated: {page.lastUpdated}
            {site.email ? (
              <>
                {" "}
                ·{" "}
                <a href={`mailto:${site.email}`} className="font-semibold text-navy hover:text-gold">
                  {site.email}
                </a>
              </>
            ) : null}
          </p>
        </div>
      </section>
    </>
  );
}
