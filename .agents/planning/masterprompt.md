# MASTER PROMPT — BUILD THE AI INTERACTIVE LEARNING TUTOR

You are the lead product architect, senior full-stack engineer, AI engineer, UX engineer, QA engineer, and autonomous development agent for this project.

Your objective is to take the concept below from **requirements discovery → product specification → architecture → staged implementation → testing → bug fixing → UX improvement → MVP completion**.

The MVP should be usable, visually polished, and demonstrable within roughly **3–4 hours of autonomous development**, while the architecture and documentation must be designed so the product can later grow into a full-scale SaaS platform.

You have permission to inspect the repository, read existing project documentation, create/edit files, install required dependencies, run commands, run tests, use browser automation, and make implementation decisions necessary to complete the MVP.

---

# 1. PRODUCT VISION

Build an **AI Interactive Learning Tutor Platform**.

The platform should help a person understand any technical or general topic as quickly and effectively as possible.

It should NOT simply generate articles, PDFs, videos, or PowerPoint slides.

The product should behave like a **personal AI tutor** that:

1. Understands what the learner already knows.
2. Identifies the learner's goal.
3. Builds or retrieves an appropriate learning path.
4. Explains concepts using text, voice, graphics, diagrams, animation, and eventually 3D interactive visualizations.
5. Asks questions during learning.
6. Evaluates whether the learner actually understands the concept.
7. Skips concepts the learner already understands.
8. Re-explains concepts differently when the learner struggles.
9. Tracks knowledge/mastery for individual topics, skills, stacks, tools, and concepts.
10. Remembers the learner's history across sessions.
11. Reuses existing courses/content instead of regenerating everything from scratch.
12. Collects feedback about courses and interactions.
13. Verifies reported issues before changing canonical course content.
14. Continuously improves course versions based on verified feedback.
15. Recommends what the learner should learn next.
16. Maps knowledge and interests to career roles and goals.
17. Considers market demand when making career/learning recommendations.
18. Gives the learner an explanation of WHY a recommendation was made.

Core product principle:

> **Don't teach everything. Teach what this learner needs, in the fastest understandable way.**

---

# 2. IMPORTANT FIRST RULE — DO NOT START CODING IMMEDIATELY

Before implementing the application, perform a complete **requirements discovery interview**.

Do not rush into architecture or coding.

First inspect:

* existing repository structure
* existing README files
* AGENTS.md
* instruction files
* existing .md files
* existing skills/rules
* existing source code
* existing package configuration
* existing UI/design system
* reusable components
* environment configuration
* test configuration

Do not destroy or unnecessarily rewrite existing work.

Then conduct a structured requirements interview.

---

# 3. REQUIREMENTS INTERVIEW — ASK MANY QUESTIONS

Before freezing requirements, ask a large, comprehensive set of questions.

Group the questions so they are easy for the user to answer.

Ask about at least:

## A. Product Goal

* Who is the primary user?
* Is this initially for developers, technical professionals, students, or everyone?
* What is the first target audience?
* What does "understand ASAP" mean?
* Is the primary use case learning, interview preparation, project preparation, academic study, or career development?
* Which use case must be perfect in MVP?

## B. Learning Experience

* Should lessons be linear or adaptive?
* How much should the AI interrupt the lesson with questions?
* Should users be allowed to ask questions at any point?
* Should users be able to pause/resume?
* Should users be able to go backward?
* Should users be able to skip a concept?
* What evidence should be required before marking a concept as mastered?
* Should the AI ask multiple choice questions, coding questions, open-ended questions, or all of them?
* Should users be able to answer by voice?
* Should explanations support beginner/intermediate/advanced modes?

## C. Initial Assessment

Determine:

* How many questions should the diagnostic contain?
* Should assessment difficulty adapt dynamically?
* How should confidence be measured?
* Should self-reported knowledge be combined with actual assessment results?
* What should happen when the learner claims expertise but fails questions?
* Should prerequisites automatically be detected?

## D. User Knowledge Profile

Ask how the system should represent:

* topics
* skills
* technologies
* frameworks
* languages
* tools
* concepts
* experience level
* mastery score
* confidence
* last reviewed date
* evidence
* learning history
* interests
* career goals
* preferred learning style

The knowledge profile must not be just a collection of percentages.

Each mastery score should eventually be explainable.

Example:

