import { Router } from "express";
import { createTask } from "../controllers/task.controller.js";
import { isUserRegistered } from "../middlewares/isRegistered.middleware.js";

const router = Router();

router.post("/createTask", isUserRegistered, createTask);

export default router;
