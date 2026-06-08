export type Layer = {
  id: string;
  accent: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  insight?: string;
  tags: string[];
  variant?: "intro" | "contact" | "default";
  films?: { title: string; blurb: string }[];
};

export const ACCENT = {
  coral: "#ff5c2e",
  ice: "#38b6ff",
  acid: "#96e040",
  plasma: "#d966f0",
  amber: "#ffcc33",
  neutral: "rgba(255,255,255,0.4)",
};

export const layers: Layer[] = [
  {
    id: "intro",
    accent: ACCENT.neutral,
    label: "Amal Ray",
    eyebrow: "Who I am",
    title: "Hi, I'm Amal.",
    description:
      "A consultant with experience in tech and design. I find myself at the intersection of business, design and technology — using storytelling to build products people actually want to use.\n\nCurrently pursuing a Master's in Integrated Innovation at Carnegie Mellon University. Previously at EY, building enterprise platforms for compliance, change management, and organizational strategy.",
    tags: ["CMU", "EY", "Pittsburgh"],
    variant: "intro",
  },
  {
    id: "canon",
    accent: ACCENT.ice,
    label: "Canon Capstone",
    eyebrow: "CMU · IPD Capstone · December 2025–April 2026",
    title: "Canon Capstone",
    description:
      "A 14-week industry capstone with Canon as the client. Work protected under NDA.",
    insight: "The constraint of confidentiality sharpened the discipline of the process.",
    tags: ["Canon", "Industry Client", "CMU Capstone", "NDA"],
  },
  {
    id: "mool",
    accent: ACCENT.amber,
    label: "Mool · West Bengal",
    eyebrow: "CMU · Managing Products & Brands · Jan–Mar 2026 · Strategy Lead",
    title: "Creating a Hero Brand in West Bengal",
    description:
      "Rural women entrepreneurs in West Bengal make real, quality goods but remain invisible to mainstream retail. Working with SwitchON Foundation and their Udyamini program, we built a hero brand — Mool — that places the rural woman as the celebrated hero, not a footnote.",
    insight: "The product was never the problem. Invisibility was.",
    tags: ["Brand Strategy", "Social Impact", "CMU", "SwitchON Foundation"],
  },
  {
    id: "pogoh",
    accent: ACCENT.acid,
    label: "Urban Mobility · POGOH",
    eyebrow: "CMU · Integrated Product Development · August–December 2025 · POGOH RideSafe Program",
    title: "Emerging Urban Mobility Systems",
    description:
      "Cities invest millions in bike-sharing systems — and then watch them sit unused. The problem is the ecosystem: the invisible web of behavioral habits, infrastructure gaps, trust failures, and friction points. We approached this as a systems problem and developed the POGOH RideSafe Program — Safety as the unlock for adoption.",
    insight: "Safety was the thing standing between the bike and the rider.",
    tags: ["Systems Thinking", "UX Research", "Urban Design", "CMU"],
  },
  {
    id: "reentry",
    accent: ACCENT.ice,
    label: "The Re-entry Rift",
    eyebrow: "CMU · UX Research Methods · August–October 2025 · Lead Researcher",
    title: "The Re-entry Rift",
    description:
      "Travel products obsess over the journey. But the moment you walk back through your front door, you are on your own. Re-entry is disorienting — routines feel foreign, responsibilities feel heavier, and the emotional contrast between out there and back here creates real psychological friction. No one has designed for this.",
    insight: "Every travel product ends at the gate. The real journey starts at the front door.",
    tags: ["UX Research", "Multi-method", "Qualitative", "CMU"],
  },
  {
    id: "reform",
    accent: ACCENT.acid,
    label: "Reform · EY",
    eyebrow: "EY Global Delivery Services · Consultant · Change Management System",
    title: "Reform",
    description:
      "A tool to track change across business functions for a culture shift project around organisational change. Reform is packed with features — from editable columns for Excel-like functionality to full-database search. Designing Reform pushed the boundaries of PowerApps and my thinking about information architecture.",
    insight: "Information architecture is the difference between a tool people use and a tool people avoid.",
    tags: ["PowerApps", "Information Architecture", "Change Management", "EY"],
  },
  {
    id: "speak",
    accent: ACCENT.coral,
    label: "Speak · EY",
    eyebrow: "EY Global Delivery Services · Associate Consultant · Compliance Monitoring System",
    title: "Speak",
    description:
      "My first PowerApps application sought to bridge the gap between leadership and Subject Matter Experts (SMEs) in a compliance setting. SMEs provide comments on dashboard metrics — with role-based access and seamless Power BI integration. The app now also hosts leadership notes with further security layers.",
    insight: "Role-based access isn't a feature. It's the trust architecture of the whole system.",
    tags: ["PowerApps", "Power BI", "Compliance", "EY"],
  },
  {
    id: "eye",
    accent: ACCENT.coral,
    label: "Eye · EY",
    eyebrow: "EY Global Delivery Services · Associate Consultant · BAU Compliance Monitoring",
    title: "Eye",
    description:
      "A Business As Usual (BAU) process to track data sent to the Zenith Tool across 21+ policies. I kept making designs in PowerPoint and had my team tear them down — the goal was to make the application as easy to use, and as beautiful, as possible. This relentless iteration created a powerful tool that now does its work efficiently and with style.",
    insight: "I made the same screen twelve times. The twelfth one was right.",
    tags: ["PowerApps", "Iterative Design", "Compliance", "EY"],
  },
  {
    id: "python",
    accent: ACCENT.acid,
    label: "Python Automations · EY",
    eyebrow: "EY Global Delivery Services · Associate Software Engineer · 2022–2023",
    title: "Python Automations",
    description:
      "My first tech design — that too, without even realising it was design. Tasked with doing the same regulatory data checks every day, I built drag-and-drop Python applications that made the process as easy as dropping a file into a folder. The ease and accessibility were the spark that lit the design instinct.",
    insight: "I didn't know I was designing. I just knew it had to be easier.",
    tags: ["Python", "Automation", "UX Thinking", "EY"],
  },
  {
    id: "films",
    accent: ACCENT.plasma,
    label: "Films",
    eyebrow: "Short Films · 2020–2021 · Written, Directed & Edited by Amal Ray",
    title: "Films",
    description:
      "Before UX there was film. Three short films made across 2020–2021 — a murder mystery shot across India during the pandemic with a distributed cast, an experimental political satire with no title card, and a short about voting made entirely in a single room. The editing room is where I learned to construct narratives, control tone, and trust the cut over the script.",
    insight: "The edit shapes the story. The story shapes the product. It's all the same instinct.",
    tags: ["Film", "Directing", "Editing", "Narrative"],
    films: [
      {
        title: "What You See in the Dark (2020)",
        blurb: "Murder mystery. Shot across India during lockdown. Best Cinematography, VIT Film Festival.",
      },
      {
        title: "Everything is OK (2021)",
        blurb: "Experimental political satire. No title card. Explores how powerful lobbies control media.",
      },
      {
        title: "Wake Up (2020)",
        blurb: "First film. About voting. Made entirely from within a room.",
      },
    ],
  },
  {
    id: "contact",
    accent: ACCENT.neutral,
    label: "Say hello.",
    eyebrow: "Based in Pittsburgh — open to relocation anywhere.",
    title: "Let's talk.",
    description:
      "Email: amalr@andrew.cmu.edu\nLinkedIn: linkedin.com/in/amal-ray-577a69175",
    tags: [],
    variant: "contact",
  },
];
