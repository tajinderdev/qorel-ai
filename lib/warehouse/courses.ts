import { CanonicalCourse, Topic } from '../types';

export const TOPIC_CATALOG: Topic[] = [
  {
    id: 'topic-redis-clustering',
    slug: 'redis-clustering',
    title: 'Redis Clustering & High Availability',
    tagline: 'Master 16,384 Hash Slots, Gossip Heartbeats, and Sentinel Failovers in 15 minutes',
    description:
      'Deep dive into distributed in-memory data architectures. Learn how Redis Cluster partitions data deterministically across shards, detects network partitions via Gossip, and executes zero-downtime Sentinel failover.',
    category: 'Distributed Systems',
    difficulty: 'Advanced',
    estimatedMinutes: 18,
    prerequisites: ['Basic Key-Value Caching', 'TCP/IP Basics'],
    skillsCovered: ['Distributed Consensus', 'Data Partitioning', 'High Availability', 'Failure Recovery'],
    tags: ['Redis', 'Distributed Systems', 'Caching', 'Architecture', 'Failover'],
  },
  {
    id: 'topic-nextjs-app-architecture',
    slug: 'nextjs-app-architecture',
    title: 'Next.js 15 & React Server Components',
    tagline: 'Understand the RSC boundary, Server Actions, and Streaming SSR pipeline',
    description:
      'Deconstruct the Next.js 15 App Router execution model. Master Server Components serialization, Suspense streaming boundaries, Server Actions mutation lifecycles, and cache hierarchies.',
    category: 'Frontend Architecture',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    prerequisites: ['React Basics', 'HTTP Protocol'],
    skillsCovered: ['Next.js 15', 'RSC Architecture', 'Streaming SSR', 'Server Actions'],
    tags: ['Next.js', 'React 19', 'Full-Stack', 'SSR', 'Performance'],
  },
  {
    id: 'topic-postgres-pgvector',
    slug: 'postgres-pgvector',
    title: 'PostgreSQL pgvector & Semantic Search',
    tagline: 'High-performance vector embeddings, HNSW indexing, and hybrid retrieval',
    description:
      'Learn how to turn relational Postgres into a blazing-fast vector database. Compare HNSW graph traversal vs. IVFFlat inverted file indexes, tune cosine distance queries, and implement hybrid semantic search.',
    category: 'AI & Vector Systems',
    difficulty: 'Intermediate',
    estimatedMinutes: 16,
    prerequisites: ['SQL Fundamentals', 'Vector Math Basics'],
    skillsCovered: ['Vector Databases', 'HNSW Graph Search', 'RAG Pipelines', 'PostgreSQL'],
    tags: ['pgvector', 'PostgreSQL', 'AI/ML', 'Embeddings', 'Search'],
  },
  {
    id: 'topic-kubernetes-pod-networking',
    slug: 'kubernetes-pod-networking',
    title: 'Kubernetes Pod Networking & CNI Internals',
    tagline: 'VXLAN overlays, kube-proxy iptables vs. IPVS, and packet routing lifecycles',
    description:
      'Unravel the mystery of how packets travel between pods across worker nodes. Master CNI plugins, bridge interfaces, VXLAN encapsulation, and service virtual IP translation.',
    category: 'Cloud & DevOps',
    difficulty: 'Staff',
    estimatedMinutes: 20,
    prerequisites: ['Linux Networking', 'Docker Containers'],
    skillsCovered: ['Kubernetes', 'CNI Overlays', 'Packet Routing', 'Linux iptables'],
    tags: ['Kubernetes', 'DevOps', 'Networking', 'Infrastructure'],
  },
  {
    id: 'topic-react-19-concurrency',
    slug: 'react-19-concurrency',
    title: 'React 19 Concurrency & Fiber Reconciliation',
    tagline: 'Time-slicing, Transitions, and non-blocking asynchronous state updates',
    description:
      'Examine React 19 concurrent runtime internals. Understand lane priority queues, fiber tree work-in-progress cloning, interruptible render phases, and hydration error recovery.',
    category: 'Frontend Architecture',
    difficulty: 'Advanced',
    estimatedMinutes: 14,
    prerequisites: ['React Hooks', 'Event Loop'],
    skillsCovered: ['React 19', 'Concurrency', 'Fiber Scheduler', 'Performance'],
    tags: ['React', 'JavaScript', 'Frontend', 'Performance'],
  },
];

