export type OpportunityStatus = "open" | "rolling" | "seasonal" | "closed";

export type OpportunityKind = "call" | "portal" | "programme";

export type OpportunityTimestampKind = "published" | "verified" | "updated";

export type OpportunityItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  sourceUrl?: string;
  summary: string;
  audience: string;
  geography: string;
  verificationNote: string;
  timestamp: string;
  timestampKind: OpportunityTimestampKind;
  deadline?: string;
  status: OpportunityStatus;
  kind: OpportunityKind;
  tags: string[];
};

export const opportunitiesSnapshotAt = "2026-04-22T09:00:00Z";

export const fundingOpportunities: OpportunityItem[] = [
  {
    id: "eu-uganda-cso-2026",
    title: "Uganda civil society call for proposals worth EUR 5.1 million",
    url: "https://www.eeas.europa.eu/delegations/uganda/call-proposals-%E2%82%AC51-million-civil-society-organisations-country-call-proposals_en?s=127",
    source: "EU Delegation to Uganda",
    summary:
      "Official 2026 call supporting inclusive natural-resource management, livelihoods, clean-energy access, and equitable local economic participation in Uganda.",
    audience:
      "Registered civil society organisations and local partners able to lead or join proposals in Uganda.",
    geography: "Uganda",
    verificationNote:
      "Published on the official European External Action Service page for the EU Delegation to Uganda.",
    timestamp: "2026-04-16T00:00:00Z",
    timestampKind: "published",
    deadline: "2026-06-04T21:59:00Z",
    status: "open",
    kind: "call",
    tags: ["Civil society", "Livelihoods", "Local economy", "Uganda"],
  },
  {
    id: "un-partner-portal",
    title: "UN Partner Portal for NGO, CBO, and academic partnership opportunities",
    url: "https://www.unpartnerportal.org/landing/",
    source: "UN Partner Portal",
    summary:
      "Single official portal where NGOs, community-based organisations, and academic institutions can register once and access partnership opportunities across multiple UN agencies.",
    audience:
      "NGOs, community-based organisations, and academic institutions seeking direct UN partnership opportunities.",
    geography: "Global",
    verificationNote:
      "Official inter-agency UN platform used by UNHCR, UNICEF, WFP, WHO, IOM, UN Women, and other UN entities.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: ["UN", "Partnerships", "NGOs", "Direct access"],
  },
  {
    id: "eu-funding-tenders-portal",
    title: "EU Funding & Tenders Portal",
    url: "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/home",
    source: "European Commission",
    summary:
      "Official public portal for EU grants and tenders. Useful for organisations monitoring calls in civil society, research, education, humanitarian work, and institutional development.",
    audience:
      "Organisations applying for European Commission grants, tenders, prizes, and related funding opportunities.",
    geography: "Europe and international programmes",
    verificationNote:
      "Official European Commission funding portal. Public opportunity browsing does not require a login.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: ["European Union", "Grants", "Tenders", "Civil society"],
  },
  {
    id: "grants-gov-search",
    title: "Grants.gov Search Grants",
    url: "https://www.grants.gov/search-grants.htm",
    source: "Grants.gov",
    summary:
      "Official U.S. federal grants search portal with filters for eligibility, category, agency, and opportunity status. Some calls are open to nonprofits, higher-education institutions, and international partners.",
    audience:
      "Nonprofits, higher-education institutions, public entities, and eligible organisations searching U.S. federal opportunities.",
    geography: "United States and eligible international applicants by call",
    verificationNote:
      "Official United States government grants portal with searchable opportunity details and eligibility guidance.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: ["United States", "Federal grants", "Nonprofits", "Eligibility"],
  },
];

export const scholarshipOpportunities: OpportunityItem[] = [
  {
    id: "tagdev-2026-2027",
    title: "TAGDev 2.0 scholarships for the 2026/2027 academic year",
    url: "https://help.unhcr.org/rwanda/2026/04/13/open-call-for-applications-tagdev-2-0-scholarships-2026-2027-academic-year/",
    source: "UNHCR Rwanda / RUFORUM / Mastercard Foundation",
    summary:
      "Open scholarship call across partner universities in Africa. Refugees, internally displaced persons, women, and persons with disabilities are explicitly encouraged to apply.",
    audience:
      "Prospective undergraduate and postgraduate applicants targeting partner universities under TAGDev 2.0.",
    geography: "Multiple African universities including Uganda",
    verificationNote:
      "Published on an official UNHCR Help site and linked to partner-university application details.",
    timestamp: "2026-04-13T00:00:00Z",
    timestampKind: "published",
    deadline: "2026-05-01T21:59:00Z",
    status: "open",
    kind: "call",
    tags: ["Scholarships", "Refugees", "Africa", "Higher education"],
  },
  {
    id: "dafi-programme",
    title: "DAFI tertiary scholarship programme",
    url: "https://www.unhcr.org/dafi-scholarships.html",
    source: "UNHCR",
    summary:
      "UNHCR's long-running higher-education scholarship programme covering tuition, study materials, food, transport, accommodation, and other education-related costs.",
    audience:
      "Refugee students in countries where DAFI operates, including Uganda, applying through UNHCR country channels.",
    geography: "Uganda and other DAFI countries",
    verificationNote:
      "Official UNHCR programme page with country list and contact route through UNHCR offices.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "programme",
    tags: ["UNHCR", "Refugees", "Undergraduate", "Ongoing"],
  },
  {
    id: "unhcr-opportunities-dashboard",
    title: "UNHCR Opportunities scholarship dashboard",
    url: "https://services.unhcr.org/opportunities/",
    source: "UNHCR Opportunities",
    summary:
      "Official UNHCR search platform for accredited scholarship and academic programmes verified by UNHCR, including in-country and international opportunities.",
    audience:
      "Refugees, asylum-seekers, and stateless people looking for verified scholarship opportunities.",
    geography: "Global",
    verificationNote:
      "Official UNHCR services platform that aggregates verified scholarship opportunities.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: ["UNHCR", "Verified", "Scholarship search", "Global"],
  },
  {
    id: "unhcr-uganda-education-pathways",
    title: "UNHCR Uganda education pathways guide",
    url: "https://help.unhcr.org/uganda/complementary-pathways/education/",
    source: "UNHCR Uganda",
    summary:
      "Official Uganda guidance page explaining complementary higher-education pathways and linking refugees to scholarship information and recognised education routes.",
    audience:
      "Refugees in Uganda looking for official guidance on higher-education pathways and scholarship routes.",
    geography: "Uganda",
    verificationNote:
      "Official UNHCR Uganda Help page covering country-specific education pathways and referral routes.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "programme",
    tags: ["Uganda", "Education pathways", "Guidance", "Refugees"],
  },
  {
    id: "unicore-8",
    title: "UNICORE 8.0 university corridors for refugees",
    url: "https://universitycorridors.unhcr.it/",
    source: "UNICORE / UNHCR Italy partners",
    summary:
      "Refugee-student pathway into Italian universities with tuition exemption, support for travel and visa costs, and a study grant for selected candidates.",
    audience:
      "Recognised refugees in specified countries, including Uganda, applying for master's-level opportunities in Italy.",
    geography: "Uganda and other eligible countries of asylum",
    verificationNote:
      "Official UNICORE application platform supported by UNHCR and Italian university partners.",
    timestamp: "2026-03-02T12:00:00Z",
    timestampKind: "published",
    deadline: "2026-04-17T10:00:00Z",
    status: "closed",
    kind: "call",
    tags: ["Italy", "Master's", "Refugees", "Scholarship cycle"],
  },
];
