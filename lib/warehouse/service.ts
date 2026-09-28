import { TOPIC_CATALOG, CANONICAL_COURSES } from './courses';
import { CanonicalCourse, PersonalizedPath, Topic } from '../types';

export class CourseWarehouseService {
  static getTopics(query?: string, category?: string): Topic[] {
    return TOPIC_CATALOG.filter((topic) => {
      const matchQuery =
        !query ||
        topic.title.toLowerCase().includes(query.toLowerCase()) ||
        topic.description.toLowerCase().includes(query.toLowerCase()) ||
        topic.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      const matchCategory = !category || category === 'All' || topic.category === category;

      return matchQuery && matchCategory;
    });
  }

  static getTopicBySlug(slug: string): Topic | undefined {
    return TOPIC_CATALOG.find((t) => t.slug === slug);
  }

  static getCanonicalCourse(topicSlug: string): CanonicalCourse | null {
    return CANONICAL_COURSES[topicSlug] || null;
  }

  /**
   * Generates a Personalized Learning Path by analyzing the learner's diagnostic score,
   * mastered concepts, and weak areas.
   */
  static personalizePath(params: {
    topicSlug: string;
    diagnosticScore: number;
    knownConcepts?: string[];
    weakConcepts?: string[];
  }): PersonalizedPath {
    const course = CANONICAL_COURSES[params.topicSlug];
    if (!course) {
      throw new Error(`Course not found for topic slug: ${params.topicSlug}`);
    }

    const prunedSectionIds: string[] = [];
    const activeSections = course.sections.filter((sec) => {
      // If the learner has high overall diagnostic (>80%) AND concept is in known list, prune it
      const isKnown = params.knownConcepts?.includes(sec.conceptKey);
      if (params.diagnosticScore >= 80 && isKnown) {
        prunedSectionIds.push(sec.id);
        return false;
      }
      return true;
    });

    return {
      topicSlug: params.topicSlug,
      totalSections: course.sections.length,
      prunedSectionIds,
      activeSections: activeSections.length > 0 ? activeSections : course.sections,
      initialMasteryEstimate: Math.max(15, Math.min(95, params.diagnosticScore)),
      diagnosticScore: params.diagnosticScore,
    };
  }
}
