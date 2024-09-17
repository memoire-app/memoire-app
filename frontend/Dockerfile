# frontend/Dockerfile

# Stage 1: Build the Nuxt.js app
FROM node:20.12.2-alpine3.18 AS builder

WORKDIR /app

# Copy frontend source code
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY ./ ./

# Build the Nuxt.js app for production
RUN npm run build

# Stage 2: Serve the Nuxt.js app
FROM node:20.12.2-alpine3.18

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app ./

# Install only production dependencies
RUN npm install

# Expose the port where Nuxt will be served
EXPOSE 3000

# Start the Nuxt.js app
ENTRYPOINT ["node", ".output/server/index.mjs"]