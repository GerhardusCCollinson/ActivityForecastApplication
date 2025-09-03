# Backend – Apollo GraphQL API

## Overview
Apollo Server exposes two queries backed by Open‑Meteo data:
- cityDetails(cityName: String!): [CityDetails]
- activityForecast(activityForecastInput: { longitude: Float!, latitude: Float! }): ActivityForecast

## Key Decisions

### Technical
- Service layer: Weather, marine, and activity computation are separated into their own classes for readability and future extension.
- Strong typing: GraphQL typedefs paired with internal/external TS types ensure safe mapping and clear boundaries.
- Derived types: The types are dynamically created from a base constant array. This allows all types to update dynamically if another array field is added.
- Testing: There are a couple of tests, mainly to ensure the data contracts with the API's are correct.
- Build: esbuild bundles to dist/index.cjs; single start script.
- Minimal dependencies: Only `@apollo-server`, `graphql` and `graphql-request` as runtime dependencies.

## Scripts
- npm run build – bundle TypeScript
- npm run start – build then run Node server on port 4000
- npm test – unit tests for services
