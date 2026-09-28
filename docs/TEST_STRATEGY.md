# TEST STRATEGY & PLAYWRIGHT E2E PLAN

## 1. Test Levels
- **Unit Tests (Vitest)**: Testing mastery calculation formulas, dynamic path personalizer algorithms, role fit scoring, AI mock provider response schemas, and feedback queues.
- **Integration Tests**: API Route testing for `/api/topics`, `/api/diagnostic/evaluate`, `/api/lessons/[slug]`, `/api/feedback`.
- **End-to-End Tests (Playwright)**: Full browser automation executing the end-to-end 14-step learner journey.

## 2. Playwright 14-Step Acceptance Suite
1. `test_01_app_load`: Landing page loads cleanly with dark mode and active search bar.
2. `test_02_topic_search`: Search for "Redis Clustering" shows topic card and metadata.
3. `test_03_diagnostic_start`: Launch diagnostic assessment.
4. `test_04_diagnostic_evaluation`: Submit diagnostic answers and verify real-time scoring.
5. `test_05_personalized_path`: Verify customized learning path skips mastered basics and highlights weak concepts.
6. `test_06_lesson_start`: Launch lesson and verify section renderer.
7. `test_07_r3f_3d_canvas`: Verify 3D cluster network canvas mounts and renders nodes.
8. `test_08_voice_narration`: Trigger voice narration controls and inspect caption display.
9. `test_09_checkpoint_answer`: Submit code bug fix / open-ended answer.
10. `test_10_ai_evaluation_feedback`: Verify AI evaluation badge and explanation feedback.
11. `test_11_explain_differently`: Trigger "Explain Differently" and verify alternative breakdown appears.
12. `test_12_lesson_completion`: Complete lesson and confirm mastery ledger updates.
13. `test_13_topic_memory`: Re-visit topic and verify system remembers previous mastery state.
14. `test_14_course_feedback`: Submit course feedback and verify confirmation alert.
