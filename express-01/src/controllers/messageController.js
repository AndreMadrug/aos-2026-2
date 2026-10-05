import { messageService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const getAll = async (req, res) => {
  const messages = await messageService.findAll(req.context.models);
  return res.status(200).send(messages);
};

const getById = async (req, res) => {
  const message = await messageService.findById(req.context.models, req.params.messageId);
  if (!message) throw new AppError("Mensagem não encontrada", 404);
  return res.status(200).send(message);
};

const create = async (req, res) => {
  if (!req.context.me) throw new AppError("Usuário não autenticado", 401);
  if (!req.body.text) throw new AppError("O campo text é obrigatório", 400);

  const message = await messageService.create(req.context.models, {
    text: req.body.text,
    userId: req.context.me.id,
  });
  return res.status(201).send(message);
};

const updateMessage = async (req, res) => {
  const message = await messageService.findById(req.context.models, req.params.messageId);
  if (!message) throw new AppError("Mensagem não encontrada", 404);

  if (!req.context.me || message.userId !== req.context.me.id) {
    throw new AppError("Você só pode atualizar suas próprias mensagens", 403);
  }
  if (!req.body.text) throw new AppError("O campo text é obrigatório", 400);

  const updated = await messageService.updateMessage(req.context.models, req.params.messageId, {
    text: req.body.text,
  });
  return res.status(200).send(updated);
};

const remove = async (req, res) => {
  const message = await messageService.findById(req.context.models, req.params.messageId);
  if (!message) throw new AppError("Mensagem não encontrada", 404);

  if (!req.context.me || message.userId !== req.context.me.id) {
    throw new AppError("Você só pode remover suas próprias mensagens", 403);
  }

  await messageService.remove(req.context.models, req.params.messageId);
  return res.status(204).send();
};

export const messageController = { getAll, getById, create, updateMessage, remove };