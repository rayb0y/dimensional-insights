export type Layer = {
  id: string;
  accent: string;
  label: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  insight?: string;
  awardLine?: string;
  watchUrl?: string;
  tags: string[];
  variant?: "intro" | "contact" | "film" | "lalama" | "default";
  tagline?: string;
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
    eyebrow: "CMU Integrated Innovation Institute  ·  EY  ·  Pittsburgh",
    title: "What's next?",
    paragraphs: [
      "I am a product strategist. I work upstream of the build, deciding what is worth making, framing the problem, and turning ambiguity into a decision a team can act on. Three years doing it inside an enterprise at EY, now doing it at the frontier of AI at CMU.",
    ],
    tags: [
      "Product Strategy",
      "Innovation Strategy",
      "Problem Framing",
      "Human-AI Systems",
      "CMU",
      "EY",
    ],
    variant: "intro",
    tagline: "What's next?",
  },
  {
    id: "ai-facilitation",
    accent: ACCENT.ice,
    label: "AI Facilitation  ·  CMU Research",
    eyebrow:
      "CMU  ·  Integrated Innovation Institute  ·  2026  ·  Research under Dr. Arthur Sugden",
    title: "Can AI ask the question that gets a team unstuck?",
    paragraphs: [
      "Innovation teams stall for reasons that are hard to see from the inside. They settle on a framing too early, leave the reasoning behind a decision unexamined, or quietly disagree about what they actually decided. A good facilitator does not hand the team an answer. They ask the question that puts the thinking back in the team's hands at the moment it matters. The research asks whether AI can do part of that job.",
      "I ran the primary research. Eight interviews with innovation students and faculty, read against the science on team dynamics, motivation, curiosity, and how teams get stuck. The finding that shaped the direction: an AI is an unreliable source of answers but a competent reader of where reasoning is incomplete. So the design points there. It gives no verdict. It holds the team's own record and asks a grounded question against it.",
      "The research has become a concrete product direction. A shared surface that shows a team where their accounts of a decision diverge. A questioner that stress-tests reasoning before a mentor or client does. A weekly reflection built to restart curiosity instead of collecting status. One rule runs through all of it: the tool is always available, but the team decides when it speaks. It never acts on its own, and it never obscures who did the work.",
    ],
    insight:
      "The tool does not need the answer. It needs to ask the question the team never asked itself.",
    tags: [
      "Product Strategy",
      "Innovation Research",
      "Human-AI Interaction",
      "Primary Research",
      "CMU",
    ],
  },
  {
    id: "canon",
    accent: ACCENT.ice,
    label: "Canon Capstone  ·  Industry",
    eyebrow: "CMU  ·  IPD Capstone  ·  Industry Client  ·  Jan–Apr 2026",
    title: "Deciding what to build before building it.",
    paragraphs: [
      "Before any AI can accelerate the build, someone has to decide what is worth building. That judgment sits upstream of engineering and upstream of go-to-market, and it is one of the few things that stays on the human side. It means holding three lenses at once: what users actually need, what is technically feasible, and what the business can sustain, then finding the point where they overlap. No model makes that call.",
      "This capstone was that work, with a major industry client. A months-long structured discovery process to define what to build and why. I led primary research, ran the engineering feasibility analysis, worked the competitive positioning, and helped deliver a full product strategy to client leadership. The output was not a prototype. It was a reasoned answer to the hardest question in product: what should exist that does not yet. Work protected under NDA.",
    ],
    insight: "AI can accelerate the build. It cannot tell you what is worth building.",
    tags: [
      "Product Strategy",
      "Desirability, Feasibility, Viability",
      "Customer Discovery",
      "Engineering Feasibility",
      "NDA",
      "CMU",
    ],
  },
  {
    id: "lalama",
    accent: ACCENT.acid,
    label: "Context  ·  Innovation Concept",
    eyebrow: "Independent  ·  Innovation  ·  2026",
    title: "A game that puts you inside the machine.",
    paragraphs: [
      "Most people use AI without a working model of how it behaves, and the gap costs them. If you do not know a language model has a finite context window, its drift looks like failure instead of a limit. If you do not know it works from patterns it has seen, you keep asking it for the one reframe it cannot give. The partnership breaks down from a misread of the tool, not from the tool being bad.",
      "Context is a game that teaches how a language model works by making you play as one. Each player gets a token budget, which stands in for the context window. You spend tokens to add beats to a shared story. As the budget runs down, the earliest parts of the story fall away, and the plot starts to drift and invent, the same way a model does at the edge of its window. The mechanic is the lesson. Players do not read about context limits. They run into them, and leave with a sharper sense of when to trust the tool and when not to.",
    ],
    insight: "You cannot partner well with a system you do not understand from the inside.",
    tags: [
      "Human-AI Interaction",
      "AI Literacy",
      "Game Design",
      "Concept",
      "Education",
    ],
    variant: "lalama",
  },
  {
    id: "mool",
    accent: ACCENT.amber,
    label: "Mool  ·  West Bengal",
    eyebrow:
      "CMU  ·  Managing Products & Brands  ·  Jan–Mar 2026  ·  Strategy Lead, Udyamini / SwitchON Foundation",
    title: "Creating a Hero Brand in West Bengal",
    paragraphs: [
      "Rural women entrepreneurs in West Bengal make real, quality goods, but they stay invisible to mainstream retail. The usual narrative frames them as beneficiaries. We treated that as the wrong frame and built a brand around a different one.",
      "Working with SwitchON Foundation and its Udyamini program, we developed Mool, a hero brand that places the rural woman as the celebrated maker rather than a footnote. The strategy covered naming, visual identity, brand story, and a go-to-market framework built around the constraints of rural distribution and low-digital-literacy markets. The decision that mattered most was the framing: not what we built, but the story we told about who built it.",
    ],
    insight: "The hard part was the story we told, not the product.",
    tags: [
      "Brand Strategy",
      "Naming",
      "Visual Identity",
      "Social Impact",
      "CMU",
      "SwitchON Foundation",
    ],
  },
  {
    id: "pogoh",
    accent: ACCENT.acid,
    label: "Urban Mobility  ·  POGOH",
    eyebrow:
      "CMU  ·  Integrated Product Development  ·  Aug–Dec 2025  ·  POGOH RideSafe Program",
    title: "Where a bike-share system actually breaks.",
    paragraphs: [
      "Cities invest millions in bike-sharing and then watch the bikes sit unused. The problem is rarely the bikes. It is the ecosystem around them: the habits, infrastructure gaps, trust failures, and small frictions that sit between a person and the decision to ride. Fixing any one of these alone does little. You have to see the whole system.",
      "We treated this as a systems problem. Through stakeholder mapping, field observation, and co-design sessions with POGOH, we found that safety, both perceived and actual, was the highest-leverage point. The result was the RideSafe Program, a structured intervention covering signage, onboarding, and route confidence as one connected experience rather than three separate features.",
    ],
    insight: "Most of the work is finding the one lever that moves the system.",
    tags: ["Systems Thinking", "Research", "Urban Innovation", "CMU", "POGOH"],
  },
  {
    id: "reentry",
    accent: ACCENT.ice,
    label: "Re-entry Rift  ·  Research",
    eyebrow: "CMU  ·  UX Research Methods  ·  Aug–Oct 2025  ·  Lead Researcher",
    title: "The part of travel no product designs for.",
    paragraphs: [
      "Travel products focus on the journey. The moment you walk back through your front door, you are on your own. Re-entry is disorienting: routines feel foreign, responsibilities feel heavier, and the contrast between being away and being back creates real friction. It is easy to miss because it is not dramatic. It accumulates quietly.",
      "As lead researcher, I ran a multi-method study combining diary studies, semi-structured interviews, and contextual inquiry. We mapped the emotional arc of return, not just the logistics, and identified three re-entry archetypes, each with different friction points and support needs. The finding was not that people need more travel products. It was that the moment no product has accounted for is the one that decides whether they travel again.",
    ],
    insight: "The return home is the part of the trip no product has designed for.",
    tags: ["UX Research", "Multi-method", "Qualitative", "Diary Study", "CMU"],
  },
  {
    id: "ey-ase",
    accent: ACCENT.coral,
    label: "EY  ·  Associate Software Engineer",
    eyebrow:
      "EY Global Delivery Services  ·  Associate Software Engineer  ·  Jul 2022 – 2023",
    title: "The first instinct: take out the friction.",
    paragraphs: [
      "The first role at EY was the build seat. Compliance analysts were running the same regulatory checks by hand every day, comparing files line by line. I wrote drag-and-drop Python scripts that turned that into dropping a file into a folder: sort, compare, archive, done. I did not have a name for it then, but taking the friction out of someone's work was the instinct I kept following.",
    ],
    insight: "The daily manual process became: drop a file in a folder.",
    tags: ["Python", "Automation", "Regulatory Compliance", "Enterprise", "EY"],
  },
  {
    id: "ey-ac",
    accent: ACCENT.coral,
    label: "EY  ·  Associate Consultant",
    eyebrow: "EY Global Delivery Services  ·  Associate Consultant  ·  2023 – 2024",
    title: "From building the tool to defining it.",
    paragraphs: [
      "As Associate Consultant the work moved upstream, from writing the tool to deciding what it should be. I built Speak, a compliance platform that separated SME commentary from leadership notes with role-based access and Power BI reporting. I built Eye, a monitor tracking twenty-one or more regulatory policies that took twelve full iterations before one version held. The engineering was the easy part. The real work was sitting with the people who would use it and working out what it actually needed to do.",
    ],
    insight: "Twelve iterations before one version held.",
    tags: [
      "Discovery and Framing",
      "PowerApps",
      "SQL",
      "Power BI",
      "Stakeholder Research",
      "EY",
    ],
  },
  {
    id: "ey-consultant",
    accent: ACCENT.coral,
    label: "EY  ·  Consultant",
    eyebrow: "EY Global Delivery Services  ·  Consultant  ·  2024 – Jul 2025",
    title: "Framing the problem before a line gets written.",
    paragraphs: [
      "By Consultant the job was the front half of the work: leading discovery with five to ten cross-functional stakeholders across engagements and pulling a clear product direction out of ambiguity before anyone built anything. Reform, a change-management system I owned end to end, gave ten or more organizational leaders Excel-like editing over a large SQL database to govern enterprise-wide change. Three years in, the pattern was clear: the hardest and most valuable part is deciding what to build.",
    ],
    insight: "Most of the value was decided before any code was written.",
    tags: [
      "Product Direction",
      "Discovery",
      "Stakeholder Alignment",
      "Change Management",
      "EY",
    ],
  },
  {
    id: "dark",
    accent: ACCENT.plasma,
    label: "What You See in the Dark  ·  2020",
    eyebrow: "Short Film  ·  2020  ·  Written, Directed and Edited by Amal Ray",
    title: "What You See in the Dark",
    paragraphs: [
      "A murder mystery spanning multiple genres, shot across India during the pandemic with a distributed cast. Written, directed, and edited entirely by me. The editing room shaped my working style more than anything else: setting tone, building narrative, and filling gaps with reshoots.",
    ],
    awardLine: "Best Cinematography · VIT Film Festival",
    watchUrl: "https://youtu.be/3HllsTotKqE?si=MmR2p4akLyhE-rTN",
    tags: ["Film", "Directing", "Editing", "Mystery", "Cinematography"],
    variant: "film",
  },
  {
    id: "ok",
    accent: ACCENT.plasma,
    label: "Everything is OK  ·  2021",
    eyebrow: "Short Film  ·  2021  ·  Written, Directed and Edited by Amal Ray",
    title: "Everything is OK",
    paragraphs: [
      "The most experimental of the three. No title card, and as little context as possible, told entirely through cinema. It looks at how powerful lobbies control media, through a broken personification of the nation. Made in college as an experiment in what film can do without conventional scaffolding.",
    ],
    watchUrl:
      "https://drive.google.com/file/d/1jyJrqFpTihnWPRbgm8harQ0fnKxAaU5u/view?usp=drive_link",
    tags: ["Film", "Experimental", "Political", "Directing", "Editing"],
    variant: "film",
  },
  {
    id: "wake",
    accent: ACCENT.plasma,
    label: "Wake Up  ·  2020",
    eyebrow: "Short Film  ·  2020  ·  Written, Directed and Edited by Amal Ray",
    title: "Wake Up",
    paragraphs: [
      "My first film, about voting, made entirely within a single room. What started as an experiment with editing became the spark for everything after: the realization that a story, a feeling, and a point of view could be made with almost nothing. Written, directed, shot, and edited alone.",
    ],
    watchUrl: "https://www.youtube.com/watch?v=OstgHMTZwE0",
    tags: ["Film", "Debut", "Directing", "Editing", "Short Film"],
    variant: "film",
  },
  {
    id: "contact",
    accent: ACCENT.neutral,
    label: "Say hello.",
    eyebrow: "Pittsburgh. Open to relocation anywhere.",
    title: "Let's work on what comes next.",
    paragraphs: [
      "If you are thinking about how AI and human teams should work together, in innovation processes, in research, or in products that actually ship, I want to be in that conversation.",
      "I am looking for product strategy, innovation strategy, and strategy consulting roles: the work of deciding what to build and why, at the frontier of what AI makes possible.",
      "amalr@andrew.cmu.edu",
      "https://www.linkedin.com/in/amal-ray-577a69175/",
    ],
    tags: [],
    variant: "contact",
  },
];
