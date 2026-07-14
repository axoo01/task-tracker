import express from "express";
import taskRouter from './routes/taskRouter.js'
import { requestLogger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();


app.use(express.json());
app.use(requestLogger);

app.use("/tasks", taskRouter);

// A simple root health-check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Task Tracker API is healthy and running!",
  });
});

app.use(errorHandler);

export default app;
