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
    id: "un-partner-portal",
    title: "UN Partner Portal partnership opportunities",
    url: "https://www.unpartnerportal.org/landing/opportunities/",
    source: "UN Partner Portal",
    summary:
      "Official inter-agency portal where NGOs, community-based organisations, and academic institutions can access direct partnership opportunities from participating UN agencies.",
    audience:
      "NGOs, community organisations, academic institutions, and eligible civil-society partners applying directly to UN agencies.",
    geography: "Global",
    verificationNote:
      "Official UN partnership platform used by agencies including UNHCR, UNICEF, WFP, WHO, IOM, and UN Women.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "open",
    kind: "portal",
    tags: ["UN", "Partnerships", "NGOs", "Academic institutions"],
  },
  {
    id: "eu-funding-tenders-portal",
    title: "EU Funding & Tenders Portal",
    url: "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/home",
    source: "European Commission",
    summary:
      "Official European Commission portal for grants, tenders, prizes, and research or civil-society funding opportunities across EU programmes.",
    audience:
      "Organisations, universities, municipalities, research teams, businesses, and public-interest institutions seeking EU-managed opportunities.",
    geography: "Europe and international programmes",
    verificationNote:
      "Official European Commission entry point for browsing funding and tender opportunities managed through the Funding & Tenders Portal.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: ["European Union", "Grants", "Tenders", "Research"],
  },
  {
    id: "grants-gov-search",
    title: "Grants.gov Search Grants",
    url: "https://www.grants.gov/search-grants.htm",
    source: "Grants.gov",
    summary:
      "Official U.S. federal grants search portal with filters for eligibility, agency, status, and applicant type, including some opportunities open to international and nonprofit applicants.",
    audience:
      "Nonprofits, universities, public entities, researchers, and eligible organisations searching U.S. federal opportunities.",
    geography: "United States and eligible international applicants by call",
    verificationNote:
      "Official U.S. government grants portal for finding and applying to federal funding opportunities.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "open",
    kind: "portal",
    tags: ["United States", "Federal grants", "Nonprofits", "Universities"],
  },
  {
    id: "sam-assistance-listings",
    title: "SAM.gov Assistance Listings",
    url: "https://sam.gov/assistance-listings",
    source: "SAM.gov",
    summary:
      "Official U.S. federal assistance catalogue covering grants, loans, scholarships, insurance, and other assistance programmes across agencies.",
    audience:
      "Individuals, nonprofits, public bodies, and institutions reviewing official federal assistance programmes before applying through the right source.",
    geography: "United States and programme-specific eligibility territories",
    verificationNote:
      "Official U.S. government assistance listings catalogue that points users to eligible programme routes and partner application systems.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: ["United States", "Assistance", "Scholarships", "Government"],
  },
  {
    id: "ukri-funding-finder",
    title: "UKRI Apply for Funding",
    url: "https://www.ukri.org/apply-for-funding/",
    source: "UK Research and Innovation",
    summary:
      "Official funding route for UKRI opportunities across research councils and Innovate UK, including current calls, guidance, and eligibility checks.",
    audience:
      "Universities, researchers, approved organisations, innovation teams, and eligible collaborators looking for UK research and innovation funding.",
    geography: "United Kingdom with programme-specific international eligibility",
    verificationNote:
      "Official UKRI funding page linking directly to current funding opportunities and application guidance.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "open",
    kind: "portal",
    tags: ["United Kingdom", "Research", "Innovation", "Universities"],
  },
  {
    id: "wellcome-funding-schemes",
    title: "Wellcome funding opportunities",
    url: "https://wellcome.org/grant-funding/schemes",
    source: "Wellcome",
    summary:
      "Official opportunity finder for Wellcome research funding, with filters for career stage, status, and programme area across health and wellbeing research.",
    audience:
      "Researchers and eligible host organisations looking for foundation funding in health, science, and related disciplines.",
    geography: "Global, subject to scheme eligibility",
    verificationNote:
      "Official Wellcome funding schemes page showing open, upcoming, and closed opportunities with eligibility details.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "seasonal",
    kind: "portal",
    tags: ["Foundation funding", "Research", "Health", "Global"],
  },
  {
    id: "nih-explore-opportunities",
    title: "NIH Explore Grant Opportunities",
    url: "https://www.grants.nih.gov/funding/explore-nih-opportunities",
    source: "National Institutes of Health",
    summary:
      "Official NIH search route for grant opportunities, with NIH-specific filters that connect applicants to current notices published through Grants.gov.",
    audience:
      "Researchers, universities, medical institutions, and eligible organisations pursuing biomedical and health-related funding.",
    geography: "United States with programme-specific foreign applicant eligibility",
    verificationNote:
      "Official NIH funding page explaining that Grants.gov is the single official source for NIH grant opportunity notices.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: ["NIH", "Biomedical research", "Universities", "Health funding"],
  },
];

