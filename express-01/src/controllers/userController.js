import userService from "../services/userService.js";

const getAll = async (req, res) => {
  const users = await userService.findAll(req.context.models);
  return res.send(users);
};

const getById = async (req, res) => {
  const user = await userService.findById(req.context.models, req.params.userId);
  return res.send(user);
};

const create = (req, res) => {
  return res.send("POST HTTP method on user resource");
};

const update = (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
};

const remove = (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
