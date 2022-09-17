#! Development image
FROM node:lts-alpine as development

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY ./apps/ ./apps/
COPY ./modules/ ./modules/
COPY ./nx.json .
COPY ./tsconfig.base.json .
COPY ./workspace.json .

##! Production image
#FROM node:lts-alpine as production
FROM node:lts-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG HOSTNAME
ENV HOSTNAME=${HOSTNAME}

ARG CHAIN_GRAPHQL_URL
ENV CHAIN_GRAPHQL_URL=${CHAIN_GRAPHQL_URL}

ARG CONTRACTS_GRAPHQL_URL
ENV CONTRACTS_GRAPHQL_URL=${CONTRACTS_GRAPHQL_URL}

WORKDIR /app

COPY ./apps/graphql/gateway/package*.json .

RUN npm install

COPY ./apps/graphql/gateway/mesh ./mesh
COPY ./apps/graphql/gateway/main.ts .
COPY ./apps/graphql/gateway/tsconfig.json .

RUN npm run build:mesh \
    && npm run build:fastify
#    && npm prune --production \

ENV PORT=3000
EXPOSE ${PORT}

CMD ["npm", "run", "fastify"]
