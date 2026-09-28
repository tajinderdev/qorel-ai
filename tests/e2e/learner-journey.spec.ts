import { test, expect } from '@playwright/test';

test.describe('End-to-End Learner Journey (14 Acceptance Steps)', () => {
  test('Complete end-to-end interactive tutor learning loop', async ({ page }) => {
    // 1. App Load
    await page.goto('/');
    await expect(page).toHaveTitle(/Qorel AI/);
    await expect(page.locator('h1')).toContainText('Master Complex Systems');

    // 2. Search for topic
    const searchInput = page.locator('#topic-search-input');
    await searchInput.fill('Redis');
    await expect(page.locator('text=Redis Clustering & High Availability')).toBeVisible();

    // 3. Launch Diagnostic
    const startDiagBtn = page.locator('#start-diagnostic-redis-clustering');
    await startDiagBtn.click();
    await expect(page).toHaveURL(/.*\/diagnostic\/redis-clustering/);
    await expect(page.locator('text=Diagnostic Challenge 1 of 3')).toBeVisible();

    // 4. Answer Diagnostic Questions
    // Q1: CRC16 mod 16384 option
    await page.locator('text=The client computes CRC16(key) mod 16384').click();
    await page.locator('#diagnostic-next-btn').click();

    // Q2: PFAIL vs FAIL
    await expect(page.locator('text=Diagnostic Challenge 2 of 3')).toBeVisible();
    await page.locator('text=PFAIL is a local suspicion by a single node; FAIL is an authoritative cluster-wide consensus').click();
    await page.locator('#diagnostic-next-btn').click();

    // Q3: Open explanation
    await expect(page.locator('text=Diagnostic Challenge 3 of 3')).toBeVisible();
    const openInput = page.locator('#diagnostic-open-answer-input');
    await openInput.fill(
      'Redis Cluster uses majority master quorum to prevent split-brain writes during network partitions. Replicas in the minority partition cannot secure epoch election votes.'
    );
    await page.locator('#diagnostic-next-btn').click();

    // 5. Verify Diagnostic completion & Personalized Path
    await expect(page.locator('text=Diagnostic Assessment Complete')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#start-personalized-lesson-btn')).toBeVisible();

    // 6. Launch Personalized Lesson
    await page.locator('#start-personalized-lesson-btn').click();
    await expect(page).toHaveURL(/.*\/lesson\/redis-clustering/);

    // 7. Verify Lesson Title & Narration Bar
    await expect(page.locator('h1')).toContainText('1. Hash Slot Partitioning');
    await expect(page.locator('#audio-play-toggle-btn')).toBeVisible();

    // 8. Toggle Audio Playback & Check Subtitles
    await page.locator('#audio-play-toggle-btn').click();
    await expect(page.locator('text=Sync Subtitles')).toBeVisible();

    // 9. Checkpoint interaction
    await page.locator('text=Use Hash Tags: "{user_42}:session" and "{user_42}:cart"').click();
    await page.locator('#checkpoint-submit-btn').click();

    // 10. Verify AI Checkpoint Evaluation
    await expect(page.locator('text=Checkpoint Verified (100% Score)')).toBeVisible();

    // 11. Test "Explain Differently"
    await page.locator('text=Stuck? Explain with Analogy').click();
    await expect(page.locator('text=Explain Differently')).toBeVisible();
    await expect(page.locator('text=Real-World Analogy')).toBeVisible();
    await page.locator('text=I Understand Now — Resume Lesson').click();

    // 12. Move to Section 2 & Complete Lesson
    await page.locator('#next-section-btn').click();
    await expect(page.locator('h1')).toContainText('2. Gossip Protocol');

    await page.locator('#next-section-btn').click();
    await expect(page.locator('h1')).toContainText('3. Sentinel Quorum');

    await page.locator('#next-section-btn').click();
    await expect(page.locator('text=Mastery Verified: Redis Clustering')).toBeVisible({ timeout: 10000 });

    // 13. Navigate to Knowledge Profile & Verify Evidence Ledger
    await page.locator('#view-profile-summary-btn').click();
    await expect(page).toHaveURL(/.*\/profile/);
    await expect(page.locator('text=Personal Knowledge Profile')).toBeVisible();
    await expect(page.locator('text=Verifiable Evidence Ledger')).toBeVisible();

    // 14. Career Roadmap Verification
    await page.goto('/roadmap');
    await expect(page.locator('text=Target Role Roadmap')).toBeVisible();
    await expect(page.locator('text=Current Readiness')).toBeVisible();

    // 15. Verify Topic Memory on Homepage
    await page.goto('/');
    await expect(page.locator('text=Learned Previously')).toBeVisible();

    // 16. Submit Course Feedback
    await page.locator('#open-feedback-btn').click();
    await expect(page.locator('text=Course Feedback & QA')).toBeVisible();
    await page.locator('#feedback-comment-input').fill('Great 3D cluster visualization of hash slots!');
    await page.locator('#feedback-submit-btn').click();
    await expect(page.locator('text=Feedback Recorded')).toBeVisible();
  });
});
