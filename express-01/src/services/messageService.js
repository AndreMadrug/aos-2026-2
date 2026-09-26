const findAll = async (models) => {
  return models.Message.findAll();
};

const findById = async (models, messageId) => {
  return models.Message.findByPk(messageId);
};

const create = async (models, { text, userId }) => {
  return models.Message.create({ text, userId });
};

const remove = async (models, messageId) => {
  return models.Message.destroy({ where: { id: messageId } });
};

export const messageService = {
  findAll,
  findById,
  create,
  remove,
};
