# LESSON SCHEMA & 3D VISUAL BINDINGS

```typescript
export interface CanonicalSection {
  id: string;
  title: string;
  conceptKey: string;
  order: number;
  durationSeconds: number;
  narrationScript: string;
  contentMarkdown: string;
  codeSnippets?: {
    language: string;
    filename?: string;
    code: string;
    highlightLines?: number[];
  }[];
  visualSpec?: VisualSpecification;
  checkpoint?: LessonCheckpoint;
}

export type VisualSpecification = 
  | {
      type: '3d_cluster_network';
      props: {
        nodes: { id: string; label: string; role: 'primary' | 'replica' | 'sentinel'; status: 'healthy' | 'failed'; slots?: string }[];
        links: { source: string; target: string; animated?: boolean; label?: string }[];
        initialCameraPosition?: [number, number, number];
        autoRotate?: boolean;
      };
    }
  | {
      type: '3d_memory_layout';
      props: {
        blocks: { address: string; label: string; value: string; state: 'allocated' | 'free' | 'dirty' }[];
        pointers: { from: string; to: string; label: string }[];
      };
    }
  | {
      type: '3d_pipeline_flow';
      props: {
        stages: { id: string; name: string; throughput: string; status: 'active' | 'bottleneck' | 'idle' }[];
        packets: { id: string; stageId: string; progress: number }[];
      };
    }
  | {
      type: '2d_architecture_canvas';
      props: {
        components: { id: string; label: string; icon: string; category: string }[];
        connections: { from: string; to: string; protocol: string }[];
      };
    };

export interface LessonCheckpoint {
  id: string;
  type: 'code_prediction' | 'code_fix' | 'open_explanation' | 'multiple_choice';
  prompt: string;
  codeContext?: string;
  options?: { id: string; text: string; isCorrect: boolean; explanation: string }[];
  expectedKeywords?: string[];
  rubricCriteria?: string[];
  difficulty: 'basic' | 'intermediate' | 'expert';
}
```
