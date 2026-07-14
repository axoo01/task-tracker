import express from "express";
import taskRouter from './routes/taskRouter.js'

const app = express();


app.use(express.json());

app.use("/tasks", taskRouter);

// A simple root health-check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Task Tracker API is healthy and running!",
  });
});

export default app;
