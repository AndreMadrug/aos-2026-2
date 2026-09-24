import messageService from "../services/messageService.js";

const getAll = async (req, res) => {
  const messages = await messageService.findAll(req.context.models);
  return res.send(messages);
};

const getById = async (req, res) => {
  const message = await messageService.findById(
    req.context.models,
    req.params.messageId,
  );
  return res.send(message);
};

const create = async (req, res) => {
  const message = await messageService.create(req.context.models, {
    text: req.body.text,
    userId: req.context.me.id,
  });
  return res.send(message);
};

const remove = async (req, res) => {
  await messageService.remove(req.context.models, req.params.messageId);
  return res.send(true);
};

export default {
  getAll,
  getById,
  create,
  remove,
};
