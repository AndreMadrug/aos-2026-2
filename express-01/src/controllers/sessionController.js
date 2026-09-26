import { userService } from "../services/index.js";

const getCurrentUser = async (req, res) => {
  try {
    if (!req.context.me) {
      return res.status(401).send({ message: "Usuário não autenticado" });
    }

    const user = await userService.findById(req.context.models, req.context.me.id);

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

export const sessionController = {
  getCurrentUser,
};
