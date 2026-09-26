import models from "../models/index.js";

export const attachContext = async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("rwieruch"),
  };
  next();
};
