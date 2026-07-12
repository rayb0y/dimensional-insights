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
    eyebrow: "Amal Ray",
    title: "What's next?",
    paragraphs: [
      "I am a product strategist. I work upstream of the build: framing the problem, deciding what is worth making, and turning ambiguity into a decision a team can act on. Three years of that inside EY, now at CMU, working on the frontier of AI.",
      "I am looking for roles in product strategy, innovation strategy, and strategy consulting: deciding what to build and why, at the frontier of what AI makes possible. If you are thinking about how AI and human teams should work together, I want to be in that conversation.",
    ],
    tags: [
      "Product Strategy",
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
      "Innovation teams stall in ways that are hard to see from inside. A framing settles too early, a decision's reasoning goes unexamined, or teammates quietly disagree about what was decided. A good facilitator asks the question that puts the thinking back in the team's hands, and this research asks whether AI can do that job.",
      "I ran the primary research, eight interviews with innovation students and faculty, and read the results against the science on team dynamics, motivation, and curiosity. One finding set the direction: current models are unreliable at giving answers and competent at reading where reasoning is incomplete. So the design aims at the second skill. The tool gives no verdicts. It holds the team's own record of its decisions and asks grounded questions against it.",
      "The research is becoming a product I am building now: a shared surface that shows where teammates' accounts of a decision diverge, a questioner that stress-tests reasoning before a mentor or client does, and a weekly reflection that restarts curiosity. One rule runs through all of it: the tool is always available, and the team decides when it speaks.",
    ],
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
    title: "Deciding what to build before building it",
    paragraphs: [
      "Canon was the industry client for my CMU capstone, and the brief was the question that sits upstream of engineering and go-to-market: what is worth building. Over four months I ran a structured discovery to answer it, held to three tests at once: what users actually need, what is technically feasible, and what the business can sustain.",
      "I worked in a team of five. Together we ran the primary research, interviewing users and mapping where the real needs were. I led the brainstorming, running the team through twenty to thirty ideas before we converged on a direction worth pursuing. From there I ran the engineering feasibility analysis, pressure-testing the hard technical assumptions before anyone committed to them. We worked the competitive positioning together, then pulled the three lenses, user need, feasibility, and business fit, into a single product strategy delivered to Canon's leadership.",
      "The deliverable was not a prototype. It was a reasoned answer to what Canon should build next and why. The specifics stay with the client under NDA, but the shape of the work, deciding what to build before building it, is the part that matters most to me.",
    ],
    tags: [
      "Product Strategy",
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
    title: "A game where you play as the language model",
    paragraphs: [
      "Most people use AI without a working model of how it behaves, and the gap costs them. If you do not know a language model has a finite context window, its drift reads as random failure. Context teaches the mechanics by making you play as the model.",
      "Each player gets a token budget that stands in for the context window. You spend tokens to add beats to a shared story, and as the budget runs down the earliest beats fall away, so the plot drifts and invents the way a model does at the edge of its window. The mechanic carries the lesson. Players hit the limit themselves and leave knowing when to trust the tool and when to check it.",
    ],
    tags: ["Human-AI Interaction", "AI Literacy", "Game Design", "Education"],
    variant: "lalama",
  },
  {
    id: "mool",
    accent: ACCENT.ice,
    label: "Mool  ·  West Bengal",
    eyebrow:
      "CMU  ·  Managing Products & Brands  ·  Jan–Mar 2026  ·  Strategy Lead  ·  SwitchON Foundation",
    title: "A brand built around the maker",
    paragraphs: [
      "Rural women entrepreneurs in West Bengal make quality goods and stay invisible to mainstream retail, where the prevailing narrative casts them as beneficiaries. Working with SwitchON Foundation's Udyamini program, we built Mool, a brand that puts the maker at the center of its story. The work covered naming, visual identity, brand story, and a go-to-market plan shaped by rural distribution and low-digital-literacy markets. The decision that mattered most was the framing: the brand leads with the woman who made the goods.",
    ],
    tags: [
      "Brand Strategy",
      "Naming",
      "Visual Identity",
      "Social Impact",
      "SwitchON Foundation",
    ],
  },
  {
    id: "pogoh",
    accent: ACCENT.ice,
    label: "Urban Mobility  ·  POGOH",
    eyebrow:
      "CMU  ·  Integrated Product Development  ·  Aug–Dec 2025  ·  POGOH RideSafe",
    title: "Where a bike-share system breaks",
    paragraphs: [
      "Cities invest heavily in bike sharing and still watch bikes sit unused. The friction usually lives in the ecosystem around the bikes: habits, infrastructure gaps, trust failures, and the small obstacles between a person and the decision to ride. Using Pittsburgh's POGOH system as the case study, we mapped stakeholders, observed riders in the field, and ran co-design sessions to find where effort would count most. That point was safety, perceived and actual. Our proposal, the RideSafe Program, grew from that finding: signage, onboarding, and route confidence designed as one connected experience.",
    ],
    tags: ["Systems Thinking", "Research", "Urban Innovation", "POGOH"],
  },
  {
    id: "reentry",
    accent: ACCENT.ice,
    label: "Re-entry Rift  ·  Research",
    eyebrow: "CMU  ·  UX Research Methods  ·  Aug–Oct 2025  ·  Lead Researcher",
    title: "The part of travel no product designs for",
    paragraphs: [
      "Travel products cover the trip and stop at the front door. Coming home is quietly disorienting: routines feel foreign, responsibilities feel heavier, and the contrast between away and back takes real adjustment. As lead researcher I ran a multi-method study, combining diary studies, semi-structured interviews, and contextual inquiry, and mapped the emotional arc of return rather than its logistics. The study surfaced three re-entry archetypes, each with distinct friction points and support needs, and pointed at the stakes: how re-entry goes shapes whether someone travels again.",
    ],
    tags: ["UX Research", "Multi-method", "Qualitative", "Diary Study"],
  },
  {
    id: "ey-change",
    accent: ACCENT.coral,
    label: "EY  ·  Change Management",
    eyebrow: "EY Global Delivery Services  ·  Reform  ·  PowerApps + SQL",
    title: "Deciding what the change system should be",
    paragraphs: [
      "Reform began as an open brief: track change across every business function and move the organisation toward more self-directed ways of working. My work started before the build, deciding what the tool needed to be and where it should stop, and that framing drove the product decisions. Editable columns gave teams Excel-style bulk editing. A detailed record view supported careful single-record changes. Full-database search, which PowerApps does not offer out of the box, made the whole record findable. I designed it end to end. Names and designs shown here are changed; the work is proprietary.",
    ],
    tags: [
      "Product Strategy",
      "Change Management",
      "Product Design",
      "PowerApps",
      "EY",
    ],
  },
  {
    id: "ey-compliance",
    accent: ACCENT.coral,
    label: "EY  ·  Compliance Monitoring BAU",
    eyebrow: "EY Global Delivery Services  ·  Eye  ·  PowerApps",
    title: "Designing the process before the tool",
    paragraphs: [
      "Eye started as a process question. The task was a business-as-usual way to track the data flowing into the compliance tool across twenty-one or more policies, and the real work was deciding what that process should be. What to track, what to surface, what to leave out. PowerApps was the destination because the tool had to live inside the existing system. I drafted each version of the interface in PowerPoint and handed it to my team to tear apart, prioritising hard until the app was as easy to use as it was complete: policy status and due dates, tracking and actions, and a clean way to lodge and follow issues.",
    ],
    tags: [
      "Product Strategy",
      "Compliance",
      "BAU Process",
      "PowerApps",
      "EY",
    ],
  },
  {
    id: "ey-automations",
    accent: ACCENT.coral,
    label: "EY  ·  Python Automations",
    eyebrow: "EY Global Delivery Services  ·  Regulatory Data Checks  ·  Python",
    title: "Turning a daily regulatory check into drag and drop",
    paragraphs: [
      "My first build at work started as a chore. I ran the same regulatory data checks every day, part manual and part automated, and looked for the single change that would remove the most friction. The answer was drag and drop. I wrote Python applications that adapted to when each file arrived, wrote their outputs to Excel, and reused the Windows Explorer interface people already knew. Drop a file into the live folder and the rest follows: checks run, statistics generated, output sorted, files archived.",
    ],
    tags: ["Product Thinking", "Automation", "Python", "EY"],
  },
  {
    id: "dark",
    accent: ACCENT.plasma,
    label: "What You See in the Dark  ·  2020",
    eyebrow: "Short Film  ·  2020  ·  Written, Directed, Edited",
    title: "What You See in the Dark",
    paragraphs: [
      "A multi-genre murder mystery shot across India during the pandemic with a distributed cast. The constraint pushed the real work into the editing room, where I set tone, built the narrative, and filled gaps with reshoots, a way of working that has stayed with me since. It won Best Cinematography and placed third for Best Film at the VIT Film Festival, and was nominated at Kalakari International and Liftoff Online at Pinewood.",
    ],
    watchUrl: "https://youtu.be/3HllsTotKqE?si=MmR2p4akLyhE-rTN",
    tags: ["Film", "Directing", "Editing", "Festival Awards"],
    variant: "film",
  },
  {
    id: "ok",
    accent: ACCENT.plasma,
    label: "Everything is OK  ·  2021",
    eyebrow: "Short Film  ·  2021  ·  Written, Directed, Edited",
    title: "Everything is OK",
    paragraphs: [
      "A film about how powerful lobbies control a nation's media, told through a broken personification of the country. It is the most experimental of the three: no title card and as little context as possible, with everything carried by the filmmaking itself.",
    ],
    watchUrl:
      "https://drive.google.com/file/d/1jyJrqFpTihnWPRbgm8harQ0fnKxAaU5u/view?usp=drive_link",
    tags: ["Film", "Directing", "Experimental"],
    variant: "film",
  },
  {
    id: "wake",
    accent: ACCENT.plasma,
    label: "Wake Up  ·  2020",
    eyebrow: "Short Film  ·  2020  ·  Made Alone",
    title: "Wake Up",
    paragraphs: [
      "My first film, about voting, made entirely inside one room. I wrote, directed, shot, and edited it alone.",
    ],
    watchUrl: "https://www.youtube.com/watch?v=OstgHMTZwE0",
    tags: ["Film", "Directing", "First Film"],
    variant: "film",
  },
];
