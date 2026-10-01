import { Router } from "express";
import { messageController } from "../controllers/index.js";

const router = Router();

router.get("/", messageController.getAll);
router.get("/:messageId", messageController.getById);
router.post("/", messageController.create);
router.put("/:messageId", messageController.updateMessage);
router.delete("/:messageId", messageController.remove);

export const messageRouter = router;
