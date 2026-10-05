import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { sequelize } from "./models/index.js";
import { sessionRouter, userRouter, messageRouter } from "./routes/index.js";
import { logger, attachContext } from "./middlewares/index.js";
import { createUsersWithMessages, AppError } from "./utils/index.js";

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

// rota inexistente -> cai no middleware de erro
app.use((req, res, next) => {
  next(new AppError(`Rota ${req.originalUrl} não encontrada`, 404));
});

// middleware global de erro (4 parâmetros)
app.use((err, req, res, next) => {
  let statusCode = 500;
  let message = "Algo deu errado no servidor";

  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 409;
    const field = err.errors?.[0]?.path;
    message = field
      ? `Já existe um registro com este valor de ${field}`
      : "Registro duplicado";
  } else if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    // erro inesperado: loga no servidor, nunca expõe ao cliente
    console.error("ERRO NÃO TRATADO:", err);
  }

  const response = {
    status: String(statusCode).startsWith("4") ? "fail" : "error",
    message,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
});

const port = process.env.PORT || 3000;

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    await createUsersWithMessages(models);
  }
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});