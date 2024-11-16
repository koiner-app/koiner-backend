# Base image for both development and production
FROM node:lts-alpine AS base

# Set the working directory
WORKDIR /app

# Copy package.json and install global dependencies
COPY package*.json ./
RUN npm i -g nx@latest

# Install all dependencies
RUN npm i

# Development stage
FROM base AS development

# Copy necessary files for the build
COPY ./apps ./apps
COPY ./modules/ ./modules/
COPY ./nx.json .
COPY ./tsconfig.base.json .
COPY ./workspace.json .

# Build the project
RUN nx build contracts-sync --skip-nx-cache

# Production stage
FROM base AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Copy necessary files for the build
COPY package*.json ./
COPY --from=development /app/dist/apps/contracts/sync ./

# Install production dependencies only
RUN npm ci --omit=dev

# Expose the port
ENV PORT=3102
EXPOSE ${PORT}

# Run the application
CMD ["node", "main"]
