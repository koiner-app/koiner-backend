import { createBuiltMeshHTTPHandler, getBuiltMesh } from './mesh/.mesh';
import Fastify, { FastifyInstance } from 'fastify';

const server: FastifyInstance = Fastify({});
const meshHttp = createBuiltMeshHTTPHandler();

let readyFlag = false;
getBuiltMesh().then(() => {
  readyFlag = true;
});

server.get('/healthcheck', async (request, reply) => {
  reply.status(readyFlag ? 204 : 503);
  return reply;
});

server.get('/readiness', async (request, reply) => {
  reply.status(readyFlag ? 204 : 503);
  return reply;
});

server.route({
  url: '/graphql',
  method: ['GET', 'POST', 'OPTIONS'],
  async handler(req, reply) {
    // Second parameter adds Fastify's `req` and `reply` to the GraphQL Context
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const response = await meshHttp.handleNodeRequest(req, { req, reply });

    response.headers.forEach((value, key) => {
      reply.header(key, value);
    });

    reply.status(response.status);

    reply.send(response.body);

    return reply;
  },
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const host = process.env.HOST || '0.0.0.0';

server.listen({ port, host }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 GraphQL Gateway is running on: ${address}:${port}`);
});
