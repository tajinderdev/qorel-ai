import { NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/factory';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message } = await req.json();
    
    // For a real app, this would use a chat completions endpoint. 
    // Here we adapt answerTutorQuestion for generic chat.
    const ai = getAIProvider();
    const result = await ai.answerTutorQuestion({
      topic: 'General Technical Knowledge',
      currentSectionTitle: 'Chat',
      learnerQuestion: message,
      masteryLevel: 50, // mock level
    });

    return NextResponse.json({ reply: result.answer });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
