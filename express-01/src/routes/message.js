import { Router } from "express";
import messageController from "../controllers/messageController.js";

const router = Router();

router.get("/", messageController.getAll);
router.get("/:messageId", messageController.getById);
router.post("/", messageController.create);
router.delete("/:messageId", messageController.remove);

export default router;
