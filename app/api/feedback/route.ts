import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topicSlug, sectionId, feedbackType, rating, comment } = body;

    // Log feedback into server ledger
    const feedbackItem = {
      id: `fb-${Date.now()}`,
      topicSlug: topicSlug || 'general',
      sectionId,
      feedbackType: feedbackType || 'GENERAL',
      rating: rating || 5,
      comment: comment || '',
      status: 'VERIFICATION_QUEUED',
      createdAt: new Date().toISOString(),
    };

    console.log('[Course QA / Feedback Logged]:', feedbackItem);

    return NextResponse.json({ success: true, item: feedbackItem });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process feedback' },
      { status: 500 }
    );
  }
}
