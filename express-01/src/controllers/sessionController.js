import { userService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const getCurrentUser = async (req, res) => {
  if (!req.context.me) throw new AppError("Usuário não autenticado", 401);

  const user = await userService.findById(req.context.models, req.context.me.id);
  if (!user) throw new AppError("Usuário não encontrado", 404);

  return res.status(200).send(user);
};

export const sessionController = { getCurrentUser };