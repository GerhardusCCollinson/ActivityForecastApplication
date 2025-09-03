# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve built assets with a simple Node HTTP server (vite preview)
FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=build /app /app
EXPOSE 4001
ENV PORT=4001
ENV NODE_ENV=production
ENV VITE_GRAPHQL_HTTP=https://activityforecastapi.gerharduscronje.co.za
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4001"]
