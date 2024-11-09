import path from 'node:path';
import { fileURLToPath } from 'url';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import formBody from '@fastify/formbody'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
    logger: true
})

fastify.register(formBody)
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public')
})

fastify.get('/', function (req, reply) {
    reply.sendFile('index.html');
  })

fastify.post('/clicked', async function handler(request, reply) {
    return `
    <div>
        <p>Hello world!</p>
        <button 
            name="my-button"
            value="some-value"
            hx-get="/clicked"
        >
            Click me!
        </button>
        </div>
    `;
});

fastify.get('/clicked', async function handler(request, reply) {
    return `<span>no more swaps</span>`;
})

try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
