FROM node:lts-alpine AS BASEIMAGE

WORKDIR /src
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run prebuild && npm run build && npm prune --production

FROM node:lts-alpine

WORKDIR /src
# ENV TZ=Europe/Amsterdam
COPY --from=BASEIMAGE /src/dist /src/dist
COPY --from=BASEIMAGE /src/node_modules /src/node_modules
EXPOSE 3000

CMD ["node", "dist/src/main.js"]
