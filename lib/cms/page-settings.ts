/** Inner-page chrome (heroes, CTAs, legal copy) stored in cms_settings.data.pages */

export type CmsListPageSettings = {
  crumb: string;
  title: string;
  description: string;
  eyebrow: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  sectionEyebrow: string;
  sectionTitle: string;
  partnersLabel: string;
  itemCtaLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  searchPlaceholder: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

export type CmsAboutPageSettings = CmsListPageSettings & {
  storyEyebrow: string;
  storyTitle: string;
  storyBody: string;
  visionTitle: string;
  visionBody: string;
  missionTitle: string;
  missionBody: string;
  storyCtaLabel: string;
  storyCtaHref: string;
  image: string;
  imageCaptionEyebrow: string;
  imageCaptionTitle: string;
  leadersEyebrow: string;
  leadersTitle: string;
  valuesEyebrow: string;
  valuesTitle: string;
  testimonialsEyebrow: string;
  testimonialsTitle: string;
};

export type CmsContactPageSettings = CmsListPageSettings & {
  officeLabel: string;
  officesEyebrow: string;
  officesTitle: string;
};

export type CmsMembershipPageSettings = CmsListPageSettings & {
  whyEyebrow: string;
  whyTitle: string;
  stepsLabel: string;
  donateBand: string;
  donateLinkLabel: string;
  donateLinkHref: string;
};

export type CmsAnalyticsPageSettings = CmsListPageSettings & {
  pledgedLabel: string;
  statesLabel: string;
  corridorsLabel: string;
  chartTitle: string;
  sectorTitle: string;
};

export type CmsEventsPageSettings = CmsListPageSettings & {
  featuredEyebrow: string;
  calendarEyebrow: string;
  calendarTitle: string;
  newsEyebrow: string;
  newsTitle: string;
  featuredFallbackImage: string;
};

export type CmsCreativesPageSettings = CmsListPageSettings & {
  posterEyebrow: string;
  posterTitle: string;
  cardEyebrow: string;
  cardTitle: string;
  cardBadge: string;
  cardSampleName: string;
  cardSampleMeta: string;
  cardBenefitsLabel: string;
  cardBenefits: string[];
};

export type CmsProposalsPageSettings = CmsListPageSettings & {
  formEyebrow: string;
  formTitle: string;
  successTitle: string;
  successBody: string;
  successCtaLabel: string;
  successCtaHref: string;
  nextTitle: string;
  nextSteps: string[];
  exploreEyebrow: string;
  submitLabel: string;
  dprTitle: string;
  dprBody: string;
};

export type CmsLegalPageSettings = {
  crumb: string;
  title: string;
  description: string;
  intro: string;
  lastUpdated: string;
  sections: { title: string; body: string }[];
};

export type CmsAssistantSettings = {
  buttonTitle: string;
  buttonSubtitle: string;
  headerTitle: string;
  headerStatus: string;
  welcome: string;
  fallback: string;
  placeholder: string;
  quickLinks: { label: string; href: string }[];
};

export type CmsPagesSettings = {
  about: CmsAboutPageSettings;
  contact: CmsContactPageSettings;
  membership: CmsMembershipPageSettings;
  projects: CmsListPageSettings;
  schemes: CmsListPageSettings;
  tenders: CmsListPageSettings;
  events: CmsEventsPageSettings;
  gallery: CmsListPageSettings;
  resources: CmsListPageSettings;
  analytics: CmsAnalyticsPageSettings;
  creatives: CmsCreativesPageSettings;
  proposals: CmsProposalsPageSettings;
  privacy: CmsLegalPageSettings;
  terms: CmsLegalPageSettings;
};

export const DEFAULT_HERO_BRIDGES = {
  bridgesLabel: "EIDF Bridges",
  bridgesTagline: "One regional council",
  bridges: [
    { label: "Governments", href: "/about" },
    { label: "Investors", href: "/investors" },
    { label: "Enterprise", href: "/projects" },
    { label: "Communities", href: "/membership" },
  ],
  depthImage1: "/images/eidf_03.jpg",
  depthImage2: "/images/eidf_07.jpg",
  depthImage1Label: "Regional development corridor",
  depthImage2Label: "Field engagement",
};

const list = (
  partial: Partial<CmsListPageSettings> &
    Pick<CmsListPageSettings, "crumb" | "title" | "description">
): CmsListPageSettings => ({
  eyebrow: "",
  primaryCtaLabel: "",
  primaryCtaHref: "",
  secondaryCtaLabel: "",
  secondaryCtaHref: "",
  sectionEyebrow: "",
  sectionTitle: "",
  partnersLabel: "",
  itemCtaLabel: "",
  emptyTitle: "",
  emptyDescription: "",
  searchPlaceholder: "",
  ctaTitle: "",
  ctaDescription: "",
  ctaPrimaryLabel: "",
  ctaPrimaryHref: "",
  ctaSecondaryLabel: "",
  ctaSecondaryHref: "",
  ...partial,
});

export const DEFAULT_PAGES: CmsPagesSettings = {
  about: {
    ...list({
      crumb: "Home / About",
      title: "About EIDF",
      description:
        "A Section 8 development forum uniting diaspora capital, government partnership, and community dignity across Eastern India.",
      ctaTitle: "Be part of the story of a region on the rise",
      ctaDescription:
        "Join diaspora leaders, corporates, and changemakers accelerating Eastern India's transformation.",
      ctaPrimaryLabel: "Join the Movement",
      ctaPrimaryHref: "/membership",
      ctaSecondaryLabel: "Contact Us",
      ctaSecondaryHref: "/contact",
    }),
    storyEyebrow: "Our Story",
    storyTitle: "Powered by diaspora. Rooted in Eastern India.",
    storyBody:
      "Eastern India Development Forum is powered by Umanand Eastern Foundation. We connect diaspora who built success elsewhere with skill centres, heritage restoration, and livelihood programmes — working hand-in-hand with government and industry across Bihar, Jharkhand, Odisha, West Bengal, Assam, and the North East.",
    visionTitle: "Vision",
    visionBody:
      "Make Eastern India a global example of diaspora-powered, dignity-first development.",
    missionTitle: "Mission",
    missionBody:
      "Fund skilling, heritage and rights work by connecting members, government and industry.",
    storyCtaLabel: "Join the Movement",
    storyCtaHref: "/membership",
    image: "/images/eidf_05.jpg",
    imageCaptionEyebrow: "Diaspora Roundtable",
    imageCaptionTitle: "Connecting capital with community",
    leadersEyebrow: "Leadership",
    leadersTitle: "Guided by experience and purpose",
    valuesEyebrow: "Values",
    valuesTitle: "What guides every partnership",
    testimonialsEyebrow: "Voices",
    testimonialsTitle: "What partners say",
  },
  contact: {
    ...list({
      crumb: "Home / Contact",
      title: "We're here to help",
      description:
        "Reach the EIDF secretariat for membership, funding, media, or partnership inquiries.",
    }),
    officeLabel: "Head Office",
    officesEyebrow: "Regional Offices",
    officesTitle: "Also present in",
  },
  membership: {
    ...list({
      crumb: "Home / Membership",
      title: "Join the Movement",
      description:
        "Direct your time, skill, funds, or network toward projects transforming Eastern India.",
      primaryCtaLabel: "Apply Now",
      primaryCtaHref: "#apply",
      secondaryCtaLabel: "Fund a Project Instead",
      secondaryCtaHref: "/contact?intent=donate",
    }),
    whyEyebrow: "Why Join",
    whyTitle: "Membership that creates real impact",
    stepsLabel: "How it works",
    donateBand: "Prefer to fund a project directly?",
    donateLinkLabel: "Visit Donate",
    donateLinkHref: "/contact?intent=donate",
  },
  projects: list({
    crumb: "Home / Projects",
    title: "Our Projects",
    description:
      "Every project is funded by members, corporates and government partners — delivered at no cost to the communities it serves.",
    primaryCtaLabel: "Fund a Project",
    primaryCtaHref: "/contact?intent=donate",
    secondaryCtaLabel: "Submit a Proposal",
    secondaryCtaHref: "/proposals/submit",
    sectionEyebrow: "Active Initiatives",
    sectionTitle: "Transforming communities across Eastern India",
    partnersLabel: "Working with",
    itemCtaLabel: "Support this project",
    ctaTitle: "Have a project or partnership in mind?",
    ctaDescription:
      "Tell us about your initiative — we help structure funding, partnerships, and delivery.",
    ctaPrimaryLabel: "Submit a Proposal",
    ctaPrimaryHref: "/proposals/submit",
    ctaSecondaryLabel: "Talk to Us",
    ctaSecondaryHref: "/contact",
  }),
  schemes: list({
    crumb: "Home / Schemes",
    title: "Government Schemes & Subsidies",
    description:
      "Fiscal incentives, interest subvention, stamp duty waivers, and seed grants across Eastern Indian states.",
    primaryCtaLabel: "Request Scheme Assistance",
    primaryCtaHref: "/contact?intent=scheme_assistance",
    secondaryCtaLabel: "Browse Policy Reports",
    secondaryCtaHref: "/resources",
    sectionEyebrow: "Available Schemes",
    sectionTitle: "Incentives matched to your venture",
    itemCtaLabel: "Apply via EIDF",
    emptyTitle: "No schemes matched this state filter.",
    emptyDescription: "View all schemes →",
    ctaTitle: "Ready to unlock state incentives?",
    ctaDescription:
      "Submit your project profile and let EIDF facilitate scheme applications across Eastern India.",
    ctaPrimaryLabel: "Request Assistance",
    ctaPrimaryHref: "/contact?intent=scheme_assistance",
    ctaSecondaryLabel: "Submit a Proposal",
    ctaSecondaryHref: "/proposals/submit",
  }),
  tenders: list({
    crumb: "Home / Tenders",
    title: "Tender Assistance Center",
    description:
      "Verified public-sector RFPs and procurement opportunities across Bihar, Jharkhand, Odisha, West Bengal, and Assam.",
    sectionEyebrow: "Open Opportunities",
    sectionTitle: "tenders",
    searchPlaceholder: "Search by title or reference number...",
    emptyTitle: "No tenders found",
    emptyDescription: "Try adjusting filters or search keywords.",
    itemCtaLabel: "Guidance",
    ctaTitle: "Need bid preparation support?",
    ctaDescription:
      "EIDF's tender desk helps with documentation, consortium formation, and compliance readiness.",
    ctaPrimaryLabel: "Request Guidance",
    ctaPrimaryHref: "/contact?intent=tender_guidance",
    ctaSecondaryLabel: "View Schemes",
    ctaSecondaryHref: "/schemes",
  }),
  events: {
    ...list({
      crumb: "Home / Events",
      title: "Events & News",
      description:
        "Seminars, investor meets, and announcements shaping Eastern India's development agenda.",
      primaryCtaLabel: "View Gallery",
      primaryCtaHref: "/gallery",
      secondaryCtaLabel: "Get Event Updates",
      secondaryCtaHref: "/membership",
      itemCtaLabel: "Register",
      ctaTitle: "Stay updated on every seminar and site visit",
      ctaDescription:
        "Join the member network to receive event invitations and briefings.",
      ctaPrimaryLabel: "Become a Member",
      ctaPrimaryHref: "/membership",
      ctaSecondaryLabel: "Contact Us",
      ctaSecondaryHref: "/contact",
    }),
    featuredEyebrow: "Featured",
    calendarEyebrow: "Calendar",
    calendarTitle: "All events",
    newsEyebrow: "News",
    newsTitle: "Latest announcements",
    featuredFallbackImage: "/images/eidf_06.jpg",
  },
  gallery: list({
    crumb: "Home / Gallery",
    title: "Media Hub",
    description:
      "Seminars, site visits, community moments, and brand assets from across Eastern India.",
    primaryCtaLabel: "Brand Creatives",
    primaryCtaHref: "/creatives",
    secondaryCtaLabel: "Events & News",
    secondaryCtaHref: "/events",
    searchPlaceholder: "Search assets...",
    emptyTitle: "No media assets found",
    emptyDescription: "Try adjusting your filters or search keywords.",
    ctaTitle: "Capture the next chapter with us",
    ctaDescription:
      "Attend seminars, site visits, and conventions — then find the moments here.",
    ctaPrimaryLabel: "View Upcoming Events",
    ctaPrimaryHref: "/events",
    ctaSecondaryLabel: "Join the Network",
    ctaSecondaryHref: "/membership",
  }),
  resources: list({
    crumb: "Home / Resources",
    title: "Knowledge Center",
    description:
      "Research reports, macroeconomic assessments, and state policy frameworks for investors and partners.",
    primaryCtaLabel: "View Analytics",
    primaryCtaHref: "/analytics",
    secondaryCtaLabel: "Browse Schemes",
    secondaryCtaHref: "/schemes",
    sectionEyebrow: "Publications",
    sectionTitle: "Research you can act on",
    ctaTitle: "Need a custom brief for your state or sector?",
    ctaDescription: "Request a tailored research note from the EIDF knowledge desk.",
    ctaPrimaryLabel: "Request a Briefing",
    ctaPrimaryHref: "/contact",
    ctaSecondaryLabel: "Join as Member",
    ctaSecondaryHref: "/membership",
  }),
  analytics: {
    ...list({
      crumb: "Home / Analytics",
      title: "Development Analytics",
      description:
        "Capital deployment, state-wise funding, and sector breakdown across Eastern India.",
      primaryCtaLabel: "Explore Investment Zones",
      primaryCtaHref: "/investors",
      secondaryCtaLabel: "Download Reports",
      secondaryCtaHref: "/resources",
      sectionEyebrow: "Capital Intelligence",
      sectionTitle: "Where capital is flowing",
      ctaTitle: "Use this data to guide your next investment",
      ctaDescription:
        "Pair analytics with live investment zones and scheme assistance.",
      ctaPrimaryLabel: "Explore Investment Zones",
      ctaPrimaryHref: "/investors",
      ctaSecondaryLabel: "Talk to Analyst Desk",
      ctaSecondaryHref: "/contact",
    }),
    pledgedLabel: "Total Pledged Capital",
    statesLabel: "States & Regions Tracked",
    corridorsLabel: "Active PPP Corridors",
    chartTitle: "Pledged Capital by State (₹ Cr)",
    sectorTitle: "Sector Capital Share",
  },
  creatives: {
    ...list({
      crumb: "Home / Creatives",
      eyebrow: "Brand Assets",
      title: "Poster & Membership Card",
      description:
        "Print-ready templates in the same brand system as the website — for seminars, conventions, and member recognition.",
      primaryCtaLabel: "Browse Media Hub",
      primaryCtaHref: "/gallery",
      secondaryCtaLabel: "Back to site",
      secondaryCtaHref: "/",
      ctaTitle: "Ready to carry the EIDF membership card?",
      ctaDescription:
        "Apply to join the network and receive your digital member credentials.",
      ctaPrimaryLabel: "Become a Member",
      ctaPrimaryHref: "/membership",
      ctaSecondaryLabel: "Contact Secretariat",
      ctaSecondaryHref: "/contact",
    }),
    posterEyebrow: "Print Template",
    posterTitle: "Seminar Poster",
    cardEyebrow: "Member Identity",
    cardTitle: "Membership Card",
    cardBadge: "MEMBER",
    cardSampleName: "Aarav Mahato",
    cardSampleMeta: "Global Patron · ID EIDF-000482",
    cardBenefitsLabel: "Member Benefits",
    cardBenefits: [
      "Priority project briefings",
      "Annual convention invite",
      "Recognition on our website",
      "Direct line to the secretariat",
    ],
  },
  proposals: {
    ...list({
      crumb: "Home / Proposals",
      eyebrow: "EIDF Project Facilitation Board",
      title: "Submit a Development Proposal",
      description:
        "Submit project proposals for infrastructure, renewable energy, skill centers, or agri-tech clusters across Eastern India to request capital facilitation, government clearances, and land allotment guidance.",
    }),
    formEyebrow: "Proposal Form",
    formTitle: "Project details",
    successTitle: "Proposal Submitted Successfully",
    successBody:
      "Your proposal has been logged with EIDF Facilitation Desk. Ref ID: {ref}. An officer will get in touch within 2 business days.",
    successCtaLabel: "Explore Investment Zones",
    successCtaHref: "/investors",
    nextTitle: "What happens next?",
    nextSteps: [
      "Desk reviews eligibility within 2 business days",
      "Matched with state cell & scheme incentives",
      "Facilitation for clearances and capital intros",
    ],
    exploreEyebrow: "Also Explore",
    submitLabel: "Submit Project Proposal to Board",
    dprTitle: "Detailed Project Report",
    dprBody:
      "After submission, email your DPR / pitch deck (PDF, max 20MB) to the facilitation desk with your Ref ID in the subject line.",
  },
  privacy: {
    crumb: "Home / Privacy",
    title: "Privacy Policy",
    description:
      "How Eastern India Development Forum collects, uses, and protects information shared through this website.",
    intro:
      "This policy applies to eidf.org.in and related EIDF digital services operated by Umanand Eastern Foundation. By using the site you agree to the practices described below.",
    lastUpdated: "August 2026",
    sections: [
      {
        title: "Information we collect",
        body: "When you contact us, apply for membership, subscribe to briefings, or submit a proposal, we collect the details you provide — typically name, email, phone, organisation context, and message content. We also receive standard technical logs (IP address, browser type, and pages visited) needed to operate and secure the site.",
      },
      {
        title: "How we use information",
        body: "We use submissions to respond to inquiries, process membership and proposals, send requested briefings, improve services, and meet legal or compliance obligations. We do not sell personal data.",
      },
      {
        title: "Sharing",
        body: "Information may be shared with EIDF officers, authorised partners, or state facilitation desks only when needed to fulfil your request. Service providers that host or process data act under contractual confidentiality.",
      },
      {
        title: "Retention & security",
        body: "We retain records for as long as needed for facilitation, audit, and legal purposes, then delete or anonymise them. Access to admin systems is restricted and protected with authentication controls.",
      },
      {
        title: "Your choices",
        body: "To update, correct, or request deletion of your information, or to unsubscribe from briefings, email the address listed in site settings. See also our Terms of Use.",
      },
    ],
  },
  terms: {
    crumb: "Home / Terms",
    title: "Terms of Use",
    description:
      "Conditions for using the Eastern India Development Forum website and related digital services.",
    intro:
      "By accessing eidf.org.in you agree to these terms. If you do not agree, please do not use the site. EIDF is a development facilitation platform under Umanand Eastern Foundation.",
    lastUpdated: "August 2026",
    sections: [
      {
        title: "Informational content",
        body: "Schemes, tenders, investment zones, reports, and analytics are provided for general information and facilitation. They are not legal, financial, or investment advice. Always verify details with the issuing authority before acting.",
      },
      {
        title: "Submissions",
        body: "Contact forms, membership applications, newsletter sign-ups, and proposals must be accurate and submitted in good faith. Submitting a form does not create a contract, guarantee funding, or guarantee government clearances. EIDF may decline or refer requests at its discretion.",
      },
      {
        title: "Acceptable use",
        body: "You may not misuse the site, attempt unauthorised access to admin systems, scrape content at scale, or submit spam, malware, or unlawful material.",
      },
      {
        title: "Intellectual property",
        body: "Site branding, copy, and creative assets belong to EIDF / Umanand Eastern Foundation unless otherwise noted. You may share links for non-commercial reference with attribution.",
      },
      {
        title: "Liability",
        body: "To the fullest extent permitted by law, EIDF is not liable for decisions made solely on the basis of website content, third-party links, or temporary service interruptions.",
      },
      {
        title: "Contact",
        body: "Questions about these terms can be sent to the email in site settings. See our Privacy Policy.",
      },
    ],
  },
};

export const DEFAULT_ASSISTANT: CmsAssistantSettings = {
  buttonTitle: "EIDF Assistant",
  buttonSubtitle: "Ask about tenders & investment",
  headerTitle: "Development Assistant",
  headerStatus: "Online · Facilitation",
  welcome:
    "Namaste! I am the EIDF Smart Development Assistant. How can I facilitate your vision for Eastern India today?",
  fallback:
    "EIDF connects Governments, Investors, Enterprises, and NGOs to accelerate sustainable growth. What specific domain or state would you like to explore?",
  placeholder: "Ask about tenders, schemes, investment...",
  quickLinks: [
    { label: "Search Open Tenders", href: "/tenders" },
    { label: "Check State Subsidies", href: "/schemes" },
    { label: "Submit Project Proposal", href: "/proposals/submit" },
  ],
};

function mergeList<T extends CmsListPageSettings>(base: T, partial?: Partial<T> | null): T {
  return { ...base, ...(partial || {}) };
}

export function mergePages(partial?: Partial<CmsPagesSettings> | null): CmsPagesSettings {
  const src = partial || {};
  return {
    about: mergeList(DEFAULT_PAGES.about, src.about),
    contact: mergeList(DEFAULT_PAGES.contact, src.contact),
    membership: mergeList(DEFAULT_PAGES.membership, src.membership),
    projects: mergeList(DEFAULT_PAGES.projects, src.projects),
    schemes: mergeList(DEFAULT_PAGES.schemes, src.schemes),
    tenders: mergeList(DEFAULT_PAGES.tenders, src.tenders),
    events: mergeList(DEFAULT_PAGES.events, src.events),
    gallery: mergeList(DEFAULT_PAGES.gallery, src.gallery),
    resources: mergeList(DEFAULT_PAGES.resources, src.resources),
    analytics: mergeList(DEFAULT_PAGES.analytics, src.analytics),
    creatives: {
      ...mergeList(DEFAULT_PAGES.creatives, src.creatives),
      cardBenefits:
        src.creatives?.cardBenefits ?? DEFAULT_PAGES.creatives.cardBenefits,
    },
    proposals: {
      ...mergeList(DEFAULT_PAGES.proposals, src.proposals),
      nextSteps: src.proposals?.nextSteps ?? DEFAULT_PAGES.proposals.nextSteps,
    },
    privacy: {
      ...DEFAULT_PAGES.privacy,
      ...(src.privacy || {}),
      sections: src.privacy?.sections ?? DEFAULT_PAGES.privacy.sections,
    },
    terms: {
      ...DEFAULT_PAGES.terms,
      ...(src.terms || {}),
      sections: src.terms?.sections ?? DEFAULT_PAGES.terms.sections,
    },
  };
}

export function mergeAssistant(
  partial?: Partial<CmsAssistantSettings> | null
): CmsAssistantSettings {
  const src = partial || {};
  return {
    ...DEFAULT_ASSISTANT,
    ...src,
    quickLinks: src.quickLinks ?? DEFAULT_ASSISTANT.quickLinks,
  };
}