export const scholarshipOpportunities: OpportunityItem[] = [
  {
    id: "unhcr-opportunities-dashboard",
    title: "UNHCR Opportunities scholarship platform",
    url: "https://services.unhcr.org/opportunities/",
    source: "UNHCR Opportunities",
    summary:
      "Official UNHCR search platform for verified scholarships, academic programmes, and training routes for refugees, asylum-seekers, and stateless people.",
    audience:
      "Refugees, asylum-seekers, and stateless applicants looking for verified higher-education and training opportunities.",
    geography: "Global",
    verificationNote:
      "Official UNHCR platform dedicated to verified opportunities and direct application routes.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: ["UNHCR", "Scholarships", "Refugees", "Verified"],
  },
  {
    id: "dafi-programme",
    title: "DAFI tertiary scholarship programme",
    url: "https://www.unhcr.org/dafi-scholarships.html",
    source: "UNHCR",
    summary:
      "Long-running UNHCR scholarship programme supporting refugee students with tuition and related study costs through country-level application channels.",
    audience:
      "Refugee students applying through UNHCR country processes in locations where the DAFI programme operates.",
    geography: "Multiple countries where DAFI is active",
    verificationNote:
      "Official UNHCR programme page with current programme information, annual reporting, and country-level references.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "seasonal",
    kind: "programme",
    tags: ["UNHCR", "Higher education", "Refugees", "Student support"],
  },
  {
    id: "erasmus-mundus-programmes",
    title: "Erasmus Mundus joint master's programmes",
    url: "https://education.ec.europa.eu/study-in-europe/programmes-and-fields/programmes-by-theme",
    source: "European Education Area",
    summary:
      "Official European Commission guide to Erasmus Mundus joint master's programmes, including scholarship-backed study routes offered through university consortia.",
    audience:
      "Students worldwide with a bachelor's degree seeking international master's study across participating universities.",
    geography: "Global applicants, multi-country study routes",
    verificationNote:
      "Official European Commission study portal stating that Erasmus Mundus is open to students worldwide and includes scholarship support.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "seasonal",
    kind: "programme",
    tags: ["European Union", "Master's", "International study", "Scholarships"],
  },
  {
    id: "daad-scholarship-database",
    title: "DAAD scholarship database",
    url: "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/",
    source: "DAAD",
    summary:
      "Official scholarship database for international students and researchers searching DAAD programmes and selected external funding offers for Germany.",
    audience:
      "International students, graduates, doctoral candidates, and researchers looking for scholarships in Germany.",
    geography: "Global applicants, Germany-focused opportunities",
    verificationNote:
      "Official DAAD scholarship database with searchable programme filters and direct programme details.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: ["Germany", "DAAD", "Students", "Researchers"],
  },
  {
    id: "chevening-apply",
    title: "Chevening apply page",
    url: "https://www.chevening.org/apply/",
    source: "Chevening",
    summary:
      "Official country-based application route for Chevening scholarships and fellowships, with award availability and application status by citizenship country.",
    audience:
      "Emerging leaders applying for eligible UK master's scholarships or fellowships through the official Chevening route.",
    geography: "More than 160 countries and territories",
    verificationNote:
      "Official Chevening application page showing awards by country or territory and whether the current cycle is open or closed.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "seasonal",
    kind: "programme",
    tags: ["United Kingdom", "Master's", "Leadership", "Government scholarship"],
  },
  {
    id: "fulbright-foreign-student",
    title: "Fulbright Foreign Student Program apply page",
    url: "https://foreign.fulbrightonline.org/apply",
    source: "Foreign Fulbright Program",
    summary:
      "Official application guidance for non-U.S. citizens applying to the Fulbright Foreign Student Program through Fulbright Commissions, Foundations, or U.S. Embassies.",
    audience:
      "Graduate students, researchers, artists, and professionals applying from participating countries for study or research in the United States.",
    geography: "More than 160 countries",
    verificationNote:
      "Official Fulbright page describing eligibility, application routes, and country-based processing through the formal Fulbright network.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "seasonal",
    kind: "programme",
    tags: ["United States", "Fulbright", "Graduate study", "Research"],
  },
  {
    id: "study-in-europe-scholarships",
    title: "Study in Europe scholarships, grants, and financial support",
    url: "https://education.ec.europa.eu/study-in-europe/planning-your-studies/scholarships-and-funding",
    source: "European Education Area",
    summary:
      "Official European Commission guide to scholarship and funding routes for international students across European higher-education systems.",
    audience:
      "International students comparing scholarship and funding options across European countries, institutions, and EU-backed programmes.",
    geography: "Europe, open to global applicants by programme",
    verificationNote:
      "Official European Commission study portal pointing users to country profiles, Erasmus routes, and research-funding references.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: ["Europe", "Scholarships", "International students", "Official guidance"],
  },
  {
    id: "euraxess-jobs-and-opportunities",
    title: "EURAXESS jobs and opportunities",
    url: "https://euraxess.ec.europa.eu/jobs",
    source: "EURAXESS",
    summary:
      "Official European Commission-backed platform for research jobs, funding opportunities, fellowships, and hosting offers across Europe and beyond.",
    audience:
      "Researchers, doctoral candidates, postdoctoral applicants, universities, and research institutions looking for direct research-career opportunities.",
    geography: "Europe and international research mobility routes",
    verificationNote:
      "Official EURAXESS jobs and opportunities portal with funding, hosting, and researcher mobility routes.",
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: ["Researchers", "Postdoctoral", "Fellowships", "Europe"],
  },
];
