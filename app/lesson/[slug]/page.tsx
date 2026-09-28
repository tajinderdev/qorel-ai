import { notFound } from 'next/navigation';
import { CourseWarehouseService } from '@/lib/warehouse/service';
import LessonRunner from '@/components/lesson/LessonRunner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = CourseWarehouseService.getTopicBySlug(slug);
  const course = CourseWarehouseService.getCanonicalCourse(slug);

  if (!topic || !course) {
    notFound();
  }

  return <LessonRunner topic={topic} sections={course.sections} />;
}