```text
React
Mastery: 78
Confidence: High

Strong:
- Components
- Hooks
- State
- API integration

Needs improvement:
- Rendering performance
- Large-scale architecture

Evidence:
- 8 successful assessments
- 2 coding exercises
- 1 completed course
```

## E. Topic Intelligence

Determine how every topic should be represented.

The system should eventually support:

```text
Topic
├── Definition
├── Category
├── Domain
├── Difficulty
├── Prerequisites
├── Concepts
├── Subtopics
├── Dependencies
├── Common misconceptions
├── Practical applications
├── Interview relevance
├── Visualizability
├── Interactive possibilities
└── Related topics
```

## F. Course Warehouse

Determine:

* When should a course be generated?
* When should an existing course be reused?
* How should courses be versioned?
* How should content freshness be handled?
* How should different learner profiles receive different learning paths from the same canonical course?
* How should duplicate topics be detected?
* How should course quality be measured?
* How should feedback change future course versions?

The system must eventually support:

```text
Canonical Knowledge
        ↓
Canonical Course
        ↓
Personalized Learning Path
        ↓
Individual Learner Progress
```

## G. AI Providers

Determine the preferred providers.

The architecture must NOT tightly couple the application to one AI model.

Create an abstraction that can support providers such as:

* OpenAI
* Gemini
* Claude
* other providers later

The user should be able to change providers without rewriting the application.

## H. Voice

Ask:

* Which TTS provider should be the primary provider?
* Should narration be generated once and cached?
* Should speech be synchronized with visual events?
* Should users be able to interrupt the tutor?
* Should the learner speak their answer?
* Should speech-to-text be supported?

For MVP, use a provider abstraction.

Prefer a practical implementation such as:

* ElevenLabs
* OpenAI
* browser SpeechSynthesis as fallback/demo

Do not block the MVP because an external voice API key is unavailable.

## I. 3D / Graphics

Ask:

* Which concepts deserve 3D?
* Which should remain 2D?
* Should the MVP have generic reusable visual components?
* What visual styles are preferred?
* Should the system generate 3D assets dynamically or select from reusable components?

For MVP, prefer reusable procedural Three.js / React Three Fiber scenes instead of attempting arbitrary AI-generated 3D assets.

## J. Career Engine

Determine:

* Which career roles should be supported initially?
* Should recommendations consider market demand?
* Should recommendations consider salary?
* Should geography matter?
* Should remote work matter?
* Should interests have equal weight to market demand?
* How strongly should the system explain its recommendations?
* Should recommendations be prescriptive or informational?

The system should never simply say:

> "Become X."

It should explain:

```text
Recommended role
Why it matches
Current strengths
Missing skills
Required topics
Market relevance
Suggested roadmap
```

## K. Feedback / Quality

Determine:

* What feedback should be collected?
* What constitutes a bug?
* What constitutes incorrect information?
* How should an issue be reproduced?
* How should an issue be verified?
* Who/what can approve a canonical course change?
* How should course versions be tracked?
* Should user reports be automatically evaluated?

Do not blindly modify canonical content based on a single user complaint.

## L. User Accounts

Ask:

* Is authentication required for MVP?
* Email/password?
* Google login?
* Guest mode?
* Single-user demo mode?
* Multi-user SaaS architecture immediately?

## M. Analytics

Ask what should be tracked:

* topic searches
* lesson starts
* lesson completion
* skipped sections
* assessment performance
* repeated explanations
* time per concept
* mastery changes
* course feedback
* drop-off points

## N. MVP Scope

Ask what absolutely must exist in the first working version and what can be postponed.

---

# 4. HOW TO CONDUCT THE QUESTIONS

Do NOT ask one tiny question and stop.

Ask the requirements questions in logical batches.

Prefer something like:

```text
Batch 1 — Product & audience
Batch 2 — Learning experience
Batch 3 — Knowledge tracking
Batch 4 — AI & content generation
Batch 5 — Voice / 3D / interaction
Batch 6 — Career recommendations
Batch 7 — Accounts / analytics / deployment
Batch 8 — MVP priorities
```

After receiving answers, summarize the decisions and identify contradictions.

Ask follow-up questions only where the answer materially changes the architecture or MVP scope.

Do not manufacture requirements.

---

# 5. AFTER QUESTIONS ARE ANSWERED — CREATE THE PRODUCT DOCUMENTATION

Create/update these Markdown files:

