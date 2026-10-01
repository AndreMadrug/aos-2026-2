const findAll = async (models) => {
  return models.User.findAll();
};

const findById = async (models, userId) => {
  return models.User.findByPk(userId);
};

const createUser = async (models, { username, email }) => {
  return models.User.create({ username, email });
};

const updateUser = async (models, userId, { username, email }) => {
  const user = await models.User.findByPk(userId);

  if (!user) {
    return null;
  }

  const updates = {};
  if (username !== undefined) updates.username = username;
  if (email !== undefined) updates.email = email;

  return user.update(updates);
};

const deleteUser = async (models, userId) => {
  return models.User.destroy({ where: { id: userId } });
};

export const userService = {
  findAll,
  findById,
  createUser,
  updateUser,
  deleteUser,
};
