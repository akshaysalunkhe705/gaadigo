const userService = require('../services/user.service');

exports.getAll = async (req, reply) => {
  const users = await userService.getAllUsers(req.server.prisma);
  return reply.send(users);
};

exports.getById = async (req, reply) => {
  const user = await userService.getUserById(req.server.prisma, req.params.id);
  return reply.send(user);
};

exports.create = async (req, reply) => {
  const newUser = await userService.createUser(req.server.prisma, req.body);
  return reply.code(201).send(newUser);
};

exports.update = async (req, reply) => {
  const updatedUser = await userService.updateUser(
    req.server.prisma,
    req.params.id,
    req.body
  );
  return reply.send(updatedUser);
};

exports.remove = async (req, reply) => {
  await userService.deleteUser(req.server.prisma, req.params.id);
  return reply.code(204).send();
};