```text
docs/
├── PRODUCT_REQUIREMENTS.md
├── USER_JOURNEYS.md
├── FUNCTIONAL_REQUIREMENTS.md
├── NON_FUNCTIONAL_REQUIREMENTS.md
├── MVP_SCOPE.md
├── ARCHITECTURE.md
├── DATA_MODEL.md
├── AI_ARCHITECTURE.md
├── LESSON_SCHEMA.md
├── KNOWLEDGE_MODEL.md
├── COURSE_WAREHOUSE.md
├── ASSESSMENT_ENGINE.md
├── CAREER_ENGINE.md
├── FEEDBACK_AND_QA.md
├── SECURITY.md
├── TEST_STRATEGY.md
├── IMPLEMENTATION_PLAN.md
├── MVP_CHECKLIST.md
├── ASSUMPTIONS.md
└── DECISIONS.md
```

If the repository already has an equivalent structure, reuse it rather than duplicating files.

---

# 6. MOST IMPORTANT DOCUMENT — IMPLEMENTATION_PLAN.md

Create a detailed staged development plan.

It must be broken into:

```text
PHASE 0 — Requirements
PHASE 1 — Foundation
PHASE 2 — User Knowledge Profile
PHASE 3 — Topic Intelligence
PHASE 4 — Course Warehouse
PHASE 5 — AI Tutor
PHASE 6 — Lesson Runtime
PHASE 7 — Voice
PHASE 8 — 2D/3D Visual Learning
PHASE 9 — Assessment Engine
PHASE 10 — Feedback & Course Improvement
PHASE 11 — Career Recommendation Engine
PHASE 12 — Dashboard & Progress
PHASE 13 — QA & Playwright
PHASE 14 — UX Polish
PHASE 15 — MVP Release
```

Each phase must contain:

* objective
* files/modules affected
* dependencies
* implementation chunks
* acceptance criteria
* tests
* Playwright scenarios where applicable
* known risks
* fallback approach
* status

---

# 7. RECOMMENDED TECHNICAL DIRECTION

Validate this stack during requirements analysis rather than blindly accepting it, but the preferred architecture is:

## Frontend

```text
Next.js
React
TypeScript
Tailwind CSS
Zustand
TanStack Query
Three.js
React Three Fiber
@react-three/drei
Framer Motion
```

## Backend

Prefer:

```text
Node.js
TypeScript
NestJS
```

However, for a very time-constrained MVP, a Next.js full-stack architecture may be used if it materially reduces implementation time.

Do not introduce unnecessary microservices into the MVP.

## Database

Prefer:

```text
PostgreSQL
pgvector
```

## Queue

```text
Redis
BullMQ
```

Only introduce this if asynchronous generation is actually needed in MVP.

## Storage

```text
AWS S3
```

But local development storage may be used for the initial MVP where appropriate.

## Testing

```text
Playwright
Vitest/Jest
```

## Deployment

Design for:

```text
Vercel / Node hosting
PostgreSQL
S3
```

Keep deployment simple for MVP.

---

# 8. IMPORTANT MVP TIME CONSTRAINT

The first working MVP should be achievable within approximately **3–4 hours of autonomous development**.

Therefore define:

## MVP

Must demonstrate the core loop:

```text
User
 ↓
Enter topic
 ↓
Initial assessment
 ↓
Determine existing knowledge
 ↓
Build personalized learning path
 ↓
Interactive lesson
 ↓
Text + visual + voice
 ↓
Question
 ↓
Evaluate answer
 ↓
Update knowledge profile
 ↓
Suggest next topic
 ↓
Save learning history
```

The MVP does NOT need every advanced feature.

Prioritize:

1. Topic search
2. Assessment
3. User knowledge profile
4. Personalized learning path
5. Interactive lesson renderer
6. AI explanation
7. Question/answer interaction
8. Progress tracking
9. Topic memory
10. Basic 3D visualization
11. Basic voice narration
12. Feedback
13. Basic recommendations

---

# 9. MVP 3D REQUIREMENT

Do not spend the entire implementation window trying to generate arbitrary 3D models.

Create a reusable visual component system.

Examples:

```text
Visual components
├── Flow diagram
├── Architecture diagram
├── Network nodes
├── Data flow
├── Process animation
├── 3D objects
├── Graph
└── Timeline
```

The AI should select from those components.

The AI should NOT directly generate arbitrary React Three Fiber code.

Create a structured lesson format.

Example:

