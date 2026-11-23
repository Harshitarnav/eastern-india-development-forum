"use client";

import dynamic from "next/dynamic";
import { usePublicSite } from "@/lib/cms/public-provider";
import { DEFAULT_HOMEPAGE } from "@/lib/cms/types";
import { homepagePreview } from "@/lib/cms/home-preview";
import type { StateDetail } from "@/content/site";
import { sectionVisible } from "./sectionVisible";
import { HeroSection } from "./sections/HeroSection";
import { ServicesSection } from "./sections/ServicesSection";
import { ImpactSection } from "./sections/ImpactSection";
import { AboutSection } from "./sections/AboutSection";
import { SchemesSection } from "./sections/SchemesSection";
import { TendersSection } from "./sections/TendersSection";

const MapSection = dynamic(() =>
  import("./sections/MapSection").then((m) => ({ default: m.MapSection }))
);
const ProjectsSection = dynamic(() =>
  import("./sections/ProjectsSection").then((m) => ({ default: m.ProjectsSection }))
);
const InvestorsSection = dynamic(() =>
  import("./sections/InvestorsSection").then((m) => ({ default: m.InvestorsSection }))
);
const NewsEventsSection = dynamic(() =>
  import("./sections/NewsEventsSection").then((m) => ({
    default: m.NewsEventsSection,
  }))
);
const ResourcesSection = dynamic(() =>
  import("./sections/ResourcesSection").then((m) => ({ default: m.ResourcesSection }))
);
const FaqSection = dynamic(() =>
  import("./sections/FaqSection").then((m) => ({ default: m.FaqSection }))
);
const OfficesSection = dynamic(() =>
  import("./sections/OfficesSection").then((m) => ({ default: m.OfficesSection }))
);
const MembershipCtaSection = dynamic(() =>
  import("./sections/MembershipCtaSection").then((m) => ({
    default: m.MembershipCtaSection,
  }))
);
const AiAssistant = dynamic(
  () => import("@/components/AiAssistant").then((m) => ({ default: m.AiAssistant })),
  { ssr: false }
);

export default function HomePage() {
  const site = usePublicSite();
  const hp = site.homepage || DEFAULT_HOMEPAGE;
  const show = (key: string) => sectionVisible(site.sections, key);

  const onlineServices = site.onlineServices || [];
  const homeSchemes = homepagePreview(site.schemes, "schemes");
  const homeTenders = homepagePreview(site.tenders, "tenders");
  const homeProjects = homepagePreview(site.projects, "projects");
  const homeInvestments = homepagePreview(site.investmentZones, "investments");
  const homeNews = homepagePreview(site.news, "news");
  const homeEvents = homepagePreview(site.events, "events");
  const homeReports = homepagePreview(site.reports, "resources");
  const homeValues = homepagePreview(site.values, "values");

  return (
    <div className="bg-cream">
      <AiAssistant />

      {show("hero") && (
        <HeroSection
          site={{
            hero: site.hero,
          }}
        />
      )}

      {show("onlineServices") && (
        <ServicesSection services={onlineServices} chrome={hp.onlineServices} />
      )}

      {show("impact") && (
        <ImpactSection impactStats={site.impactStats || []} />
      )}

      {show("about") && (
        <AboutSection
          chrome={hp.about}
          values={homeValues}
          leaders={(site.leaders || []).slice(0, 4)}
          cta={{ label: hp.about.ctaLabel, href: hp.about.ctaHref }}
        />
      )}

      {show("map") && (
        <MapSection
          states={(site.statesData || []) as StateDetail[]}
          chrome={hp.map}
        />
      )}

      {show("schemes") && (
        <SchemesSection schemes={homeSchemes} chrome={hp.schemes} />
      )}

      {show("tenders") && (
        <TendersSection tenders={homeTenders} chrome={hp.tenders} />
      )}

      {show("projects") && (
        <ProjectsSection projects={homeProjects} chrome={hp.projects} />
      )}

      {show("investors") && (
        <InvestorsSection zones={homeInvestments} chrome={hp.investments} />
      )}

      {show("events") && (
        <NewsEventsSection
          news={homeNews}
          events={homeEvents}
          newsChrome={hp.news}
          eventsChrome={hp.events}
        />
      )}

      {show("resources") && (
        <ResourcesSection reports={homeReports} chrome={hp.resources} />
      )}

      {show("faq") && <FaqSection faqs={site.faqs || []} chrome={hp.faq} />}

      {show("offices") && (
        <OfficesSection offices={site.offices || []} chrome={hp.offices} />
      )}

      {show("cta") && (
        <MembershipCtaSection
          chrome={hp.membershipCta}
          floatingMetrics={site.hero.floatingMetrics || []}
        />
      )}
    </div>
  );
}
