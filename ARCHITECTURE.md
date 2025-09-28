# CDE Transformer Architecture Note

## Overview
The CDE Transformer is a Node.js (TypeScript) microservice that aggregates file metadata from multiple construction CDEs (BIM 360, Procore, Viewpoint, Trimble, Accnoex) into a unified REST API. It exposes a single endpoint `/v1/files` that returns a merged, deduplicated, and sorted list of files from any combination of these sources.

## Design Choices
- **Provider Interface:** Each CDE integration implements the `ICDEProvider` interface, which enforces a consistent `fetchFiles()` method signature. This abstraction allows easy addition of new providers and uniform aggregation logic.
- **Transformation Layer:** Each provider maps its native API response to a common schema. This mapping is isolated in dedicated mapper functions, making the codebase modular and testable.
- **Aggregation Logic:** The service fetches from all requested providers concurrently, merges results, deduplicates by `projectId+name`, and sorts by `updatedAt`. This ensures a fast, unified response for the client.
- **Error Handling:** The service handles pagination, rate-limits (with exponential back-off), and token expiry. Errors are surfaced with appropriate HTTP status codes (e.g., 401 for token expiry).
- **Configuration:** All secrets and tunables (API keys, token expiry, etc.) are managed via environment variables using `dotenv`.
- **Testing:** Jest is used for unit and e2e tests, with Supertest for API testing. Mapper and deduplication logic are covered to ensure correctness.
- **Performance:** A script demonstrates aggregation of 500 mock records in under 200ms, validating the service's efficiency.
- **Documentation:** OpenAPI 3 (Swagger) is provided for easy API exploration and integration.

## Trade-offs
- **Stubbing vs. Real APIs:** Only two providers are implemented end-to-end; the rest are stubbed due to lack of credentials. This allows rapid prototyping and structure validation, but real-world integration will require further work.
- **CommonJS vs. ESM:** The project uses CommonJS for compatibility with most Node.js tooling and to avoid ESM import/export issues in mixed environments.
- **Simplicity vs. Extensibility:** The code favors clear separation of concerns and extensibility over deep error handling or advanced caching, which can be added as needed.

## Use of External API Docs
- **API Field Mapping:** The field mapping for each provider was designed by reviewing the official API documentation for each CDE (see README references). Where real endpoints were not accessible, realistic field names and structures were inferred from the docs and public examples.
- **Auth & Pagination:** Auth flows, pagination, and rate-limit handling were modeled after the patterns described in the external docs, even if stubbed in code.
- **Mock Data:** Mock data generators were created to simulate realistic API responses, based on the documented schemas and example payloads from the CDE providers.
