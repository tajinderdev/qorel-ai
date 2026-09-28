# COURSE WAREHOUSE & DYNAMIC PATH PERSONALIZATION

## 1. Concept Architecture
```text
Canonical Topic Warehouse (Pre-built + Verified or Auto-generated)
                     │
                     ▼
        Learner Knowledge Profile
      (Known Concepts vs. Weak Areas)
                     │
                     ▼
         Dynamic Path Pruning
      (Eliminate Known Modules >75%)
                     │
                     ▼
        Personalized Learning Path
  (Focus 100% on Missing & Weak Concepts)
```

## 2. Topic Catalog (MVP Canonical Topics)
1. **Next.js 15 App Architecture**: Server Actions, React 19 RSC boundaries, Streaming SSR, Parallel & Intercepting Routes.
2. **Redis Clustering & High Availability**: 16,384 Hash Slots, Gossip Protocol, Sentinel Quorum Failover, Replication lag & Split-brain scenarios.
3. **PostgreSQL pgvector & Semantic Search**: HNSW vs. IVFFlat indexes, cosine distance, query latency tuning, hybrid lexical+vector retrieval.
4. **Kubernetes Pod Networking & CNI**: Overlay networks (VXLAN), kube-proxy iptables vs. IPVS, ClusterIP/NodePort routing.
5. **React 19 Concurrency & State Mechanics**: Fiber reconciliation, `useActionState`, Transitions, Suspense hydration waterfalls.

## 3. Dynamic Path Personalization Rules
- If Learner scores $>80\%$ on diagnostic questions for Concept $A$: Concept $A$ is marked as `SKIPPED (Already Mastered)` and collapsed into an optional review badge.
- If Learner scores $<60\%$ on Concept $B$: Concept $B$ is placed at the top of the queue with priority visual interactive modules.
