import { Router } from "express";
import { createTask, getTasks } from "../controllers/task.controller.js";
import { isUserRegistered } from "../middlewares/isRegistered.middleware.js";

const router = Router();

router.post("/createTask", isUserRegistered, createTask);
router.get("/getTasks", isUserRegistered, getTasks);

export default router;
