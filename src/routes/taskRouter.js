import express from "express";
import { createTask, getAllTasks, getTaskById } from "../controllers/taskController.js";

const router = express.Router();

// Define the endpoints and map them to their controller logic
router.get("/", getAllTasks);
router.get("/:id", getTaskById); // The ':id' denotes a dynamic URL parameter
router.post("/", createTask)

export default router;
