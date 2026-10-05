import { userService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const getAll = async (req, res) => {
  const users = await userService.findAll(req.context.models);
  return res.status(200).send(users);
};

const getById = async (req, res) => {
  const user = await userService.findById(req.context.models, req.params.userId);
  if (!user) throw new AppError("Usuário não encontrado", 404);
  return res.status(200).send(user);
};

const create = async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    throw new AppError("username e email são obrigatórios", 400);
  }
  const user = await userService.createUser(req.context.models, { username, email });
  return res.status(201).send(user);
};

const update = async (req, res) => {
  if (!req.context.me || String(req.context.me.id) !== req.params.userId) {
    throw new AppError("Você só pode atualizar seu próprio usuário", 403);
  }
  const { username, email } = req.body;
  const user = await userService.updateUser(req.context.models, req.params.userId, {
    username,
    email,
  });
  if (!user) throw new AppError("Usuário não encontrado", 404);
  return res.status(200).send(user);
};

const remove = async (req, res) => {
  if (!req.context.me || String(req.context.me.id) !== req.params.userId) {
    throw new AppError("Você só pode remover seu próprio usuário", 403);
  }
  const deletedCount = await userService.deleteUser(req.context.models, req.params.userId);
  if (!deletedCount) throw new AppError("Usuário não encontrado", 404);
  return res.status(204).send();
};

export const userController = { getAll, getById, create, update, remove };