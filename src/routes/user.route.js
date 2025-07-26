const userController = require('../controllers/user.controller');

async function userRoutes(fastify, options) {
  fastify.get('/users', userController.getAll);
  fastify.get('/users/:id', userController.getById);
  fastify.post('/users', userController.create);
  fastify.put('/users/:id', userController.update);
  fastify.delete('/users/:id', userController.remove);
}

module.exports = userRoutes;
