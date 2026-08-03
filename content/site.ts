export interface StateDetail {
  id: string;
  name: string;
  capital: string;
  projectsCount: number;
  investmentAmount: string;
  keySectors: string[];
  infrastructure: string[];
  govtInitiatives: string[];
  successStory: string;
  description: string;
  badge: string;
}

export interface FocusArea {
  id: string;
  title: string;
  iconName: string;
  tag: string;
  desc: string;
  highlights: string[];
  activeProjects: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  sector: string;
  state: string;
  desc: string;
  status: "Under Construction" | "Operational" | "Planning" | "Completed";
  timeline: string;
  budget: string;
  fundingSource: string;
  partners: string[];
  objectives: string[];
  image: string;
}

export interface SchemeItem {
  id: string;
  title: string;
  authority: string;
  category: string;
  state: string;
  eligibility: string[];
  benefits: string;
  applicationProcess: string;
  deadline: string;
}

export interface TenderItem {
  id: string;
  tenderNo: string;
  title: string;
  issuingAuthority: string;
  category: string;
  state: string;
  estimatedCost: string;
  publishedDate: string;
  closingDate: string;
  status: "Open" | "Closing Soon" | "Under Evaluation";
  docLink: string;
}

export interface InvestmentZone {
  id: string;
  name: string;
  location: string;
  state: string;
  area: string;
  focusIndustries: string[];
  incentives: string[];
  pppModel: string;
  contactEmail: string;
}

export interface ResearchReport {
  id: string;
  title: string;
  category: "Policy" | "Whitepaper" | "Annual Report" | "Case Study";
  author: string;
  date: string;
  fileSize: string;
  summary: string;
  downloadUrl: string;
}

export interface EventItem {
  id: string;
  title: string;
  type: "Summit" | "Investor Meet" | "Workshop" | "Conference";
  date: string;
  location: string;
  mode: "Hybrid" | "In-Person" | "Virtual";
  desc: string;
  registerUrl: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  source: string;
  summary: string;
  category: "Press Release" | "Announcement" | "Media Coverage";
  url: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Membership" | "Investment" | "Tenders" | "Partnerships";
}

