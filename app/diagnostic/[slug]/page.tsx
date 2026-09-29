import { notFound } from 'next/navigation';
import { CourseWarehouseService } from '@/lib/warehouse/service';
import DiagnosticView from '@/components/diagnostic/DiagnosticView';
import { getAIProvider } from '@/lib/ai/factory';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DiagnosticPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = CourseWarehouseService.getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const ai = getAIProvider();
  const course = await ai.generateCourseContent({
    topicSlug: topic.slug,
    topicTitle: topic.title,
  });

  if (!course || !course.diagnostic) {
    notFound();
  }

  return <DiagnosticView topic={topic} diagnostic={course.diagnostic} />;
}
