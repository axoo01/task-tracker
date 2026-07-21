import prisma from "../lib/prisma.js"; 

// 1. GET ALL TASKS
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error); 
  }
};

// 2. GET SINGLE TASK BY ID
export const getTaskById = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id);

    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// 3. CREATE A NEW TASK
export const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const newTask = await prisma.task.create({
      data: { title },
    });

    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    next(error);
  }
};

// 4. UPDATE AN EXISTING TASK
export const updateTask = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id);
    const { title, completed } = req.body;

    // Optional: Check if task exists first to return a clean 404
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
    });
    if (!existingTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed }),
      },
    });

    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    next(error);
  }
};

// 5. DELETE A TASK
export const deleteTask = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id);

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
    });
    if (!existingTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