export const site = {
  name: "Eastern India Development Forum",
  shortName: "EIDF",
  tagline: "Accelerating Sustainable & Inclusive Transformation Across Eastern India",
  poweredBy: "Powered by Umanand Eastern Foundation ",
  email: "contact@eidf.org.in",
  phone: "+91 (0651) 291-2025",
  regNo: "U85500JH2025NPL024051",
  president: "Sanjeev Kumar",
  headquarters: "Umanand Auditorium, Diamond City, Oyna, Ranchi, Jharkhand 834001",
  address: ["Umanand Auditorium", "Diamond City, Oyna", "Ranchi, Jharkhand 834001"],

  benefits: [
    { title: "Be Part of the Change", desc: "Direct your time, skill or funds toward projects transforming your home region." },
    { title: "Global Community", desc: "Connect with diaspora and local changemakers working toward one shared mission." },
    { title: "Recognition & Updates", desc: "Get named recognition and regular briefings on funded projects." },
    { title: "Shape the Roadmap", desc: "Have a voice in which sites, skills and sectors we take on next." },
  ],
  applySteps: [
    { n: "01", title: "Apply Online", desc: "Tell us how you'd like to contribute — time, funds, skill or network." },
    { n: "02", title: "A Short Conversation", desc: "Our team connects with you to align on the right project or role." },
    { n: "03", title: "Welcome Aboard", desc: "Get onboarded as a member with access to updates and gatherings." },
  ],
  partners: ["NSDC", "MSDE", "DGT", "State Govt.", "Industry Partners"],
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
  galleryThumbs: [
    { label: "Lamp Lighting", category: "Seminars" },
    { label: "Chief Guest Address", category: "Seminars" },
    { label: "Audience", category: "Seminars" },
    { label: "Site Visit — Diamond City", category: "Site Visits" },
    { label: "Floral Tribute", category: "Community" },
    { label: "Cultural Performance", category: "Community" },
  ],
  upcomingEvents: [
    { title: "Founders' Convention", date: "Coming Soon" },
    { title: "Diaspora Meet — London", date: "TBA" },
  ],
  posterGuests: [
    { name: "Justice Navneet Kumar", role: "Special Guest" },
    { name: "Smt. Nesha Oraon", role: "Chief Speaker" },
    { name: "Shri Manoj Jena", role: "Guest of Honour" },
    { name: "Dr. Sita Kumari", role: "Guest of Honour" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Focus Areas", href: "/#focus-areas" },
    { label: "State Map", href: "/#state-map" },
    { label: "Projects", href: "/projects" },
    { label: "Tenders", href: "/tenders" },
    { label: "Investors", href: "/investors" },
    { label: "Schemes", href: "/schemes" },
    { label: "Resources", href: "/resources" },
    { label: "Membership", href: "/membership" },
    { label: "Events", href: "/events" },
    { label: "Contact", href: "/contact" },
  ],

  hero: {
    eyebrow: "OFFICIAL DEVELOPMENT ECOSYSTEM FOR EASTERN INDIA",
    headline: "Uniting Stakeholders. Unleashing Regional Capital. Empowering Communities.",
    subheading:
      "EIDF is the apex facilitating authority connecting Governments, Global Investors, Enterprise Leaders, Startups, NGOs, and Diaspora to build sustainable infrastructure, industrial parks, and human potential across Bihar, Jharkhand, Odisha, West Bengal, Assam, and the North Eastern States.",
    ctas: {
      primary: { label: "Join the Movement", href: "/membership" },
      secondary: { label: "Submit Development Proposal", href: "/proposals/submit" },
      tertiary: { label: "Explore Opportunities", href: "/investors" },
    },
    floatingMetrics: [
      { label: "Target Investment Facilitation", value: "₹25,000 Cr" },
      { label: "Active Project Corridors", value: "42+" },
      { label: "Skilling Benchmark (2031)", value: "1,00,000 Youth" },
    ],
  },

  impactStats: [
    { key: "projects", value: 142, label: "Projects Facilitated", suffix: "+" },
    { key: "states", value: 8, label: "States & UTs Connected", suffix: "" },
    { key: "partnerships", value: 38, label: "Government Partnerships", suffix: "+" },
    { key: "investors", value: 450, label: "Investor Capital (₹ Cr)", prefix: "₹", suffix: " Cr+" },
    { key: "industries", value: 260, label: "Industries Supported", suffix: "+" },
    { key: "beneficiaries", value: 1.2, label: "Lives Impacted (Millions)", suffix: "M+" },
    { key: "startups", value: 1850, label: "Entrepreneurs & Startups Assisted", suffix: "+" },
  ],

  statesData: [
    {
      id: "bihar",
      name: "Bihar",
      capital: "Patna",
      projectsCount: 34,
      investmentAmount: "₹8,400 Cr",
      keySectors: ["Agri-Processing", "Renewable Energy", "Textiles & Handloom", "IT Parks"],
      infrastructure: ["Ganga Expressway Corridor", "Patna Metro", "Darbhanga Logistics Hub"],
      govtInitiatives: ["Bihar Industrial Promotion Policy 2026", "Startup Bihar Mission"],
      successStory: "Establishment of food processing clusters in Muzaffarpur benefiting 12,000 farmers.",
      description: "Fastest-growing agro-economy with expanding industrial parks and high-speed logistics links.",
      badge: "Agri-Tech & Logistics Hub",
    },
    {
      id: "jharkhand",
      name: "Jharkhand",
      capital: "Ranchi",
      projectsCount: 29,
      investmentAmount: "₹11,200 Cr",
      keySectors: ["Mining & Minerals", "Green Steel", "EV Manufacturing", "Forest Eco-Tourism"],
      infrastructure: ["Ranchi Industrial Hub", "Jamshedpur-Dhanbad Industrial Corridor", "Adityapur Auto Cluster"],
      govtInitiatives: ["Jharkhand Industrial & Investment Policy", "Clean Energy Minerals Charter"],
      successStory: "First Net-Zero Industrial Park in Adityapur generating 8,500 green jobs.",
      description: "Mineral powerhouse transitioning to sustainable green manufacturing, EV supply chains, and renewable energy.",
      badge: "Industrial & Mineral Heartland",
    },
    {
      id: "odisha",
      name: "Odisha",
      capital: "Bhubaneswar",
      projectsCount: 38,
      investmentAmount: "₹14,800 Cr",
      keySectors: ["Deep-Sea Ports", "Green Hydrogen", "Aerospace & Defence", "Skill Academies"],
      infrastructure: ["Paradip Coastal SEZ", "Dhamra Maritime Corridor", "Bhubaneswar Info Valley"],
      govtInitiatives: ["Make in Odisha Platform", "Skill Odisha Global Initiative"],
      successStory: "World-class Skill Academy campus on Cuttack-Bhubaneswar corridor training 15,000 technicians annually.",
      description: "India's eastern gateway for maritime trade, heavy industries, port-led development, and tech innovation.",
      badge: "Maritime & Skill Development Hub",
    },
    {
      id: "westbengal",
      name: "West Bengal",
      capital: "Kolkata",
      projectsCount: 25,
      investmentAmount: "₹9,500 Cr",
      keySectors: ["Logistics & Warehousing", "Fintech & IT", "Jute & Textiles", "Deep Sea Port"],
      infrastructure: ["Tajpur Deep Sea Port", "Silicon Valley Hub Newtown", "Kolkata-Amritsar Freight Corridor"],
      govtInitiatives: ["BGBS Gateway", "MSME Synergy Scheme"],
      successStory: "Eastern India Logistics Hub connecting Kolkata Port directly to South East Asia trade lanes.",
      description: "Financial hub of the East, connecting inland waterways, international trade corridors, and financial services.",
      badge: "Financial & Gateway Capital",
    },
    {
      id: "assam",
      name: "Assam",
      capital: "Dispur / Guwahati",
      projectsCount: 16,
      investmentAmount: "₹6,100 Cr",
      keySectors: ["Semiconductor Assembly", "Tea & Bio-Refineries", "Inland Water Transport", "Bamboo Eco-Products"],
      infrastructure: ["Jagiroad Semiconductor Facility", "Guwahati Tech City", "Brahmaputra Waterway Logistics"],
      govtInitiatives: ["Advantage Assam 2.0", "North East Industrial Development Scheme"],
      successStory: "High-tech semiconductor packaging park in Morigaon empowering regional engineering talent.",
      description: "Gateway to North East India and South East Asia under the Act East Policy.",
      badge: "Act East Gateway & Semiconductor Hub",
    },
    {
      id: "northeast",
      name: "North Eastern States",
      capital: "Regional Hubs (Shillong, Imphal, Agartala, Aizawl, Kohima, Gangtok, Itanagar)",
      projectsCount: 18,
      investmentAmount: "₹4,200 Cr",
      keySectors: ["Organic Agriculture", "Hydroelectric Power", "Border Trade Corridors", "Ecotourism"],
      infrastructure: ["Trans-Arunachal Highway", "Agartala-Akhaura Rail Link", "Sikkim Organic Cluster"],
      govtInitiatives: ["PM-DevINE Scheme", "DONER Infrastructure Masterplan"],
      successStory: "100% Organic Agri-export corridor connecting North East organic produce to Gulf and European markets.",
      description: "Rich biodiversity, immense hydropower potential, organic farming excellence, and strategic international borders.",
      badge: "Organic Farming & Eco-Power Corridor",
    },
  ] as StateDetail[],

  focusAreas: [
    {
      id: "infrastructure",
      title: "Core Infrastructure & Logistics",
      iconName: "Truck",
      tag: "CONNECTIVITY",
      desc: "Accelerating expressways, dedicated freight corridors, multimodal logistics parks, ports, and inland waterways.",
      highlights: ["3 New Freight Hubs", "Multi-modal Inland Terminals", "Airport Expansion Support"],
      activeProjects: 24,
    },
    {
      id: "renewable-energy",
      title: "Clean Energy & Hydro Power",
      iconName: "Zap",
      tag: "SUSTAINABILITY",
      desc: "Promoting solar micro-grids, green hydrogen production, floating solar arrays, and hydro power installations.",
      highlights: ["Net-Zero Target 2040", "15 GW Solar Parks", "Green Hydrogen Policy Facilitation"],
      activeProjects: 18,
    },
    {
      id: "manufacturing",
      title: "Industrial & Manufacturing Growth",
      iconName: "Factory",
      tag: "INDUSTRY 4.0",
      desc: "Empowering heavy engineering, automobile, EV supply chains, electronics ESDM, and green steel clusters.",
      highlights: ["Special Economic Zones", "PLI Assistance", "Custom Clearance Desks"],
      activeProjects: 31,
    },
    {
      id: "ai-technology",
      title: "AI, Digital Transformation & IT",
      iconName: "Cpu",
      tag: "INNOVATION",
      desc: "Fostering semiconductor packaging, data centers, software parks, and public digital infrastructure.",
      highlights: ["AI Excellence Centers", "Regional Data Hubs", "Cyber Security Incubators"],
      activeProjects: 19,
    },
    {
      id: "skill-development",
      title: "Skill Academies & Vocational Training",
      iconName: "GraduationCap",
      tag: "HUMAN CAPITAL",
      desc: "NSDC-aligned centers offering high-impact training in robotics, hospitality, welding, EV repair, and healthcare.",
      highlights: ["1,00,000 Trained Goal", "State-of-the-art Labs", "Global Placement Cell"],
      activeProjects: 27,
    },
    {
      id: "agriculture",
      title: "Agri-Tech & Food Processing",
      iconName: "Sprout",
      tag: "RURAL ECONOMY",
      desc: "Cold chain logistics, mega food parks, organic certification hubs, and precision farming technology adoption.",
      highlights: ["Farmer Producer Orgs (FPOs)", "Export Quality Certification", "Solar Irrigation Networks"],
      activeProjects: 22,
    },
    {
      id: "tourism",
      title: "Heritage, Eco & Medical Tourism",
      iconName: "Compass",
      tag: "CULTURE & HERITAGE",
      desc: "Restoring historic monuments, developing Buddhist and tribal cultural circuits, and promoting wellness resorts.",
      highlights: ["Heritage Conservation", "Eco-Homestay Schemes", "Buddhist Circuit Upgrades"],
      activeProjects: 15,
    },
    {
      id: "smart-cities",
      title: "Smart Cities & Urban Resilience",
      iconName: "Building2",
      tag: "URBAN DEVELOPMENT",
      desc: "Modernizing urban transport, waste-to-energy facilities, flood mitigation systems, and green building standards.",
      highlights: ["Urban Water Management", "EV Charging Grid", "Civic Tech Integration"],
      activeProjects: 16,
    },
  ] as FocusArea[],

  ecosystemNodes: [
    { label: "Government Bodies", role: "Policy, Licensing, Land Allotment & Infrastructure Clearances" },
    { label: "Global Investors & Funds", role: "FDI, Venture Capital, Private Equity & Project Finance" },
    { label: "Industrial Enterprises", role: "Anchor Investments, Manufacturing & Job Creation" },
    { label: "Startups & Innovators", role: "Disruptive Solutions, Agri-Tech & Digital Platforms" },
    { label: "Academic Institutions", role: "R&D, Skill Curricula, Incubators & Patent Facilitation" },
    { label: "NGOs & Civil Society", role: "Grassroots Execution, Community Empowerment & Women Inclusion" },
    { label: "Development Agencies", role: "Multilateral Aid, SDG Alignment & Impact Assessments" },
    { label: "Citizens & Diaspora", role: "Investment Contributions, Mentorship & Public Oversight" },
  ],

  projects: [
    {
      id: "proj-1",
      title: "Eastern Skill Centre & Innovation Campus",
      tag: "SKILL DEVELOPMENT",
      sector: "Human Capital",
      state: "Odisha",
      desc: "A flagship G+3 state-of-the-art vocational campus situated on the Cuttack-Bhubaneswar corridor training youth in precision machining, EV technology, and healthcare assistance.",
      status: "Under Construction",
      timeline: "2024 - 2027",
      budget: "₹120 Cr",
      fundingSource: "PPP + Foundation Grant",
      partners: ["NSDC", "State Skill Development Authority", "Diamond City Group"],
      objectives: [
        "Skill 15,000 technicians per annum",
        "100% placement linkage with regional industrial parks",
        "Women-dedicated technical skilling wing",
      ],
      image: "SKILL_CENTRE",
    },
    {
      id: "proj-2",
      title: "Adityapur Net-Zero Green Industrial Park",
      tag: "MANUFACTURING",
      sector: "Clean Industry",
      state: "Jharkhand",
      desc: "Transforming 450 acres of manufacturing area into a zero-carbon emission cluster featuring rooftop solar power, circular waste recycling, and shared effluent treatment.",
      status: "Operational",
      timeline: "2023 - 2026",
      budget: "₹450 Cr",
      fundingSource: "Private Equity + State Subsidies",
      partners: ["Jharkhand Industrial Infra Development Corp", "Tata Power", "EIDF Green Fund"],
      objectives: [
        "Cut carbon emissions by 85%",
        "Attract ₹2,000 Cr in EV component manufacturing",
        "Create 8,500 skilled industrial jobs",
      ],
      image: "GREEN_PARK",
    },
    {
      id: "proj-3",
      title: "Ganga Express Waterways Freight Terminal",
      tag: "INFRASTRUCTURE",
      sector: "Logistics",
      state: "Bihar",
      desc: "Multimodal logistics park near Patna connecting Inland Waterway NW-1 with Patna-Kolkata expressways for low-cost agricultural export movement.",
      status: "Planning",
      timeline: "2025 - 2028",
      budget: "₹680 Cr",
      fundingSource: "Central Sagarmala Fund + PPP",
      partners: ["Inland Waterways Authority of India", "Bihar State Investment Promotion Board"],
      objectives: [
        "Reduce logistics costs for Bihar farmers by 35%",
        "Direct barge loading for containerized food grains",
        "200,000 MT storage capacity cold chain warehousing",
      ],
      image: "WATERWAY_HUB",
    },
    {
      id: "proj-4",
      title: "Brahmaputra Bio-Agri & Organic Processing Corridor",
      tag: "AGRICULTURE",
      sector: "Agri-Tech",
      state: "Assam",
      desc: "Integrated organic certification, cold storage, and export processing facility for North Eastern spices, tea, and specialty fruits.",
      status: "Under Construction",
      timeline: "2024 - 2026",
      budget: "₹210 Cr",
      fundingSource: "NABARD + Ministry of Food Processing",
      partners: ["Assam Agribusiness & Rural Transformation Project", "APEDA", "EIDF Assam Chapter"],
      objectives: [
        "Connect 45 Farmer Producer Organizations",
        "Direct export corridors to ASEAN markets",
        "Zero-pesticide verification testing lab",
      ],
      image: "AGRI_CORRIDOR",
    },
  ] as ProjectItem[],

  schemes: [
    {
      id: "sch-1",
      title: "Eastern Industrial Capital Subsidy Scheme 2026",
      authority: "State Development Department",
      category: "Industrial Subsidies",
      state: "All Eastern States",
      eligibility: [
        "Manufacturing units establishing operations in designated tier-2/3 districts",
        "Minimum capital investment of ₹10 Crores",
        "Commitment to hire at least 60% local workforce",
      ],
      benefits: "Up to 30% capital investment subsidy (capped at ₹5 Cr) + 100% stamp duty exemption.",
      applicationProcess: "Online application submission via EIDF Single Window Portal with DPR and Land Clearance.",
      deadline: "31 Dec 2026",
    },
    {
      id: "sch-2",
      title: "North East Startup & Innovation Catalyst Fund",
      authority: "DPIIT & PM-DevINE",
      category: "Startup Funding",
      state: "Assam & North East",
      eligibility: [
        "DPIIT-recognized startups registered in North Eastern states",
        "Tech or Agri-Tech focus with working prototype",
      ],
      benefits: "Seed grant up to ₹50 Lakhs + equity matching fund up to ₹2 Crores.",
      applicationProcess: "Pitch submission through EIDF Startup Hub followed by investor jury panel review.",
      deadline: "Rolling Basis",
    },
    {
      id: "sch-3",
      title: "Heritage Restoration & Eco-Tourism PPP Grant",
      authority: "Ministry of Tourism & State Chapters",
      category: "Tourism",
      state: "Bihar, Odisha & West Bengal",
      eligibility: [
        "Heritage resort operators, conservation trusts, or social enterprises",
        "Property listed under regional heritage registry",
      ],
      benefits: "50% project cost matching grant up to ₹2.5 Crores + tourism marketing assistance.",
      applicationProcess: "Submit heritage conservation plan and community benefit charter.",
      deadline: "15 Oct 2026",
    },
  ] as SchemeItem[],

  tenders: [
    {
      id: "tnd-101",
      tenderNo: "EIDF/INFRA/2026/089",
      title: "Construction of Multimodal Cold Storage & Processing Hub at Muzaffarpur",
      issuingAuthority: "Bihar Industrial Area Development Authority (BIADA)",
      category: "Civil Construction & Refrigeration",
      state: "Bihar",
      estimatedCost: "₹45.8 Crores",
      publishedDate: "28 July 2026",
      closingDate: "25 August 2026",
      status: "Open",
      docLink: "/docs/tenders/tender-101.pdf",
    },
    {
      id: "tnd-102",
      tenderNo: "EIDF/SOLAR/2026/042",
      title: "Rooftop Solar PV Installation (25 MW Cumulative) Across Adityapur Industrial Units",
      issuingAuthority: "Jharkhand Renewable Energy Development Agency (JREDA)",
      category: "Renewable Energy",
      state: "Jharkhand",
      estimatedCost: "₹82.5 Crores",
      publishedDate: "15 July 2026",
      closingDate: "10 August 2026",
      status: "Closing Soon",
      docLink: "/docs/tenders/tender-102.pdf",
    },
    {
      id: "tnd-103",
      tenderNo: "EIDF/SKILL/2026/014",
      title: "Empanelment of Training Partners for NSDC Level-4 Robotics & Automation Courses",
      issuingAuthority: "Eastern Skill Development Council",
      category: "Skill Development",
      state: "Odisha",
      estimatedCost: "₹18.0 Crores",
      publishedDate: "01 August 2026",
      closingDate: "30 August 2026",
      status: "Open",
      docLink: "/docs/tenders/tender-103.pdf",
    },
  ] as TenderItem[],

  investmentZones: [
    {
      id: "zone-1",
      name: "Bhubaneswar Info Valley Technology & Hardware SEZ",
      location: "Bhubaneswar",
      state: "Odisha",
      area: "600 Acres",
      focusIndustries: ["Semiconductor ESDM", "Software Export", "Data Centers", "R&D Labs"],
      incentives: ["Single Window Clearances in 15 days", "100% Electricity Duty Exemption for 10 Yrs", "Plug-and-Play Space"],
      pppModel: "Build-Operate-Lease",
      contactEmail: "invest.odisha@eidf.org.in",
    },
    {
      id: "zone-2",
      name: "Dhanbad Clean Energy & Mineral Processing Corridor",
      location: "Dhanbad - Bokaro Region",
      state: "Jharkhand",
      area: "1,200 Acres",
      focusIndustries: ["Battery Recycling", "Green Steel", "Coal Bed Methane Processing", "Heavy Machinery"],
      incentives: ["25% Land Price Subvention", "Green Technology Adoption Rebate", "Dedicated High-Tension Power Grid"],
      pppModel: "Joint Venture / State PPP",
      contactEmail: "invest.jharkhand@eidf.org.in",
    },
  ] as InvestmentZone[],

  reports: [
    {
      id: "rep-1",
      title: "Eastern India Economic Growth & Investment Outlook 2026–2030",
      category: "Whitepaper",
      author: "EIDF Research & Policy Cell",
      date: "July 2026",
      fileSize: "4.8 MB",
      summary: "A comprehensive policy blueprint mapping ₹1.5 Lakh Crore investment opportunities across inland ports, renewable grids, and technical education.",
      downloadUrl: "#download-report-1",
    },
    {
      id: "rep-2",
      title: "Multimodal Freight & Inland Waterways Masterplan for Ganga-Brahmaputra Basin",
      category: "Policy",
      author: "Infrastructure Advisory Council",
      date: "June 2026",
      fileSize: "8.2 MB",
      summary: "Analyzing logistics cost reductions and export competitiveness for agricultural produce moving from Bihar/Assam to Bay of Bengal ports.",
      downloadUrl: "#download-report-2",
    },
  ] as ResearchReport[],

  events: [
    {
      id: "ev-1",
      title: "Eastern India Global Investors Summit 2026",
      type: "Summit",
      date: "24-25 October 2026",
      location: "Biswa Bangla Convention Centre, Kolkata",
      mode: "In-Person",
      desc: "Bringing together 1,200+ industry leaders, NRI diaspora investors, foreign ambassadors, and state chief ministers to sign MoUs.",
      registerUrl: "/events/register?id=ev-1",
    },
    {
      id: "ev-2",
      title: "Agri-Tech & Food Processing Innovation Workshop",
      type: "Workshop",
      date: "12 September 2026",
      location: "Patna Convention Centre, Bihar",
      mode: "Hybrid",
      desc: "Connecting FPOs with venture capitalists, solar cold-chain innovators, and export regulatory authorities.",
      registerUrl: "/events/register?id=ev-2",
    },
  ] as EventItem[],

  news: [
    {
      id: "nw-1",
      title: "EIDF signs MoU with State Governments to set up 5 new Skill Centers of Excellence",
      date: "02 August 2026",
      source: "Economic Times & EIDF Media Cell",
      summary: "The initiatives will provide industry 4.0 technical skills to over 25,000 students across Jharkhand, Bihar, and Odisha.",
      category: "Press Release",
      url: "#news-1",
    },
    {
      id: "nw-2",
      title: "Diaspora Development Fund crosses ₹500 Crores in pledged capital commitments",
      date: "25 July 2026",
      source: "Financial Express",
      summary: "Global diaspora members in USA, UK, UAE, and Singapore channel funds toward heritage preservation and rural solar grids.",
      category: "Announcement",
      url: "#news-2",
    },
  ] as NewsItem[],

  leaders: [
    { name: "Shri Sanjeev Kumar", role: "Chairman, EIDF · CMD, Diamond City Group", image: "/images/leaders/sanjeev-kumar.jpg" },
    { name: "Mr. Arnab Sinha", role: "Joint Director & Chief Operating Officer", image: "/images/leaders/arnab-sinha.jpg" },
    { name: "Dr. Sita Kumari", role: "Senior Advisor — Human Rights & Inclusive Social Policy", image: "/images/leaders/sita-kumari.jpg" },
    { name: "Smt. Nesha Oraon, IRS", role: "Distinguished Policy Advisor", image: "/images/leaders/nesha-oraon.jpg" },
  ],

  values: [
    { title: "Regional Unity", desc: "Forging seamless cooperation between state governments, private capital, and citizens." },
    { title: "Inclusive Growth", desc: "Ensuring development benefits tribal communities, women entrepreneurs, and rural youth." },
    { title: "Uncompromising Integrity", desc: "Rigorous transparency, open RFP processes, and clear governance metrics." },
    { title: "Future Innovation", desc: "Leveraging AI, renewable technology, and modern logistics to build sustainable prosperity." },
  ],

  faqs: [
    {
      id: "faq-1",
      question: "What is the primary role of the Eastern India Development Forum (EIDF)?",
      answer: "EIDF is an apex development facilitation platform under Umanand Eastern Foundation. It connects governments, corporate investors, startups, educational bodies, and diaspora to drive infrastructure development, investment promotion, skilling, and public-private partnerships across Eastern India.",
      category: "General",
    },
    {
      id: "faq-2",
      question: "How can investors submit investment proposals or explore PPP opportunities?",
      answer: "Investors can use the dedicated Investor Portal or Submit Proposal page on our platform. EIDF acts as a single-window facilitator to connect you with state investment promotion boards, land allotment authorities, and regional joint venture partners.",
      category: "Investment",
    },
    {
      id: "faq-3",
      question: "What services does the Tender Assistance Center provide?",
      answer: "The Tender Assistance Center compiles open government and private sector RFPs across Bihar, Jharkhand, Odisha, West Bengal, Assam, and the North East. We provide tender documentation guidance, eligibility vetting, and joint-bidding consortium partner matching.",
      category: "Tenders",
    },
    {
      id: "faq-4",
      question: "Who is eligible for EIDF Membership and how can one join?",
      answer: "Membership is open to Diaspora Professionals, Citizens, Enterprises, Academic Institutions, and NGOs. Members gain access to exclusive investment roundtables, project briefs, policy consultation forums, and networking summits.",
      category: "Membership",
    },
  ] as FAQItem[],

  offices: [
    {
      city: "Ranchi (Headquarters)",
      tag: "Jharkhand HQ",
      address: "Umanand Auditorium, Diamond City, Oyna, Ranchi, Jharkhand 834001",
      phone: "+91 651 291 3840",
      email: "hq.ranchi@eidf.org.in",
    },
    {
      city: "Patna",
      tag: "Bihar Regional Office",
      address: "Exhibition Road Trade Center, 4th Floor, Patna, Bihar 800001",
      phone: "+91 612 254 9912",
      email: "bihar@eidf.org.in",
    },
    {
      city: "Bhubaneswar",
      tag: "Odisha Regional Office",
      address: "Fortune Towers, Chandaka Industrial Estate, Bhubaneswar, Odisha 751024",
      phone: "+91 674 230 1188",
      email: "odisha@eidf.org.in",
    },
    {
      city: "Kolkata",
      tag: "West Bengal & Finance Hub",
      address: "Eco Space IT Park, Action Area II, Newtown, Kolkata, West Bengal 700160",
      phone: "+91 33 4082 7700",
      email: "kolkata@eidf.org.in",
    },
    {
      city: "Guwahati",
      tag: "Assam & North East Gateway",
      address: "Tech City Campus, Borjhar, Guwahati, Assam 781015",
      phone: "+91 361 280 4433",
      email: "northeast@eidf.org.in",
    },
  ],
};

export type NavHref = (typeof site.nav)[number]["href"];
