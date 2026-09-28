# ASSUMPTIONS & DESIGN CONSTRAINTS

1. **Environment Independence**: The application must run completely and pass all unit/E2E tests out of the box without requiring external third-party API credentials, utilizing deterministic mock providers while supporting live API keys.
2. **Procedural 3D Visuals**: Rather than attempting unstable generative 3D meshes, 3D scenes use curated procedural React Three Fiber component engines bound to structured lesson visual specifications.
3. **Database Flexibility**: Prisma ORM schema is configured to target PostgreSQL with pgvector for production deployment, while maintaining seamless local development execution.
4. **Autonomous Execution Safety**: All code changes maintain documentation integrity, strict TypeScript compilation, and comprehensive unit + E2E verification.
