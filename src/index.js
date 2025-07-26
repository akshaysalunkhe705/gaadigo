require('dotenv').config();
const Fastify = require('fastify');
const prismaPlugin = require('./plugins/prisma');
const userRoutes = require('./routes/user.route');

const build = async () => {
  const fastify = Fastify({ logger: true });

  // Register plugins
  fastify.register(prismaPlugin);
  fastify.register(userRoutes);

  return fastify;
};

build().then((app) => {
  app.listen({ port: 3000 }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`Server running at ${address}`);
  });
});