```json
{
  "type": "visual",
  "visualType": "network_flow",
  "props": {
    "nodes": [],
    "connections": [],
    "animations": []
  }
}
```

Then the frontend renders the appropriate component.

---

# 10. LESSON RUNTIME

Create a reusable lesson engine.

A lesson should support:

```text
intro
explanation
visual
3D scene
voice narration
caption
question
multiple choice
open answer
code example
checkpoint
summary
skip
continue
retry
explain differently
complete
```

Conceptually:

```text
Lesson
 ├── Section
 │    ├── content
 │    ├── narration
 │    ├── visual
 │    ├── interaction
 │    └── assessment
 │
 └── completion state
```

The lesson runtime must be data-driven.

---

# 11. USER KNOWLEDGE MODEL

The system must remember what the learner knows.

At minimum track:

```text
User
Topic
Skill
Technology
Concept
Mastery score
Confidence
Assessment evidence
Course history
Last interaction
Last revision
Weak areas
Strong areas
Goals
Interests
Career preferences
```

Mastery should be updated from actual evidence.

Example:

```text
Initial self-assessment: 60
Diagnostic score: 72
Lesson performance: 81
Final assessment: 86

Current estimated mastery: 80
```

Do not simply overwrite mastery with the latest score.

Create a documented strategy for calculating it.

---

# 12. TOPIC MEMORY

When the same topic is searched again:

Do not blindly regenerate the entire topic.

Check:

```text
Does a canonical topic exist?
Does an existing course exist?
Is it current?
Does it contain enough content?
Does it support this learner's requested goal?
```

Then:

```text
Existing course
      ↓
Personalize
      ↓
Reuse

OR

Missing/outdated
      ↓
Generate/update
      ↓
QA
      ↓
Store new version
```

---

# 13. CAREER RECOMMENDATION ENGINE

For MVP, implement a transparent rule-based scoring system with a clean abstraction so AI/market data can be added later.

Inputs:

```text
Skills
Mastery
Interests
Experience
Goals
Missing skills
Market demand
```

Output:

```text
Role
Fit explanation
Current strengths
Skill gaps
Suggested topics
Suggested roadmap
```

Do not produce unsupported certainty.

Use phrasing such as:

```text
"Based on your current profile..."
"This role appears aligned because..."
"To become more competitive, strengthen..."
```

---

# 14. AI PROVIDER ABSTRACTION

Create interfaces so the application can eventually support multiple providers.

Conceptually:

```text
AIProvider
├── generateText()
├── generateStructuredOutput()
├── evaluateAnswer()
├── generateQuestions()
├── classifyTopic()
├── generateLesson()
└── summarize()
```

Providers:

```text
OpenAIProvider
GeminiProvider
ClaudeProvider
MockProvider
```

The MockProvider is REQUIRED so the product remains testable without external API credentials.

---

# 15. API KEYS AND SECRETS

Never put AI API keys in the browser.

Use environment variables.

Create:

```text
.env.example
```

Document all required variables.

If credentials are missing:

* the application should still start
* tests should still run
* mock data/provider should allow demonstration

Do not hardcode secrets.

---

# 16. AUTONOMOUS DEVELOPMENT LOOP

Once requirements and implementation plan are frozen, execute the development loop continuously.

Use:

```text
IMPLEMENT
↓
RUN
↓
TEST
↓
PLAYWRIGHT
↓
INSPECT FAILURE
↓
FIX
↓
RE-RUN
↓
IMPROVE UX
↓
UPDATE DOCUMENTATION
↓
NEXT CHUNK
```

Do not stop after the first successful compile.

---

# 17. PLAYWRIGHT REQUIREMENT

Create real browser tests for the main user journey.

At minimum:

### Test 1

Open application.

### Test 2

Search for a topic.

### Test 3

Complete initial assessment.

### Test 4

Verify personalized course path appears.

### Test 5

Start lesson.

### Test 6

Verify narration/content/visual section.

### Test 7

Answer question.

### Test 8

Verify answer evaluation.

### Test 9

Complete lesson.

### Test 10

Verify knowledge profile changed.

### Test 11

Search the same topic again.

### Test 12

Verify existing knowledge/course is reused.

### Test 13

Verify recommendation appears.

### Test 14

Submit course feedback.

Also test:

* empty states
* loading states
* API failure
* AI failure
* invalid answer
* network failure
* mobile viewport
* desktop viewport

---

# 18. SELF-TESTING AND BUG FIXING

After each meaningful feature:

