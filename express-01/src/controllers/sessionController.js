import userService from "../services/userService.js";

const getCurrentUser = async (req, res) => {
  const user = await userService.findById(req.context.models, req.context.me.id);
  return res.send(user);
};

export default {
  getCurrentUser,
};
