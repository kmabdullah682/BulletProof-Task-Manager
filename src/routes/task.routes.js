import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";
import { isUserRegistered } from "../middlewares/isRegistered.middleware.js";

const router = Router();

router.post("/createTask", isUserRegistered, createTask);
router.get("/getTasks", isUserRegistered, getTasks);
router.patch("/updateTask/:id", isUserRegistered, updateTask);
router.delete("/deleteTask/:id", isUserRegistered, deleteTask);

export default router;
