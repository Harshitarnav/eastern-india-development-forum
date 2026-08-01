export const site = {
  name: "Eastern India Development Forum",
  shortName: "EIDF",
  tagline: "Bringing Eastern India's Global Family Home",
  poweredBy: "Powered by Umanand Eastern Foundation",
  email: "hello@eidf.org.in",
  phone: "+91 00000 00000",
  address: ["Umanand Auditorium", "Diamond City, Oyna", "Ranchi, Jharkhand"],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Membership", href: "/membership" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  stats: [
    { value: "3", label: "States — Bihar, Jharkhand & Odisha" },
    { value: "12,000+", label: "Youth to be skilled by 2031" },
    { value: "₹10 Cr+", label: "In flagship projects underway" },
    { value: "500+", label: "Diaspora members worldwide" },
  ],
  homeProjects: [
    {
      tag: "SKILL DEVELOPMENT",
      title: "Eastern Skill Centre",
      desc: "A G+3 vocational campus on the Cuttack–Bhubaneswar corridor training youth in hospitality, electrical & technical trades.",
      img: "SKILL CENTRE",
    },
    {
      tag: "SKILL DEVELOPMENT",
      title: "Eastern Skill Academy",
      desc: "NSDC-aligned training centres launching in Ranchi, expanding across Bihar, Jharkhand & Odisha over 5 years.",
      img: "SKILL ACADEMY",
    },
    {
      tag: "HERITAGE & TOURISM",
      title: "Heritage & Tourism Initiative",
      desc: "Restoring heritage sites across the region to build sustainable, community-led tourism.",
      img: "HERITAGE SITE",
    },
  ],
  allProjects: [
    {
      tag: "SKILL DEVELOPMENT",
      title: "Eastern Skill Centre",
      desc: "G+3 vocational campus training youth in hospitality, electrical & technical trades.",
      img: "SKILL CENTRE",
      status: "Diamond City · Cuttack",
    },
    {
      tag: "SKILL DEVELOPMENT",
      title: "Eastern Skill Academy",
      desc: "NSDC-aligned centres expanding across three states over 5 years.",
      img: "SKILL ACADEMY",
      status: "Ranchi HQ",
    },
    {
      tag: "HERITAGE & TOURISM",
      title: "Heritage & Tourism Initiative",
      desc: "Restoring heritage sites to build community-led tourism.",
      img: "HERITAGE SITE",
      status: "Phase 1",
    },
    {
      tag: "ADVOCACY",
      title: "Human Rights & Inclusive Development",
      desc: "Seminars and legal literacy drives advancing equality and dignity.",
      img: "SEMINAR",
      status: "Ongoing",
    },
  ],
  benefits: [
    {
      title: "Be Part of the Change",
      desc: "Direct your time, skill or funds toward projects transforming your home region.",
    },
    {
      title: "Global Community",
      desc: "Connect with diaspora and local changemakers working toward one shared mission.",
    },
    {
      title: "Recognition & Updates",
      desc: "Get named recognition and regular briefings on funded projects.",
    },
    {
      title: "Shape the Roadmap",
      desc: "Have a voice in which sites, skills and sectors we take on next.",
    },
  ],
  applySteps: [
    {
      n: "01",
      title: "Apply Online",
      desc: "Tell us how you'd like to contribute — time, funds, skill or network.",
    },
    {
      n: "02",
      title: "A Short Conversation",
      desc: "Our team connects with you to align on the right project or role.",
    },
    {
      n: "03",
      title: "Welcome Aboard",
      desc: "Get onboarded as a member with access to updates and gatherings.",
    },
  ],
  leaders: [
    { name: "Shri Sanjeev Kumar", role: "Chairman, EIDF · CMD, Diamond City" },
    { name: "Mr. Arnab Sinha", role: "Joint Director" },
    { name: "Dr. Sita Kumari", role: "Advisor — Human Rights & Social Justice" },
    { name: "Smt. Nesha Oraon, IRS", role: "Advisor" },
  ],
  values: [
    { title: "Equality", desc: "Opportunity that reaches every community." },
    { title: "Dignity", desc: "Development that respects local identity." },
    { title: "Transparency", desc: "Clear reporting on every rupee raised." },
    { title: "Inclusive Growth", desc: "Progress shared across the region." },
  ],
  partners: ["NSDC", "MSDE", "DGT", "State Govt.", "Industry Partners"],
  galleryThumbs: [
    { label: "Lamp Lighting", category: "Seminars" },
    { label: "Chief Guest Address", category: "Seminars" },
    { label: "Audience", category: "Seminars" },
    { label: "Site Visit — Diamond City", category: "Site Visits" },
    { label: "Floral Tribute", category: "Community" },
    { label: "Cultural Performance", category: "Community" },
    { label: "Panel Discussion", category: "Seminars" },
    { label: "Community Meet", category: "Community" },
    { label: "Vote of Thanks", category: "Seminars" },
  ],
  upcomingEvents: [
    { title: "Founders' Convention", date: "Coming Soon" },
    { title: "Diaspora Meet — London", date: "TBA" },
  ],
  offices: [
    { city: "Ranchi", tag: "Head Office · Jharkhand" },
    { city: "Patna", tag: "Bihar" },
    { city: "Bhubaneswar", tag: "Odisha" },
  ],
  posterGuests: [
    { name: "Justice Navneet Kumar", role: "Special Guest" },
    { name: "Smt. Nesha Oraon", role: "Chief Speaker" },
    { name: "Shri Manoj Jena", role: "Guest of Honour" },
    { name: "Dr. Sita Kumari", role: "Guest of Honour" },
  ],
} as const;

export type NavHref = (typeof site.nav)[number]["href"];
