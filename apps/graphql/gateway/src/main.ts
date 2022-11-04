import { createBuiltMeshHTTPHandler, getBuiltMesh } from './mesh/.mesh';
import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';

const fastify: FastifyInstance = Fastify({});
fastify.register(cors, () => {
  return (req, callback) => {
    const corsOptions = {
      origin: process.env.CORS_ORIGIN
        ? JSON.parse(process.env.CORS_ORIGIN)
        : true,
      credentials: true,
    };

    // Do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false;
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions);
  };
});

const meshHttp = createBuiltMeshHTTPHandler();

let readyFlag = false;
getBuiltMesh().then(() => {
  readyFlag = true;
});

fastify.get('/healthcheck', async (request, reply) => {
  reply.status(readyFlag ? 204 : 503);
  return reply;
});

fastify.get('/readiness', async (request, reply) => {
  reply.status(readyFlag ? 204 : 503);
  return reply;
});

fastify.route({
  url: '/graphql',
  method: ['GET', 'POST', 'OPTIONS'],
  async handler(req, reply) {
    // Second parameter adds Fastify's `req` and `reply` to the GraphQL Context
    const response = await meshHttp.handleNodeRequest(req, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const host = process.env.HOST || '0.0.0.0';

fastify.listen({ port, host }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 GraphQL Gateway is running on: ${address}:${port}`);
});
