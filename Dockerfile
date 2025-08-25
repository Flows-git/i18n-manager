# # Build Stage
# FROM node:22-alpine AS build
# WORKDIR /app

# # Enable corepack for modern package managers (optional, but recommended)
# RUN corepack enable

# # Copy package files and install dependencies
# COPY package.json bun.lockb ./
# RUN bun i

# # Copy the rest of your project files
# COPY . ./

# # Build the Nuxt app
# RUN bun run build

# # Production Stage
# FROM node:22-alpine
# WORKDIR /app

# # Only copy the .output folder from the build stage
# COPY --from=build /app/.output/ ./

# # Set environment variables for host and port
# ENV PORT=3000
# ENV HOST=0.0.0.0

# EXPOSE 3000

# # Start the Nuxt server
# CMD ["node", "/app/server/index.mjs"]

# Use the official Bun image
# See all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lockb ./
# Use --ignore-scripts to avoid building native node modules during install
RUN bun install --frozen-lockfile --ignore-scripts

# Copy the rest of your project files
COPY . .

# Build the Nuxt app
RUN bun --bun run build

# Production stage
FROM oven/bun:1 AS production
WORKDIR /app

# Only copy the .output folder from the build stage
COPY --from=build /app/.output /app

# Expose the default Nuxt port
EXPOSE 3000/tcp

# Start the Nuxt server
ENTRYPOINT [ "bun", "--bun", "run", "/app/server/index.mjs" ]