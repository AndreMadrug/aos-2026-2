import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { sequelize } from "./models/index.js";
import { sessionRouter, userRouter, messageRouter } from "./routes/index.js";
import { logger, attachContext } from "./middlewares/index.js";
import { createUsersWithMessages } from "./utils/index.js";

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
  return res.status(200).send("Servidor express exectuando...");
});
app.use("/session", sessionRouter);
app.use("/users", userRouter);
app.use("/messages", messageRouter);

const port = process.env.PORT || 3000;

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    await createUsersWithMessages(models);
  }
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
