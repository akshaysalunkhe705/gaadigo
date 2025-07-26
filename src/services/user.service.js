exports.getAllUsers = async (prisma) => {
  return await prisma.user.findMany();
};

exports.getUserById = async (prisma, id) => {
  return await prisma.user.findUnique({ where: { id: parseInt(id) } });
};

exports.createUser = async (prisma, data) => {
  return await prisma.user.create({ data });
};

exports.updateUser = async (prisma, id, data) => {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data
  });
};

exports.deleteUser = async (prisma, id) => {
  return await prisma.user.delete({ where: { id: parseInt(id) } });
};
