import { messageService } from "../services/index.js";

const getAll = async (req, res) => {
  try {
    const messages = await messageService.findAll(req.context.models);
    return res.status(200).send(messages);
  } catch (error) {
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

const getById = async (req, res) => {
  try {
    const message = await messageService.findById(req.context.models, req.params.messageId);

    if (!message) {
      return res.status(404).send({ message: "Mensagem não encontrada" });
    }

    return res.status(200).send(message);
  } catch (error) {
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

const create = async (req, res) => {
  try {
    if (!req.context.me) {
      return res.status(401).send({ message: "Usuário não autenticado" });
    }

    if (!req.body.text) {
      return res.status(400).send({ message: "O campo text é obrigatório" });
    }

    const message = await messageService.create(req.context.models, {
      text: req.body.text,
      userId: req.context.me.id,
    });

    return res.status(201).send(message);
  } catch (error) {
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

const updateMessage = async (req, res) => {
  try {
    const message = await messageService.findById(req.context.models, req.params.messageId);

    if (!message) {
      return res.status(404).send({ message: "Mensagem não encontrada" });
    }

    if (!req.context.me || message.userId !== req.context.me.id) {
      return res.status(403).send({ message: "Você só pode atualizar suas próprias mensagens" });
    }

    if (!req.body.text) {
      return res.status(400).send({ message: "O campo text é obrigatório" });
    }

    const updatedMessage = await messageService.updateMessage(req.context.models, req.params.messageId, {
      text: req.body.text,
    });

    return res.status(200).send(updatedMessage);
  } catch (error) {
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

const remove = async (req, res) => {
  try {
    const message = await messageService.findById(req.context.models, req.params.messageId);

    if (!message) {
      return res.status(404).send({ message: "Mensagem não encontrada" });
    }

    if (!req.context.me || message.userId !== req.context.me.id) {
      return res.status(403).send({ message: "Você só pode remover suas próprias mensagens" });
    }

    await messageService.remove(req.context.models, req.params.messageId);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

export const messageController = {
  getAll,
  getById,
  create,
  updateMessage,
  remove,
};
