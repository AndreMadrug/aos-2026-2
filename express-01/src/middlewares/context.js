import models from "../models/index.js";

const attachContext = async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("rwieruch"),
  };
  next();
};

export default attachContext;
