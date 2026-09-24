import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { sequelize } from "./models/index.js";
import routes from "./routes/index.js";
import logger from "./middlewares/logger.js";
import attachContext from "./middlewares/context.js";
import createUsersWithMessages from "./utils/seed.js";

const app = express();

app.set("trust proxy", true);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(attachContext);

// rotas
app.get("/", (req, res) => {
  return res.send("Servidor express exectuando...");
});
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

const port = process.env.PORT || 3000;

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    await createUsersWithMessages(models);
  }
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
