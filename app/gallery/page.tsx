"use client";

import { useMemo, useState } from "react";
import { PageHero, PlaceholderMedia } from "@/components/ui";
import { site } from "@/content/site";

const tabs = ["All", "Seminars", "Site Visits", "Community"] as const;

export default function GalleryPage() {
  const [active, setActive] = useState<(typeof tabs)[number]>("All");

  const items = useMemo(() => {
    if (active === "All") return site.galleryThumbs;
    return site.galleryThumbs.filter((g) => g.category === active);
  }, [active]);

  return (
    <>
      <PageHero crumb="Home / Gallery" title="Gallery" compact />

      <section className="flex flex-wrap items-center justify-center gap-3 px-6 py-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              active === tab
                ? "bg-gold text-navy-deep"
                : "bg-cream-warm text-ink/70 hover:bg-line"
            }`}
          >
            {tab}
          </button>
        ))}
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((gth) => (
            <PlaceholderMedia
              key={gth.label}
              label={gth.label}
              className="min-h-[220px] rounded-[10px] md:min-h-[260px]"
            />
          ))}
        </div>
      </section>
    </>
  );
}
