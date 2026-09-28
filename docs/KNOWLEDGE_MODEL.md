# USER KNOWLEDGE MODEL & MASTERY CALCULATION

## 1. Mastery Formula
Mastery for a given topic and concept is computed as a weighted composite:

$$\text{Mastery}(T, C) = w_d \cdot S_{\text{diagnostic}} + w_c \cdot S_{\text{checkpoints}} + w_e \cdot S_{\text{explanation}} + w_p \cdot S_{\text{practical}}$$

Where:
- $w_d = 0.25$ (Diagnostic Weight)
- $w_c = 0.35$ (Interactive Checkpoint Accuracy)
- $w_e = 0.30$ (Open-ended Conceptual Explanation Depth Score)
- $w_p = 0.10$ (Code Exercise / Bug Fix Performance)

## 2. Confidence Metrics
- **High**: $\ge 3$ distinct evidence events recorded with consistency score $> 85\%$.
- **Medium**: $1 - 2$ evidence events recorded with score $> 70\%$.
- **Low**: Incomplete assessment or conflicting results (e.g. self-assessed expert but failed basic diagnostic).

## 3. Explainable Evidence Ledger
Every mastery score displays its underlying evidence:
```json
{
  "topic": "Redis Clustering",
  "mastery": 82,
  "confidence": "High",
  "strongConcepts": ["Hash Slot Partitioning", "Gossip Protocol", "Sentinel Failover"],
  "weakConcepts": ["Cross-slot MGET Transactions", "Split-brain resolution"],
  "evidence": [
    { "type": "DIAGNOSTIC", "score": 75, "date": "2026-09-28T23:00:00Z" },
    { "type": "CHECKPOINT_PASS", "concept": "Sentinel Failover", "score": 90, "date": "2026-09-28T23:15:00Z" },
    { "type": "EXPLANATION_EVAL", "concept": "Gossip Protocol", "score": 85, "date": "2026-09-28T23:22:00Z" }
  ]
}
```
