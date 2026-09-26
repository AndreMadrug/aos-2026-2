const findAll = async (models) => {
  return models.User.findAll();
};

const findById = async (models, userId) => {
  return models.User.findByPk(userId);
};

export const userService = {
  findAll,
  findById,
};
