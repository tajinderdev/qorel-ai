# USER JOURNEYS & INTERACTION FLOWS

## Journey 1: First-Time Learner Explores a New Technology (e.g., Redis Clustering)
1. **Discovery & Onboarding**:
   - Learner opens Qorel AI, lands on an aesthetic dark-mode terminal/hub interface.
   - Learner authenticates or uses seamless instant demo profile.
2. **Topic Search**:
   - Learner searches for `"Redis Clustering and Sentinel"`.
3. **Adaptive Diagnostic**:
   - System displays 3-4 diagnostic challenge questions (Code prediction, architecture choice, open explanation).
   - Learner answers questions; system evaluates responses in real-time.
   - System identifies: Learner knows basic key-value caching (100%), but is weak on hash slots, master-replica failover, and split-brain resolution (20%).
4. **Personalized Learning Path Generation**:
   - System checks Course Warehouse for canonical Redis topic graph.
   - Filters out basic Redis string commands; highlights `Hash Slot Partitioning`, `Gossip Protocol`, and `Sentinel Quorum`.
5. **Interactive Lesson & Visuals**:
   - Step 1: Procedural 3D Network/Cluster visualizer renders 6 nodes with live hash slot ranges and animated ping-pong gossip packets.
   - Voice narration synchronizes with visual focus on cluster shards.
   - Learner rotates, zooms 3D cluster, and triggers a simulated node failure.
6. **Active Checkpoint & AI Evaluation**:
   - AI Tutor pauses: *"What happens if Node 3 goes down and its replica fails to reach a quorum of Sentinels?"*
   - Learner types open-ended explanation or selects architecture fix.
   - AI evaluates semantic correctness, provides immediate nuanced feedback, and updates mastery.
7. **Completion & Memory Persistence**:
   - Concept marked as mastered; Knowledge Profile updated with evidence log.
   - System presents target role roadmap impact (e.g., *Distributed Systems Engineer: +14% progress*).

## Journey 2: Returning Learner Explores Related Topic (Memory Verification)
1. Learner returns and searches for `"Redis Clustering"` or `"Distributed Caching"`.
2. System immediately recognizes existing mastery (78% mastery, strong in hash slots, weak in persistence tradeoffs).
3. Skips introductory diagnostic; jumps straight into advanced topics (RDB vs. AOF replication under high write load).

## Journey 3: Course Feedback & Improvement
1. Learner spots an ambiguity in a code sample or explanation.
2. Learner clicks "Submit Feedback / Report Issue".
3. System records issue, classifies severity, and queues it in the feedback verification pipeline.