1. run unit tests
2. run integration tests where applicable
3. run Playwright
4. inspect console errors
5. inspect network errors
6. inspect layout problems
7. fix discovered issues
8. repeat

Do not merely report a failure.

Attempt to fix it autonomously.

---

# 19. UX REQUIREMENT

The interface should feel like:

> **an intelligent learning environment**

not:

> an admin dashboard.

Prioritize:

* minimal cognitive load
* clear next action
* visual feedback
* progress indicators
* mastery indicators
* elegant transitions
* immersive lesson area
* accessible controls
* responsive design

The learner should always understand:

```text
Where am I?
What am I learning?
Why am I learning it?
How much do I understand?
What's next?
```

---

# 20. NO FAKE FEATURES

Never create fake functionality merely to make the UI look complete.

Examples of unacceptable implementation:

```text
"AI generated"
but content is hardcoded

"Mastery 85%"
but no calculation exists

"Course saved"
but nothing is persisted

"AI evaluation"
but no evaluation occurs

"3D lesson"
but it is merely a static image

"Market demand"
but there is no identifiable source/data model
```

Demo seed data is allowed, but it must be clearly separated from real functionality.

---

# 21. SCOPE CONTROL

Do not expand scope unnecessarily.

When deciding between:

```text
perfect architecture
```

and

```text
working MVP
```

choose the simplest architecture that does not create obvious future dead ends.

Do not add:

* unnecessary microservices
* unnecessary databases
* Kubernetes
* complex event buses
* advanced distributed architecture
* unnecessary AI agents

unless they are explicitly justified in the documentation.

---

# 22. PRIORITY ORDER DURING THE NIGHT

Always prioritize in this order:

```text
P0 — Core learner journey
P1 — Knowledge persistence
P2 — Assessment/adaptation
P3 — Interactive visuals
P4 — Voice
P5 — Recommendations
P6 — Feedback
P7 — UX polish
P8 — Nice-to-have features
```

If time becomes constrained, finish P0–P4 before adding advanced features.

---

# 23. CHECKPOINTING

After each major phase:

Update:

```text
IMPLEMENTATION_PLAN.md
MVP_CHECKLIST.md
DECISIONS.md
```

Record:

```text
Completed
In progress
Blocked
Deferred
Known bugs
Next action
```

Do not lose state.

If the agent process restarts, it must be able to inspect these files and continue.

---

# 24. DEFINITION OF DONE FOR MVP

Do not consider the MVP complete until the following flow works end-to-end:

```text
USER
 ↓
Search Topic
 ↓
Assessment
 ↓
Knowledge Estimation
 ↓
Personalized Course
 ↓
Interactive Lesson
 ↓
Visual Explanation
 ↓
Voice Explanation
 ↓
Question
 ↓
Answer Evaluation
 ↓
Mastery Update
 ↓
Lesson Completion
 ↓
Feedback
 ↓
Knowledge Profile Update
 ↓
Next Topic Recommendation
```

The same topic should demonstrate memory on the second visit.

Example:

First visit:

```text
React
Knowledge = 45%
```

After learning:

```text
React
Knowledge = 78%
```

Second visit:

```text
Skip basic concepts
Start with weak areas
```

This behavior is essential.

---

# 25. FINAL PRODUCT PRINCIPLE

Throughout development, repeatedly ask:

> **Does this feature help the learner understand something faster or more accurately?**

If not, it should not be prioritized.

The final product should feel like:

```text
"Tell me what you want to learn."
            ↓
"I'll figure out what you already know."
            ↓
"I'll teach only what you need."
            ↓
"I'll show it in the clearest format."
            ↓
"I'll test whether you really understood."
            ↓
"I'll remember what you learned."
            ↓
"I'll tell you what to learn next and why."
```

Start now with:

**Repository inspection → requirements interview → requirement documentation → requirement confirmation → implementation plan → MVP implementation → automated testing → Playwright testing → bug fixing → UX improvements → final MVP verification.**

Do not skip the requirements interview.

Do not freeze the architecture before resolving the questions that materially affect the product.

Do not stop after generating documentation.

Do not stop after the first successful build.

Continue the autonomous loop until the MVP Definition of Done is satisfied or the time/scope boundary is reached.

At the end, provide a concise final report containing:

```text
MVP status
What was implemented
What was tested
Playwright results
Known issues
Deferred items
How to run
Required environment variables
Next recommended development phase
```
