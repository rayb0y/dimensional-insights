// Case study content. One entry per case study, rendered at /work/<slug>.
// To add a picture, document, video or embed: add a block to a section's
// `blocks` array (or fill in the `src` / `href` of an existing one).
// Files go in /public/case-studies/<slug>/ and are referenced as
// "/case-studies/<slug>/<file>". Blocks with no src/href show a dashed
// "To add" box in the Lovable preview only; the published site hides them.

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
  }
};
