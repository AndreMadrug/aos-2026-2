import { Router } from "express";
import sessionController from "../controllers/sessionController.js";

const router = Router();

router.get("/", sessionController.getCurrentUser);

export default router;
