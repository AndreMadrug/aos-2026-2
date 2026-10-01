import { userService } from "../services/index.js";

const getAll = async (req, res) => {
  try {
    const users = await userService.findAll(req.context.models);
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

const getById = async (req, res) => {
  try {
    const user = await userService.findById(req.context.models, req.params.userId);

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

const create = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).send({ message: "username e email são obrigatórios" });
    }

    const user = await userService.createUser(req.context.models, { username, email });

    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

const update = async (req, res) => {
  try {
    if (!req.context.me || String(req.context.me.id) !== req.params.userId) {
      return res.status(403).send({ message: "Você só pode atualizar seu próprio usuário" });
    }

    const { username, email } = req.body;

    const user = await userService.updateUser(req.context.models, req.params.userId, {
      username,
      email,
    });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

const remove = async (req, res) => {
  try {
    if (!req.context.me || String(req.context.me.id) !== req.params.userId) {
      return res.status(403).send({ message: "Você só pode remover seu próprio usuário" });
    }

    const deletedCount = await userService.deleteUser(req.context.models, req.params.userId);

    if (!deletedCount) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

export const userController = {
  getAll,
  getById,
  create,
  update,
  remove,
};
