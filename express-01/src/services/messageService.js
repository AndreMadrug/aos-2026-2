const findAll = async (models) => {
  return models.Message.findAll();
};

const findById = async (models, messageId) => {
  return models.Message.findByPk(messageId);
};

const create = async (models, { text, userId }) => {
  return models.Message.create({ text, userId });
};

const updateMessage = async (models, messageId, { text }) => {
  const message = await models.Message.findByPk(messageId);

  if (!message) {
    return null;
  }

  return message.update({ text });
};

const remove = async (models, messageId) => {
  return models.Message.destroy({ where: { id: messageId } });
};

export const messageService = {
  findAll,
  findById,
  create,
  updateMessage,
  remove,
};
