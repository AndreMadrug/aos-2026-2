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

const create = (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).send({ message: "username e email são obrigatórios" });
  }

  return res.status(201).send("POST HTTP method on user resource");
};

const update = (req, res) => {
  if (!req.context.me || String(req.context.me.id) !== req.params.userId) {
    return res.status(403).send({ message: "Você só pode atualizar seu próprio usuário" });
  }

  return res.status(200).send(`PUT HTTP method on user/${req.params.userId} resource`);
};

const remove = (req, res) => {
  if (!req.context.me || String(req.context.me.id) !== req.params.userId) {
    return res.status(403).send({ message: "Você só pode remover seu próprio usuário" });
  }

  return res.status(204).send();
};

export const userController = {
  getAll,
  getById,
  create,
  update,
  remove,
};
