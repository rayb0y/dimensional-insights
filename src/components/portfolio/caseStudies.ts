// Case study content. One entry per case study, rendered at /work/<slug>.
// To add a picture, document, video or embed: add a block to a section's
// `blocks` array (or fill in the `src` / `href` of an existing one).
// Files go in /public/case-studies/<slug>/ and are referenced as
// "/case-studies/<slug>/<file>". Blocks with no src/href render nothing.

export type ImageRef = { src: string; alt: string; caption?: string };

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; cite: string }
  | { type: "callout"; text: string }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "steps"; items: { label: string; title: string; text: string }[] }
  | { type: "cards"; items: { title: string; text: string }[] }
  | {
      type: "compare";
      left: { title: string; items: string[] };
      right: { title: string; items: string[] };
    }
  | { type: "figure"; src?: string; alt: string; caption?: string; todo?: string }
  | { type: "gallery"; images: ImageRef[]; todo?: string }
  | {
      type: "doc";
      href?: string;
      title: string;
      description?: string;
      kind?: "PDF" | "Slides" | "Doc" | "Link";
      preview?: boolean;
      todo?: string;
    }
  | { type: "embed"; src?: string; title: string; ratio?: string; caption?: string; todo?: string }
  | { type: "video"; src?: string; poster?: string; caption?: string; todo?: string };

export type CaseStudy = {
  slug: string;
  cardId: string;
  accent: string;
  eyebrow: string;
  title: string;
  summary: string;
  meta: { label: string; value: string }[];
  links: { label: string; href: string; external?: boolean }[];
  hero?: Block;
  sections: { id: string; heading: string; blocks: Block[] }[];
  next: string;
};

