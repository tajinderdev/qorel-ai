# FEEDBACK & COURSE IMPROVEMENT PIPELINE

## 1. Feedback Ingestion
- Users can flag any lesson section or checkpoint question with specific categories:
  - Technical Inaccuracy / Outdated Syntax
  - Ambiguous Question Prompt
  - Visual Layout / 3D Glitch
  - Audio Narration Glitch
  - Pacing / Too Fast or Slow

## 2. Verification Queue
- Submissions are logged in the `CourseFeedback` table with state `PENDING`.
- Automated AI QA reviewer cross-references the reported section against the latest canonical documentation.
- Verified changes trigger an incremental version bump on the `CanonicalCourse`.
