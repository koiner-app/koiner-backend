#! Development image
FROM node:lts-alpine AS development
RUN apk --no-cache add git

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY ./apps/ ./apps/
COPY ./modules/ ./modules/
COPY ./nx.json .
COPY ./tsconfig.base.json .
COPY ./workspace.json .

RUN npm run build:tokenize-graphql

#! Production image
FROM node:lts-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=development /app/dist/apps/tokenize/graphql .
ENV PORT=3004
EXPOSE ${PORT}
CMD ["node", "main"]
