FROM node:lts-alpine AS BASEIMAGE

COPY . /app
WORKDIR /app
RUN npm ci
RUN npm run prebuild && npm run build && npm prune --production

FROM node:lts-alpine

WORKDIR /app
# ENV TZ=Europe/Amsterdam
COPY --from=BASEIMAGE /app/dist /app/dist
COPY --from=BASEIMAGE /app/node_modules /app/node_modules
EXPOSE 3000

CMD ["node", "dist/src/main.js"]