export const caseStudies: Record<string, CaseStudy> = {
  "agora": {
    "slug": "agora",
    "accent": "#38b6ff",
    "cardId": "ai-facilitation",
    "eyebrow": "Case study  ·  CMU Integrated Innovation Institute  ·  2026",
    "title": "A team wiki that asks what the team is avoiding",
    "summary": "Summer research on how innovation teams get stuck, and the product I built from it. Agora holds a team's own record of what it has said and decided, and asks questions grounded in that record. It gives no verdicts. A student team is piloting it in a CMU course.",
    "meta": [
      {
        "label": "Role",
        "value": "Primary research, product definition, build"
      },
      {
        "label": "Advisor",
        "value": "Dr. Arthur Sugden"
      },
      {
        "label": "Timeline",
        "value": "Research in Summer 2026, pilot in Fall 2026"
      },
      {
        "label": "Methods",
        "value": "8 interviews, literature review, product spec, simulation, feature review"
      },
      {
        "label": "Built with",
        "value": "Cloudflare Workers, Pages, R2 and Workers AI"
      },
      {
        "label": "Status",
        "value": "In pilot with a student team"
      }
    ],
    "links": [
      {
        "label": "See Agora",
        "href": "https://agora-mvp.pages.dev/",
        "external": true
      }
    ],
    "hero": {
      "type": "figure",
      "todo": "Hero: Agora's home screen, signed in as a persona from the simulated 'Agora' project (not the Canon one). 16:10, dark UI, browser chrome cropped.",
      "alt": ""
    },
    "sections": [
      {
        "id": "problem",
        "heading": "The problem",
        "blocks": [
          {
            "type": "p",
            "text": "Innovation teams rarely fail in one visible moment. They drift. Each member, subgroup and stakeholder ends up holding a slightly different version of the project, and nobody sees the difference until it is expensive to fix."
          },
          {
            "type": "p",
            "text": "The research found this drift at three boundaries. Inside the team, people leave the same meeting with different ideas of what was agreed. With stakeholders, feedback the giver meant as a suggestion is heard as an instruction. With the problem itself, early research stops at the surface because a plausible answer arrives too quickly."
          },
          {
            "type": "quote",
            "text": "Everybody was leaving meetings with a different idea and a different agreement.",
            "cite": "CMU faculty member, research interview"
          },
          {
            "type": "p",
            "text": "Generative AI makes the drift harder to see. Fluent output settles a question before curiosity has a chance to form. When every teammate's document reads equally polished, agreement on the surface stops being evidence that people understand the same thing."
          }
        ]
      },
      {
        "id": "research",
        "heading": "Research",
        "blocks": [
          {
            "type": "p",
            "text": "I ran eight interviews over the summer: five with people who had worked on innovation teams, most of them CMU students, and three with CMU faculty who teach and mentor those teams. I read the two groups side by side instead of pooling them. The students were often critical of faculty choices, which made them a useful check on the faculty view."
          },
          {
            "type": "p",
            "text": "I then read the interviews against published research on team dynamics, psychological safety, motivation and curiosity, and against what current language models are measurably good and bad at. All of it lives in a research wiki where each claim links back to a transcript or a paper, so every design decision can be checked against its evidence."
          },
          {
            "type": "stats",
            "items": [
              {
                "value": "8",
                "label": "interviews with students, practitioners and faculty"
              },
              {
                "value": "12",
                "label": "product values, each traced to a source"
              },
              {
                "value": "3",
                "label": "rules the tool can never break"
              }
            ]
          },
          {
            "type": "p",
            "text": "Two findings set the direction. The first came from the people who would use the tool. They wanted AI to keep the record and stay out of the decision."
          },
          {
            "type": "quote",
            "text": "I want AI to give me the plain pros and cons and let me decide based on my context. Even if I make the wrong choice, I'll at least know why I made it, instead of going with it because AI said so.",
            "cite": "Student, CMU innovation capstone"
          },
          {
            "type": "p",
            "text": "The second came from the model research. Current models are unreliable at giving answers and competent at spotting where reasoning is incomplete. So the design aims at the second skill. Agora points at gaps in the team's own record and leaves the answering to the team."
          },
          {
            "type": "figure",
            "todo": "Research map: the eight interviews and the literature feeding the twelve product values. A screenshot of the GenAI-Wiki graph view in Obsidian, or a simple diagram exported as SVG.",
            "alt": ""
          }
        ]
      },
      {
        "id": "design",
        "heading": "The rules it follows",
        "blocks": [
          {
            "type": "p",
            "text": "I turned the research into twelve product values and three rules the tool can never break."
          },
          {
            "type": "list",
            "items": [
              "It originates no content. Every claim, question and finding in the wiki is a named person's own words.",
              "Every question it asks comes from the shape of the record: two accounts that differ, a claim with nothing behind it, a question left open past its date. It never asks from an opinion about the work.",
              "Nothing leaves the team unless the team sends it. There are no reports to faculty or sponsors."
            ]
          },
          {
            "type": "compare",
            "left": {
              "title": "What Agora does",
              "items": [
                "Captures spoken or typed notes, attributed and timestamped",
                "Proposes where a note belongs and waits for its author to confirm",
                "Shows what each claim rests on: heard from someone, made and tested, found in a source, or reasoned",
                "Asks questions grounded in the team's own record"
              ]
            },
            "right": {
              "title": "What it will not do",
              "items": [
                "Read sentiment or tension between teammates",
                "Score, rank or count anyone's participation",
                "Write the team's work for it",
                "Give recommendations or verdicts",
                "Report on individuals to faculty"
              ]
            }
          },
          {
            "type": "p",
            "text": "Each item on the second list traces to a specific risk in the research, such as a wrong reading of team tension that nobody can take back, or a participation count that penalises quieter members."
          }
        ]
      },
      {
        "id": "build",
        "heading": "Building it",
        "blocks": [
          {
            "type": "p",
            "text": "I wrote the product spec, then built the MVP with three AI coding agents working in parallel, one each for platform, backend and frontend. I ran it as the orchestrator. Every agent worked from the same spec and one shared build-state file, and a task was marked done only after its acceptance check passed. Agora runs on Cloudflare, including speech transcription and the language model."
          },
          {
            "type": "p",
            "text": "The deployed version is a shared wiki the team writes into. Members sign in with an email and a name, so every contribution is attributed. A member captures a thought by speaking or typing and chooses who can see it: only them, the team, or a named person outside it. Agora proposes a page and links, and the author accepts or moves them. Each claim carries its basis, so the team can see what it knows, what it is assuming, and who has actually checked. From any claim, a member can ask Agora for a question grounded in the record."
          },
          {
            "type": "figure",
            "todo": "Capture flow: a note being spoken or typed, with the visibility choice (private, team, named person) visible.",
            "alt": ""
          },
          {
            "type": "figure",
            "todo": "A claim page showing its basis (heard, made, found, reasoned) and who holds it.",
            "alt": ""
          }
        ]
      },
      {
        "id": "testing",
        "heading": "Testing it before real users",
        "blocks": [
          {
            "type": "p",
            "text": "Before putting Agora in front of a team, I loaded two real projects into the live app with fictional team members, about 330 entries in all, to see what it could hold. I then reviewed every feature against Agora's purpose and one practical test: could a new user start in about thirty seconds without a walkthrough?"
          },
          {
            "type": "p",
            "text": "The simulation clarified what Agora is. It held the alignment layer well: what the team claims, on what basis, who holds each claim, and where members disagree. Most of a project's work lived elsewhere and should stay there, in documents, design files and chat. Agora sits alongside those tools."
          },
          {
            "type": "p",
            "text": "It also made the central risk concrete. To exercise the tool, I had to invent the doubts, workload concerns and private reservations that real project records never contain."
          },
          {
            "type": "callout",
            "text": "Agora's value depends on people choosing to write down what they usually keep to themselves. That is the question the pilot has to answer."
          },
          {
            "type": "p",
            "text": "The feature review found two problems. The features that carry the value, the record and the blind comparison of views, sat among too many others. And the first screen showed an empty wiki, with nothing yet to show a team where it disagrees."
          },
          {
            "type": "gallery",
            "images": [],
            "todo": "Two or three redesign explorations from agora-simulation/redesign (for example Flow_Capture, Flow_Claim, Home13), screenshotted at the same size."
          }
        ]
      },
      {
        "id": "now",
        "heading": "Where it stands",
        "blocks": [
          {
            "type": "p",
            "text": "A student team is piloting Agora in a CMU course this semester. The spec sets two stop rules for the pilot. If by week two fewer than half the members are capturing at least three notes a week without reminders, the capture assumption is wrong. If by week four no one has chosen to run a blind comparison of views, or the team rates it as not worth the time, the core mechanism has failed. There are no pilot results yet."
          },
          {
            "type": "p",
            "text": "I also presented the research and the product in a 30-minute lecture to 28 innovation students."
          },
          {
            "type": "doc",
            "kind": "PDF",
            "title": "Lecture slides: Innovation After the Answer Machine",
            "description": "The 30-minute lecture on the future of innovation, the summer research, and Agora.",
            "todo": "Upload GenAI-Wiki/Innovation-After-the-Answer-Machine.pdf to public/case-studies/agora/ after checking it for anything private, then set href."
          },
          {
            "type": "p",
            "text": "One part of the build moved ahead of the spec. The spec says Agora asks from a fixed set of question templates. The build generates its questions with a model. A generated question may read to a team as the tool having an opinion about their work, which is what the research warned against, so the pilot tests it directly."
          },
          {
            "type": "p",
            "text": "What I would do next:"
          },
          {
            "type": "list",
            "items": [
              "Let a claim link to the deck or design file it came from. Pages are text only today, and a link adds context without the tool writing anything of its own.",
              "Cut the navigation down to the record and the blind comparison.",
              "Make the first screen show a disagreement early, so a new team sees the point within minutes."
            ]
          }
        ]
      }
    ],
    "next": "canon"
  },
canon: {
  "slug": "canon",
  "accent": "#38b6ff",
  "cardId": "canon",
  "eyebrow": "Case study  ·  CMU IPD Capstone  ·  Industry client: Canon  ·  Jan–Apr 2026",
  "title": "Deciding what to build before building it",
  "summary": "Canon asked a five-person CMU team what its EOS Webcam Utility should become. Over four months we ran a structured discovery, narrowed the product to one customer, emerging content creators, and recommended turning a webcam utility into a creator ecosystem. Canon leadership decided to go forward with the direction and is building an MVP.",
  "meta": [
    {
      "label": "Role",
      "value": "Product management, user research, engineering"
    },
    {
      "label": "Team",
      "value": "Five, across design, business and engineering"
    },
    {
      "label": "Client",
      "value": "Canon"
    },
    {
      "label": "Timeline",
      "value": "January to April 2026"
    },
    {
      "label": "Research",
      "value": "60+ interviews, first-time-use study, in-home observation, co-design"
    },
    {
      "label": "Outcome",
      "value": "Direction adopted, MVP in development"
    }
  ],
  "links": [],
  "hero": {
    "type": "figure",
    "todo": "Hero: a team photo or a still from the final presentation video (Drive: CANON - Capstone > Pictures, or Team Videos & Photos).",
    "alt": ""
  },
  "sections": [
    {
      "id": "brief",
      "heading": "The brief",
      "blocks": [
        {
          "type": "p",
          "text": "Canon's EOS Webcam Utility turns a Canon camera into a webcam for a computer. Canon came to the capstone with an open question: what should the product become, and for whom? That question sits upstream of engineering and go-to-market. A wrong answer there is expensive for every team that acts on it."
        },
        {
          "type": "p",
          "text": "The client set one hard constraint: the answer had to live in software, with no changes to Canon's hardware. We held every idea to three tests at once."
        },
        {
          "type": "cards",
          "items": [
            {
              "title": "Desirable",
              "text": "What users actually need."
            },
            {
              "title": "Feasible",
              "text": "What can be built, tested on real hardware before anyone commits to it."
            },
            {
              "title": "Viable",
              "text": "What the business can sustain, including whether customers would pay."
            }
          ]
        }
      ]
    },
    {
      "id": "process",
      "heading": "How we worked",
      "blocks": [
        {
          "type": "p",
          "text": "The capstone follows iNPD, the four-phase product development process Jonathan Cagan and Craig Vogel developed at Carnegie Mellon. We met Canon every one to two weeks, and weekly from March. Those meetings were where the direction was argued, tested and pushed back on."
        },
        {
          "type": "steps",
          "items": [
            {
              "label": "Phase 1",
              "title": "Identify",
              "text": "A PESTLE scan and interviews with three groups who put a camera on a computer: remote workers, educators and content creators. It ended with two opportunities worth pursuing."
            },
            {
              "label": "Phase 2",
              "title": "Understand",
              "text": "A first-time-use study of the existing product, a Value Opportunity Analysis, creator archetypes, a Five Whys root-cause analysis, and early product criteria."
            },
            {
              "label": "Phase 3",
              "title": "Conceptualize",
              "text": "An in-home observation of a creator running a live stream, co-design sessions, a Build-A-Thon prototyping day, concept maps and storyboards, and reviews with Canon's own developers."
            },
            {
              "label": "Phase 4",
              "title": "Realize",
              "text": "The final concept specified in detail, market sizing, engineering feasibility and a technology roadmap, presented to Canon leadership."
            }
          ]
        },
        {
          "type": "p",
          "text": "The team ran more than 60 user interviews across the project. I ran six of them, with streamers, a remote professional and an educator."
        },
        {
          "type": "p",
          "text": "Two pieces of faculty feedback changed how we worked. Our first PESTLE centred on Canon and its revenue, and we were pushed toward the people problem instead: solve that, and the business problem follows. Later, our early product criteria read like features, such as presets and software enhancements. We rewrote them as the benefits behind those features, which kept the range of possible concepts open for longer."
        },
        {
          "type": "figure",
          "todo": "A photo from the research: the first-time-use session or the in-home stream observation (Drive: CANON - Capstone > Pictures).",
          "alt": ""
        }
      ]
    },
    {
      "id": "findings",
      "heading": "What the research found",
      "blocks": [
        {
          "type": "p",
          "text": "To feel the problem ourselves, we set up the existing product as first-time users, with a multi-camera stream. It was hard going. There were too many manual steps and no clear next one. We couldn't find the login. The USB cable blocked the camera's flip screen. Autofocus kept hunting, the audio lagged, and the stream froze without explanation. One line from our notes sums it up."
        },
        {
          "type": "quote",
          "text": "AUTOFOCUS PLEASE",
          "cite": "First-time-use session notes"
        },
        {
          "type": "p",
          "text": "We then watched an emerging creator set up and run a live stream in their own home, from planning to the end of the stream. They showed the same anxiety about audio sync and connection stability before going live. Together with the interviews, this gave us four insights."
        },
        {
          "type": "list",
          "items": [
            "Setup friction drains creative headspace. Energy spent on cables and settings is energy taken from the performance.",
            "Reliability governs high-stakes moments. For live creators, one dropped feed can ruin the whole session.",
            "Consistency dictates quality. A creator building a brand needs the same look every time without rebuilding it.",
            "Guesswork starts before you hit record. Knowing which equipment to use and how to connect it is itself a barrier."
          ]
        },
        {
          "type": "p",
          "text": "When setup gets too painful, people abandon good cameras and go back to their phones."
        }
      ]
    },
    {
      "id": "narrowing",
      "heading": "Narrowing to one customer",
      "blocks": [
        {
          "type": "p",
          "text": "Remote workers, educators and creators make different things and share the same frustrations. They are very different customers, though. Casual video callers don't care which camera they use and stop spending once the picture works, so serving them would not grow the product. Established streamers already have the skills, or a crew, to get past setup problems."
        },
        {
          "type": "p",
          "text": "Emerging content creators were different. They work solo, often as a side hustle, with little time and budget. They treat their stream as an investment in their brand and income, so they pay for things that raise their production value. And setup is exactly what stops them. We made the case over successive client meetings, and by the end of February the target was set: emerging content creators."
        },
        {
          "type": "p",
          "text": "With one customer in view, the rest of the work had something to stand on. We named what these creators value most (reliability, confidence, consistency and ease), wrote the product criteria around those values, and turned them into four principles for the solution."
        },
        {
          "type": "cards",
          "items": [
            {
              "title": "Zero guesswork",
              "text": "The setup confirms it is working before the session starts."
            },
            {
              "title": "Performance first",
              "text": "The software recedes during recording, so the creator stays in the performance."
            },
            {
              "title": "Instant execution",
              "text": "The shortest path from plugging in to going live."
            },
            {
              "title": "Grows with you",
              "text": "Works for a first setup and scales as the production grows."
            }
          ]
        },
        {
          "type": "callout",
          "text": "The team's name for the goal was Speed to Joy: how quickly a creator gets from wanting to make something to recording it with confidence."
        }
      ]
    },
    {
      "id": "recommendation",
      "heading": "The recommendation",
      "blocks": [
        {
          "type": "p",
          "text": "We recommended turning the utility into a creator ecosystem, Canon Creator Studio. It has four parts: a web hub for setup guidance, a desktop app that keeps the stream stable and improves the picture, a mobile app that works as a remote control, and hardware starter kits that remove physical failure points like cable placement and a battery dying mid-stream."
        },
        {
          "type": "p",
          "text": "Canon's team kept coming back to one question. If a creator can plug the camera into a capture card, why pay a monthly subscription? Our answer was to compete on what the product lets a creator do. Competing on specs pushes buyers to compare numbers. An ecosystem that gets a creator from idea to a working stream quickly is worth paying for, and much harder for a cheaper tool to copy."
        },
        {
          "type": "p",
          "text": "Canon's engineering leadership also asked us to stay on the original brief and avoid blue-sky ideas. The ecosystem builds on the existing utility, so the recommendation widened what the product does while staying anchored to it."
        },
        {
          "type": "gallery",
          "images": [],
          "todo": "The ecosystem's touchpoints: web hub, desktop app and mobile app screens (from Figma), plus a starter kit rendering (Drive: Phase 4 > Starter Kit Renderings)."
        }
      ]
    },
    {
      "id": "feasibility",
      "heading": "Checking it could be built",
      "blocks": [
        {
          "type": "p",
          "text": "I worked across three roles on the team: product management, user research and engineering. On the engineering side, I owned the feasibility test. A recommendation that rests on untested technical assumptions is a guess, so before the team committed, I listed the riskiest assumptions behind the concept and built 14 small prototypes to test them on real hardware: a Canon EOS R8, a capture card and OBS Studio."
        },
        {
          "type": "p",
          "text": "Each prototype tested one assumption and had its pass or fail criteria written before any code, so no result could be argued into a pass afterwards. They covered controlling the camera over USB while capturing HDMI video at the same time, controlling it over Wi-Fi, enhancing video in real time within a single frame's time budget, and a recording engine that recovers from a crash in about a second without losing footage."
        },
        {
          "type": "stats",
          "items": [
            {
              "value": "14",
              "label": "prototypes, each testing one technical risk"
            },
            {
              "value": "81/81",
              "label": "tests passed on real Canon hardware"
            },
            {
              "value": "3",
              "label": "months to the first release in the roadmap"
            }
          ]
        },
        {
          "type": "p",
          "text": "On the product side, I wrote the engineering plan and the roadmap. Building on the existing utility, which already had signed drivers and camera control, removed about three months of ramp-up. Instead of one launch at the end of the build, the roadmap ships in stages: reliability and setup first, then video enhancement, presets, starter kits and the mobile companion, then standalone mobile streaming and cloud backup. Creators would be using the product for most of the build and shaping it with their feedback."
        },
        {
          "type": "figure",
          "todo": "The system architecture diagram (Career folder: Canon_Architecture_Diagram.svg). Check it reads on a dark background.",
          "alt": ""
        },
        {
          "type": "doc",
          "kind": "PDF",
          "title": "Engineering architecture guide",
          "description": "How the ecosystem would be built on the existing utility.",
          "todo": "Upload Canon_EOS_WebUtility_Architecture_Guide.pdf from the Career folder to public/case-studies/canon/, then set href."
        }
      ]
    },
    {
      "id": "outcome",
      "heading": "The outcome",
      "blocks": [
        {
          "type": "p",
          "text": "We presented the concept, the research behind it, the feasibility evidence and the roadmap to Canon leadership. Canon decided to go forward with the direction and is building an MVP."
        },
        {
          "type": "embed",
          "title": "Final presentation video",
          "todo": "The final video (Drive: Phase 4 > capstone FINAL.mp4). It is 224 MB, so upload it to YouTube as unlisted and use the youtube-nocookie embed link."
        }
      ]
    },
    {
      "id": "reflection",
      "heading": "What I took from it",
      "blocks": [
        {
          "type": "p",
          "text": "Research, research, research before building. Narrowing to one customer segment is what let us build out the tenets of the solution. The values, the product criteria, the four principles and even the order of the roadmap all came from knowing exactly who we were building for."
        }
      ]
    }
  ],
  "next": "agora"
},
};
