# DATA MODEL & PRISMA SCHEMA SPECIFICATION

```prisma
datasource db {
  provider = "postgresql" // or "sqlite" during local dev
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  name          String?
  targetRole    String    @default("Senior Full-Stack Engineer")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  knowledgeProfiles KnowledgeProfile[]
  evidenceLogs      EvidenceLog[]
  courseProgresses  CourseProgress[]
  feedbacks         CourseFeedback[]
}

model Topic {
  id              String   @id @default(uuid())
  slug            String   @unique
  title           String
  description     String
  category        String
  difficulty      String   // Beginner, Intermediate, Advanced
  estimatedMinutes Int
  prerequisites   String[] // Array of topic slugs
  canonicalCourse CanonicalCourse?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model CanonicalCourse {
  id          String   @id @default(uuid())
  topicId     String   @unique
  topic       Topic    @relation(fields: [topicId], references: [id], onDelete: Cascade)
  version     Int      @default(1)
  sections    Json     // Array of CanonicalSection
  diagnostic  Json     // DiagnosticQuiz
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model CourseProgress {
  id                String   @id @default(uuid())
  userId            String
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  topicSlug         String
  status            String   // NOT_STARTED, IN_PROGRESS, COMPLETED
  masteryScore      Float    @default(0.0)
  completedSections String[] // sectionIds
  personalizedPath  Json?    // Pruned section list
  lastVisited       DateTime @default(now())

  @@unique([userId, topicSlug])
}

model KnowledgeProfile {
  id             String   @id @default(uuid())
  userId         String
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  topicSlug      String
  skillName      String
  masteryScore   Float    // 0 to 100
  confidence     String   // Low, Medium, High
  strongConcepts String[]
  weakConcepts   String[]
  lastAssessedAt DateTime @default(now())

  @@unique([userId, topicSlug, skillName])
}

model EvidenceLog {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  topicSlug   String
  conceptId   String
  eventType   String   // DIAGNOSTIC, CHECKPOINT_PASS, CHECKPOINT_FAIL, EXPLANATION_EVAL
  scoreDelta  Float
  scoreBefore Float
  scoreAfter  Float
  rationale   String
  createdAt   DateTime @default(now())
}

model CourseFeedback {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  topicSlug   String
  sectionId   String?
  rating      Int      // 1 to 5
  feedbackType String  // ACCURACY, CLARITY, BUG, PACING
  comment     String
  status      String   @default("PENDING") // PENDING, VERIFIED, REJECTED, RESOLVED
  createdAt   DateTime @default(now())
}
```
