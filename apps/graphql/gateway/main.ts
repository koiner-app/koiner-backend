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
    const response = await meshHttp.handleNodeRequest(req, {
      req,
      reply,
    });

    response.headers.forEach((value, key) => {
      reply.header(key, value);
    });

    reply.status(response.status);

    reply.send(response.body);

    return reply;
  },
});

server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
