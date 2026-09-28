import { notFound } from 'next/navigation';
import { CourseWarehouseService } from '@/lib/warehouse/service';
import DiagnosticView from '@/components/diagnostic/DiagnosticView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DiagnosticPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = CourseWarehouseService.getTopicBySlug(slug);
  const course = CourseWarehouseService.getCanonicalCourse(slug);

  if (!topic || !course) {
    notFound();
  }

  return <DiagnosticView topic={topic} diagnostic={course.diagnostic} />;
}
