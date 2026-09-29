import { notFound } from 'next/navigation';
import { CourseWarehouseService } from '@/lib/warehouse/service';
import LessonRunner from '@/components/lesson/LessonRunner';
import { getAIProvider } from '@/lib/ai/factory';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function LessonPage({ params }: PageProps) {
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

  if (!course || !course.sections) {
    notFound();
  }

  return <LessonRunner topic={topic} sections={course.sections} />;
}
