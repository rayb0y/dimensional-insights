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
    title: "With AI, the extraordinary is now possible. Let's make it happen.",
    paragraphs: [
      "I work at the intersection of innovation, strategy, and human-AI collaboration — building the conditions for what comes next.",
    ],
    tags: ["Innovation Strategy", "Human-AI Systems", "CMU", "EY"],
    variant: "intro",
    tagline: "With AI, the extraordinary is now possible. Let's make it happen.",
  },
  {
    id: "ai-facilitation",
    accent: ACCENT.ice,
    label: "AI Facilitation",
    eyebrow: "CMU  ·  Integrated Innovation Institute  ·  Summer 2026  ·  Dr. Arthur Sugden",
    title: "Can AI ask the question that unblocks a team?",
    paragraphs: [
      "Innovation teams get stuck. Not from lack of effort — but because certain cognitive deadlocks are invisible from the inside. A team can stare at a problem so long they can't see the reframe. A good facilitator knows how to recognise that moment and ask the one question that shifts it. The question doesn't contain the answer. It just opens the space where the answer can arrive.",
      "This research asks whether AI can play that role. Not replace the human facilitator — but recognise the signature of a deadlock in a team's conversation and intervene with a well-timed Socratic question. Running interviews with innovation practitioners, MIIPS students, and faculty to map where these moments occur across the four phases of integrated new product development.",
    ],
    insight:
      "The AI doesn't need to have the answer. It needs to ask the question the team couldn't ask itself.",
    tags: ["Human-AI Systems", "Innovation Research", "CMU", "Qualitative"],
  },
  {
    id: "canon",
    accent: ACCENT.ice,
    label: "Canon",
    eyebrow: "CMU  ·  IPD Capstone  ·  Industry Client  ·  Jan–Apr 2026",
    title: "Knowing what to build before building it.",
    paragraphs: [
      "Before any AI can accelerate the build, someone has to decide what's worth building. That judgment — upstream of engineering, upstream of go-to-market — stays on the human side. It requires synthesising what users actually need, what's technically feasible, what the business can sustain, and what the market doesn't yet know it wants. No model makes that call.",
      "This capstone was that work, with a major industry client. A months-long structured discovery process to define what to build and why — leading primary research, engineering feasibility analysis, competitive positioning, and a full product strategy delivered to client leadership. The output wasn't a prototype. It was a rigorous answer to the hardest question in product: what should exist that doesn't yet? Work protected under NDA.",
    ],
    insight: "AI can accelerate the build. It cannot tell you what's worth building. Someone has to.",
    tags: ["Product Strategy", "Innovation", "Customer Research", "NDA", "CMU"],
  },
  {
    id: "lalama",
    accent: ACCENT.acid,
    label: "Context",
    eyebrow: "Independent  ·  Innovation  ·  2026",
    title: "What if you had to live inside the machine?",
    paragraphs: [
      "Most people use AI without understanding how it actually works — and that gap matters. When you don't know a language model has a finite context window, you don't know why it starts to drift. When you don't know it samples within its training distribution, you don't know why it can't help you reframe. The collaboration breaks down from misunderstanding the machine's architecture, not from failure.",
      "Context is a game that teaches players how LLMs work by making them experience it. Players receive a token budget — their context window. They spend tokens to contribute narrative beats to a shared story. As tokens deplete, earlier parts of the story are forgotten. The story begins to drift and hallucinate, exactly as an LLM does at the edge of its context. Players don't read about AI. They feel what it's like to be one — and come away understanding the collaboration better.",
    ],
    insight: "You can't partner intelligently with something you don't understand from the inside.",
    tags: ["Human-AI Systems", "Innovation", "AI Literacy", "Conceptual"],
    variant: "lalama",
  },

  {
    id: "mool",
    accent: ACCENT.amber,
    label: "Mool",
    eyebrow:
      "CMU  ·  Managing Products & Brands  ·  Jan–Mar 2026  ·  Strategy Lead — SwitchON Foundation",
    title: "Creating a Hero Brand in West Bengal",
    paragraphs: [
      "Rural women entrepreneurs in West Bengal make real, quality goods — but remain invisible to mainstream retail. The existing narrative frames them as beneficiaries. We argued that was the wrong frame entirely, and built a brand around a different one.",
      "Working with SwitchON Foundation and their Udyamini program, we developed Mool — a brand that places the rural woman as the celebrated maker, not a footnote. The strategy covered naming, visual identity, brand story, and a go-to-market framework built around the constraints of rural distribution and low-digital-literacy markets. The most important call was one of framing: not what we built, but what story we told about who built it.",
    ],
    insight: "The product was never the problem. The story was.",
    tags: ["Brand Strategy", "Naming", "Social Impact", "CMU", "SwitchON Foundation"],
  },
  {
    id: "pogoh",
    accent: ACCENT.acid,
    label: "POGOH",
    eyebrow: "CMU  ·  Integrated Product Development  ·  Aug–Dec 2025  ·  POGOH RideSafe Program",
    title: "Every system has a single lever.",
    paragraphs: [
      "Cities invest millions in bike-sharing systems — and then watch them sit unused. The problem isn't the bikes. It's the web of behavioural habits, infrastructure gaps, trust failures, and friction points that sit between a person and the decision to ride. Solving any one of them in isolation doesn't move the needle. You have to see the whole system.",
      "We approached it as a systems problem. Through stakeholder mapping, ethnographic observation, and co-design sessions with POGOH, we identified safety — perceived and actual — as the single highest-leverage point. The result was the RideSafe Program: a structured intervention addressing signage, onboarding, and route confidence as one integrated experience. Not three features. One system.",
    ],
    insight: "Finding the lever is the whole job.",
    tags: ["Systems Thinking", "Research", "Urban Innovation", "CMU", "POGOH"],
  },
  {
    id: "reentry",
    accent: ACCENT.ice,
    label: "Re-entry Rift",
    eyebrow: "CMU  ·  UX Research Methods  ·  Aug–Oct 2025  ·  Lead Researcher",
    title: "Every travel product ends at the gate.",
    paragraphs: [
      "Travel products obsess over the journey. But the moment you walk back through your front door, you are on your own. Re-entry is disorienting — routines feel foreign, responsibilities feel heavier, and the emotional contrast between out there and back here creates real psychological friction. The transition is invisible because it's not dramatic. It just quietly accumulates.",
      "As lead researcher, I ran a multi-method study combining diary studies, semi-structured interviews, and contextual inquiry. We mapped the emotional arc of return — not just the logistics — and identified three distinct re-entry archetypes, each with different friction points and support needs. The finding wasn't that people need more travel products. It's that the moment no product has accounted for is the one that determines whether they travel again.",
    ],
    insight: "The real journey starts at the front door.",
    tags: ["UX Research", "Multi-method", "Qualitative", "Diary Study", "CMU"],
  },
  {
    id: "ey",
    accent: ACCENT.coral,
    label: "EY",
    eyebrow: "EY Global Delivery Services  ·  Associate Software Engineer → Consultant  ·  2021–2024",
    title: "Three years of making complex systems usable.",
    paragraphs: [
      "Before CMU, before the research, three years building tools for people who couldn't afford for them to be hard to use. Compliance teams under regulatory pressure. Change managers tracking hundreds of moving parts. Data analysts running the same checks every day.",
      "Four products. Reform — a change management system with Excel-like inline editing across a large SQL database, built entirely in PowerApps. Speak — a compliance communication platform with layered role-based access separating SME commentary from leadership notes. Eye — a BAU compliance monitor for 21+ policies that went through twelve complete iterations before one was right. Python Automations — drag-and-drop scripts that reduced a daily manual regulatory process to dropping a file into a folder. I didn't know at the time that making things easier was an innovation instinct. It was the first one I ever followed.",
    ],
    insight: "Remove the friction between a person and their judgment. That's the whole job.",
    tags: ["PowerApps", "Python", "SQL", "Information Architecture", "EY"],
  },
  {
    id: "dark",
    accent: ACCENT.plasma,
    label: "What You See in the Dark",
    eyebrow: "Short Film  ·  2020  ·  Written, Directed & Edited by Amal Ray",
    title: "What You See in the Dark",
    paragraphs: [
      "A murder mystery spanning multiple genres — shot across India during the pandemic with a distributed cast. Written, directed, and edited entirely by me. The editing room shaped my working style more than anything else: setting tone, constructing narratives, filling gaps with reshoots.",
    ],
    awardLine: "Best Cinematography · VIT Film Festival",
    watchUrl: "https://youtu.be/3HllsTotKqE?si=MmR2p4akLyhE-rTN",
    tags: ["Film", "Directing", "Editing", "Mystery", "Cinematography"],
    variant: "film",
  },
  {
    id: "ok",
    accent: ACCENT.plasma,
    label: "Everything is OK",
    eyebrow: "Short Film  ·  2021  ·  Written, Directed & Edited by Amal Ray",
    title: "Everything is OK",
    paragraphs: [
      "The most experimental of the three. No title card — telling a story with as little context as possible, entirely through cinema. Explores how powerful lobbies control media through a broken personification of the nation. A creative experiment in what film can do without conventional scaffolding.",
    ],
    watchUrl:
      "https://drive.google.com/file/d/1jyJrqFpTihnWPRbgm8harQ0fnKxAaU5u/view?usp=drive_link",
    tags: ["Film", "Experimental", "Political", "Directing", "Editing"],
    variant: "film",
  },
  {
    id: "wake",
    accent: ACCENT.plasma,
    label: "Wake Up",
    eyebrow: "Short Film  ·  2020  ·  Written, Directed & Edited by Amal Ray",
    title: "Wake Up",
    paragraphs: [
      "My first film — about voting, made entirely within a single room. What started as an experiment with editing became the spark for everything that followed: the realisation that a story, a feeling, a point of view could be made with almost nothing. Written, directed, shot, and edited alone.",
    ],
    watchUrl: "https://www.youtube.com/watch?v=OstgHMTZwE0",
    tags: ["Film", "Debut", "Directing", "Editing", "Short Film"],
    variant: "film",
  },
  {
    id: "contact",
    accent: ACCENT.neutral,
    label: "Say Hello",
    eyebrow: "Pittsburgh — open to relocation anywhere.",
    title: "Let's work on what comes next.",
    paragraphs: [
      "If you're thinking about innovation, about how AI and human teams should work together, about products that actually go somewhere — I want to be in that conversation.",
    ],
    tags: [],
    variant: "contact",
  },
];