export const CANONICAL_COURSES: Record<string, CanonicalCourse> = {
  'redis-clustering': {
    topicSlug: 'redis-clustering',
    version: 1,
    diagnostic: {
      topicSlug: 'redis-clustering',
      title: 'Redis Distributed Topology Assessment',
      description: 'Test your grasp of sharding, heartbeats, and cluster failover mechanisms.',
      questions: [
        {
          id: 'diag-redis-1',
          conceptKey: 'hash-slots',
          type: 'code_prediction',
          question:
            'How does a Redis Cluster client determine which node holds key "user:profile:9823"?',
          codeContext: `// Client receives request for key "user:profile:9823"\nconst slot = CRC16("user:profile:9823") % 16384;`,
          options: [
            {
              id: 'opt-1',
              text: 'The client queries the master coordinator on every single request to fetch the routing table.',
              isCorrect: false,
              explanation: 'Incorrect. There is no central master coordinator in Redis Cluster; clients cache the 16,384 slot map.',
            },
            {
              id: 'opt-2',
              text: 'The client computes CRC16(key) mod 16384 and directly contacts the node assigned to that slot range.',
              isCorrect: true,
              explanation: 'Correct! Redis Cluster deterministically partitions keys across 16,384 hash slots, and clients route queries directly.',
            },
            {
              id: 'opt-3',
              text: 'Requests are round-robined across all cluster nodes which forward data internally.',
              isCorrect: false,
              explanation: 'Incorrect. While nodes can respond with -MOVED redirects, clients maintain local slot maps to avoid extra network hops.',
            },
          ],
          difficulty: 'intermediate',
        },
        {
          id: 'diag-redis-2',
          conceptKey: 'gossip-protocol',
          type: 'multiple_choice',
          question:
            'What is the difference between PFAIL (Possible Fail) and FAIL state in Redis Cluster Gossip protocol?',
          options: [
            {
              id: 'opt-2a',
              text: 'PFAIL is a local suspicion by a single node; FAIL is an authoritative cluster-wide consensus reached when a majority of masters confirm PFAIL within the gossip window.',
              isCorrect: true,
              explanation: 'Spot on. A single missed ping only sets PFAIL locally. Cluster failover is only triggered once a majority of masters confirm the node is down.',
            },
            {
              id: 'opt-2b',
              text: 'PFAIL applies only to replica nodes; FAIL applies exclusively to primary master nodes.',
              isCorrect: false,
              explanation: 'Incorrect. Both master and replica nodes can be flagged with PFAIL and FAIL states.',
            },
            {
              id: 'opt-2c',
              text: 'PFAIL means the node is out of memory; FAIL means the CPU is pegged at 100%.',
              isCorrect: false,
              explanation: 'Incorrect. PFAIL and FAIL are heartbeat connectivity states, not resource utilization metrics.',
            },
          ],
          difficulty: 'intermediate',
        },
        {
          id: 'diag-redis-3',
          conceptKey: 'sentinel-failover',
          type: 'open_explanation',
          question:
            'Explain what happens during a network partition if a Master becomes isolated from the majority of the cluster. How does Redis prevent split-brain writes?',
          expectedKeywords: ['majority', 'quorum', 'failover', 'min-replicas', 'epoch', 'split-brain'],
          difficulty: 'expert',
        },
      ],
    },
    sections: [
      {
        id: 'sec-redis-1',
        title: '1. Hash Slot Partitioning & Deterministic Sharding',
        conceptKey: 'hash-slots',
        order: 1,
        durationSeconds: 180,
        narrationScript:
          'Welcome to Redis Cluster. Unlike traditional single-instance databases, Redis partitions the entire key space into exactly 16,384 logical hash slots. Every master node in the cluster is assigned a contiguous or discrete subset of these slots. When your application issues a command for key "order:772", the Redis client driver computes CRC16 of the key modulo 16,384, determining the exact target shard in O(1) time without querying a central proxy.',
        contentMarkdown: `### The 16,384 Hash Slot Architecture

In Redis Cluster, data is not partitioned by arbitrary node count. Instead, the universe of all possible keys is mapped onto **16,384 discrete hash slots**:

$$\\text{Slot} = \\text{CRC16}(\\text{key}) \\pmod{16384}$$

#### Key Advantages:
1. **Dynamic Resharding**: Adding or removing a node simply transfers hash slots between nodes without full cluster lockup.
2. **Zero-Proxy Latency**: Smart client SDKs cache the slot-to-node routing table, sending commands directly to the shard owning that slot.
3. **Hash Tags**: Wrapping part of a key in curly braces (e.g. \`user:{104}:profile\` and \`user:{104}:orders\`) forces both keys into the same slot for atomic multi-key transactions.`,
        codeSnippets: [
          {
            language: 'typescript',
            filename: 'redis-client-routing.ts',
            code: `import { crc16 } from 'crc';

function getShardForMaster(key: string, slotRanges: { start: number; end: number; node: string }[]) {
  // Check for hash tags
  const tagMatch = key.match(/\\{([^}]+)\\}/);
  const hashKey = tagMatch ? tagMatch[1] : key;
  
  const slot = crc16(hashKey) % 16384;
  const target = slotRanges.find(r => slot >= r.start && slot <= r.end);
  
  return { slot, targetNode: target?.node };
}`,
          },
        ],
        visualSpec: {
          type: '3d_cluster_network',
          title: '3D Redis Cluster Shard Distribution',
          props: {
            nodes: [
              { id: 'node-1', label: 'Master A (Slots 0 - 5460)', role: 'primary', status: 'healthy', slots: '0 - 5460' },
              { id: 'node-2', label: 'Master B (Slots 5461 - 10922)', role: 'primary', status: 'healthy', slots: '5461 - 10922' },
              { id: 'node-3', label: 'Master C (Slots 10923 - 16383)', role: 'primary', status: 'healthy', slots: '10923 - 16383' },
              { id: 'replica-1', label: 'Replica A1', role: 'replica', status: 'healthy' },
              { id: 'replica-2', label: 'Replica B1', role: 'replica', status: 'healthy' },
              { id: 'replica-3', label: 'Replica C1', role: 'replica', status: 'healthy' },
            ],
            links: [
              { source: 'node-1', target: 'replica-1', animated: true, label: 'Async Replication' },
              { source: 'node-2', target: 'replica-2', animated: true, label: 'Async Replication' },
              { source: 'node-3', target: 'replica-3', animated: true, label: 'Async Replication' },
              { source: 'node-1', target: 'node-2', animated: false, label: 'Gossip Bus' },
              { source: 'node-2', target: 'node-3', animated: false, label: 'Gossip Bus' },
              { source: 'node-3', target: 'node-1', animated: false, label: 'Gossip Bus' },
            ],
            autoRotate: true,
          },
        },
        checkpoint: {
          id: 'cp-redis-1',
          type: 'code_prediction',
          prompt:
            'If you want keys "session:user_42" and "cart:user_42" to always reside on the exact same master shard for atomic pipeline transactions, how must you format the keys?',
          codeContext: `// Option A: "session:user_42" and "cart:user_42"\n// Option B: "{user_42}:session" and "{user_42}:cart"\n// Option C: "user_42.session" and "user_42.cart"`,
          options: [
            {
              id: 'opt-a',
              text: 'Use Hash Tags: "{user_42}:session" and "{user_42}:cart"',
              isCorrect: true,
              explanation:
                'Spot on! When Redis sees curly braces {}, it only hashes the string inside the braces ("user_42"), guaranteeing identical hash slot allocation.',
            },
            {
              id: 'opt-b',
              text: 'Use dot notation: "user_42.session" and "user_42.cart"',
              isCorrect: false,
              explanation: 'Incorrect. Dot notation is hashed in its entirety, producing different slots for different prefixes.',
            },
          ],
          difficulty: 'intermediate',
        },
      },
      {
        id: 'sec-redis-2',
        title: '2. Gossip Protocol & Distributed Failure Detection',
        conceptKey: 'gossip-protocol',
        order: 2,
        durationSeconds: 210,
        narrationScript:
          'How do Redis nodes know if another node has crashed without a centralized monitor? They use a Gossip protocol over a dedicated cluster bus port. Every second, nodes exchange randomized PING and PONG packets containing gossip sections about other known nodes in the cluster. If Node A does not receive a response from Node B within cluster-node-timeout, it flags Node B with PFAIL. If a majority of masters report PFAIL within the time window, the cluster consensus elevates the status to FAIL.',
        contentMarkdown: `### Decentralized Gossip Protocol

Redis Cluster nodes communicate over the **Cluster Bus** (typically port $10000 + \\text{data\_port}$, e.g. 16379).

#### Gossip Cycle:
1. Every node periodically pings a randomized subset of peers.
2. In each PING packet, the sender attaches gossip information regarding a fraction of other known cluster members.
3. **PFAIL (Possible Fail)**: A local node-level judgment when a peer does not respond within \`cluster-node-timeout\`.
4. **FAIL (Cluster-Wide Consensus)**: When a master receives PFAIL messages for Node $X$ from the **majority of active master nodes**, it broadcasts a \`FAIL\` packet. All nodes mark $X$ as down.`,
        codeSnippets: [
          {
            language: 'typescript',
            filename: 'gossip-packet-structure.ts',
            code: `interface GossipHeader {
  senderNodeId: string;
  currentEpoch: number;
  assignedSlotsBitmap: Uint8Array; // 2048 bytes (16384 bits)
  senderPort: number;
  flags: 'MASTER' | 'SLAVE' | 'PFAIL' | 'FAIL';
}

interface GossipSection {
  nodeId: string;
  ip: string;
  port: number;
  lastPingTime: number;
  lastPongTime: number;
  flags: string;
}`,
          },
        ],
        visualSpec: {
          type: '3d_cluster_network',
          title: 'Gossip Protocol Heartbeat Visualizer',
          props: {
            nodes: [
              { id: 'node-1', label: 'Master A (PING Sender)', role: 'primary', status: 'healthy' },
              { id: 'node-2', label: 'Master B (Gossip Witness)', role: 'primary', status: 'healthy' },
              { id: 'node-3', label: 'Master C (Unresponsive)', role: 'primary', status: 'failed' },
            ],
            links: [
              { source: 'node-1', target: 'node-2', animated: true, label: 'PONG (Ack PFAIL Node C)' },
              { source: 'node-1', target: 'node-3', animated: true, label: 'PING (Timeout / No ACK)' },
              { source: 'node-2', target: 'node-3', animated: false, label: 'PING (Timeout)' },
            ],
            autoRotate: false,
          },
        },
        checkpoint: {
          id: 'cp-redis-2',
          type: 'open_explanation',
          prompt:
            'Why does Redis require a majority of MASTER nodes to agree on a FAIL state instead of allowing a single replica to initiate immediate failover on timeout?',
          expectedKeywords: ['split-brain', 'majority', 'quorum', 'false positive', 'network partition'],
          difficulty: 'expert',
        },
      },
      {
        id: 'sec-redis-3',
        title: '3. Sentinel Quorum, Epochs & Automatic Failover',
        conceptKey: 'sentinel-failover',
        order: 3,
        durationSeconds: 240,
        narrationScript:
          'When Master C is officially marked as FAIL, its replica initiates an election. The replica increments the cluster configuration epoch and broadcasts a FAILOVER_AUTH_REQUEST packet to all master nodes. Only master nodes with voting rights cast a vote. If the replica receives a majority of votes, it promotes itself to Master, reclaims the hash slots of the failed master, and broadcasts the new topology to the entire cluster.',
        contentMarkdown: `### Election Epochs & Automatic Failover

Failover in Redis is governed by **Raft-inspired Configuration Epochs**:

1. **Election Trigger**: The replica of the failed master waits for a short random delay (proportional to its replication offset, so the most up-to-date replica votes first).
2. **Epoch Increment**: The candidate replica increments \`currentEpoch\` and requests authorization.
3. **Master Quorum**: Masters vote only once per epoch for the first valid request received.
4. **Promotion**: Once the candidate secures $\\ge \\lfloor N/2 \\rfloor + 1$ votes, it executes \`SLAVEOF NO ONE\`, assumes ownership of the slot range, and sends a cluster-wide \`PONG\` update.`,
        codeSnippets: [
          {
            language: 'bash',
            filename: 'redis-failover-logs.log',
            code: `[1240] * Marking node 8a93bf (Master C) as FAIL.
[1240] * Starting failover election for epoch 5.
[1240] > Sending FAILOVER_AUTH_REQUEST to 2 voting masters...
[1240] < Received vote from Master A (epoch 5).
[1240] < Received vote from Master B (epoch 5).
[1240] * Failover election won (2/2 votes). Promoting self to MASTER.
[1240] * Claimed hash slots 10923 - 16383. Broadcasted state update.`,
          },
        ],
        visualSpec: {
          type: '3d_cluster_network',
          title: '3D Replica Promotion & Quorum Election',
          props: {
            nodes: [
              { id: 'node-1', label: 'Master A (Voted YES)', role: 'primary', status: 'healthy' },
              { id: 'node-2', label: 'Master B (Voted YES)', role: 'primary', status: 'healthy' },
              { id: 'node-3', label: 'Old Master C (OFFLINE)', role: 'primary', status: 'failed' },
              { id: 'replica-3', label: 'Replica C1 -> PROMOTED MASTER', role: 'primary', status: 'healthy', slots: '10923 - 16383' },
            ],
            links: [
              { source: 'replica-3', target: 'node-1', animated: true, label: 'AUTH_REQUEST' },
              { source: 'replica-3', target: 'node-2', animated: true, label: 'AUTH_REQUEST' },
            ],
            autoRotate: true,
          },
        },
        checkpoint: {
          id: 'cp-redis-3',
          type: 'code_prediction',
          prompt:
            'If you have a 3-master cluster (Masters A, B, C) and a network partition isolates Master A and its replica from B and C, what happens?',
          options: [
            {
              id: 'opt-3a',
              text: 'Master A cannot see the majority of masters (1/3 < 2), so the partition with A stops accepting writes if min-replicas-to-write is enabled, while B and C continue operating normally.',
              isCorrect: true,
              explanation:
                'Correct. The minority partition cannot achieve quorum, preventing split-brain writes.',
            },
            {
              id: 'opt-3b',
              text: 'Master A promotes a new master and creates a separate split cluster automatically.',
              isCorrect: false,
              explanation: 'Incorrect. Replicas in a minority partition cannot secure majority master votes for election.',
            },
          ],
          difficulty: 'expert',
        },
      },
    ],
  },
};
