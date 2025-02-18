#! Local development image
FROM node:lts-alpine AS local

RUN apk --no-cache add git

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY ./apps/ ./apps/
COPY ./modules/ ./modules/
COPY ./nx.json .
COPY ./tsconfig.base.json .
COPY ./workspace.json .

#! Development image
FROM node:lts-alpine AS development

WORKDIR /app

ARG MESH_HOSTNAME
ENV MESH_HOSTNAME=${MESH_HOSTNAME}

ARG CHAIN_GRAPHQL_URL
ENV CHAIN_GRAPHQL_URL=${CHAIN_GRAPHQL_URL}

ARG CONTRACTS_GRAPHQL_URL
ENV CONTRACTS_GRAPHQL_URL=${CONTRACTS_GRAPHQL_URL}

ARG NETWORK_GRAPHQL_URL
ENV NETWORK_GRAPHQL_URL=${NETWORK_GRAPHQL_URL}

ARG TOKENIZE_GRAPHQL_URL
ENV TOKENIZE_GRAPHQL_URL=${TOKENIZE_GRAPHQL_URL}

COPY --from=local /app .

# For local development it is required to start build after rapp-graphql has started.
# Use docker-compose command for this.
RUN npm run build:graphql-gateway

#! Production image
FROM node:lts-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=development /app/dist/apps/graphql/gateway .
ENV PORT=3000
EXPOSE ${PORT}
CMD ["node", "main"]
