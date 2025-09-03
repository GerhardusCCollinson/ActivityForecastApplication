FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit="dev=false"

# Copy source and build
COPY . .
RUN npm run build

EXPOSE 4000

CMD ["node", "./dist/index.cjs"]


