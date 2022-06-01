#! Development image
FROM node:lts-alpine As development

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY ./apps/ ./apps/
COPY ./modules/ ./modules/
COPY ./nx.json .
COPY ./tsconfig.base.json .
COPY ./workspace.json .

RUN npm run build:chain-sync

#! Production image
FROM node:lts-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=development /app/dist/apps/chain-sync .
ENV PORT=3001
EXPOSE ${PORT}
CMD ["node", "main"]
