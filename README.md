# CDE Transformer

## Overview
Aggregates file metadata from multiple construction CDEs (BIM 360, Procore, Viewpoint, Trimble, Accnoex) into a unified REST API.

## Architecture
- **Provider Interface:** Each CDE implements `ICDEProvider` with `fetchFiles()`.
- **Transformation Layer:** Maps native fields to a common schema, handles pagination, rate-limits (exponential backoff), and token expiry (simulated in stubs).
- **Aggregation:** Concurrently fetches from all providers, deduplicates (projectId+name), keeps newest version, sorts by `updatedAt`.
- **API:** Single endpoint `/v1/files` with query params for providers and project.
- **Config:** All secrets via `.env` (see `.env.example`).
- **Testing:** Jest unit tests for mappers and deduplication, e2e test for API, ≥80% coverage goal.
- **Performance:** Script demonstrates aggregation of 500 records in <200ms.
- **Docs:** OpenAPI 3 spec at `/api-docs`.

## Trade-offs
- Stubs are used for all but two providers due to lack of real credentials.
- Uses CommonJS for compatibility and simplicity.
- Focuses on code structure and testability over real API integration.

## How to Run
1. `npm install`
2. Copy `.env.example` to `.env` and fill in secrets.
3. `npm start` to run the service.
4. `npm test` to run tests.
5. `node scripts/perfTest.ts` to check performance.
6. Visit `/api-docs` for Swagger UI.

## API Example
`GET /v1/files?providers=bim360,procore&project=123`

## References
- [Autodesk BIM 360 API](https://aps.autodesk.com/en/docs/bim360/v1/overview/)
- [Procore API](https://developers.procore.com/documentation/introduction)
- [Viewpoint API](https://viewpoint.com)
- [Trimble Connect API](https://connect.trimble.com)
- [Accnoex API](https://accnoex.com)
