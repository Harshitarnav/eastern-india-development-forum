"use client";

import { InteractiveMap } from "@/components/InteractiveMap";
import { ClipReveal } from "@/components/motion";
import { SectionHeader } from "@/components/ui";
import type { StateDetail } from "@/content/site";
import type { CmsHomepageMapSettings } from "@/lib/cms/types";

type MapSectionProps = {
  states: StateDetail[];
  chrome: CmsHomepageMapSettings;
};

export function MapSection({ states, chrome }: MapSectionProps) {
  return (
    <section id="state-map" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <ClipReveal direction="up">
          <SectionHeader
            eyebrow={chrome.eyebrow}
            title={chrome.title}
            description={chrome.description}
            align="left"
          />
        </ClipReveal>
        <ClipReveal direction="scale" delay={0.1}>
          <InteractiveMap states={states} chrome={chrome} />
        </ClipReveal>
      </div>
    </section>
  );
}
