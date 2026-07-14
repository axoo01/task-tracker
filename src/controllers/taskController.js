const tasksDatabase = [
  { id: 1, title: "Setup Express Server", completed: true },
  { id: 2, title: "Build the GET Endpoints", completed: false },
];

// 1. GET ALL TASKS
export const getAllTasks = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tasksDatabase.length,
    data: {
      tasks: tasksDatabase,
    },
  });
};

// 2. GET SINGLE TASK BY ID
export const getTaskById = (req, res) => {
  
  const taskId = Number(req.params.id);

  // Look for the task in our array
  const task = tasksDatabase.find((t) => t.id === taskId);

  // Safeguard: If the task doesn't exist, return a 404 immediately
  if (!task) {
    return res.status(404).json({
      status: "fail",
      message: `Task with ID ${taskId} not found.`,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
};


// 3. CREATE A NEW TASK (POST)
export const createTask = (req, res) => {
    const { title, completed } = req.body;

   
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
            status: "fail",
            message: "Validation Error: 'title' is required and must be a non-empty string."
        });
    }

   
    const newId = tasksDatabase.length > 0 
        ? Math.max(...tasksDatabase.map(t => t.id)) + 1 
        : 1;

  
    const newTask = {
        id: newId,
        title: title.trim(),
        completed: typeof completed === 'boolean' ? completed : false // default to false if not provided
    };

   
    tasksDatabase.push(newTask);

    res.status(201).json({
        status: "success",
        data: {
            task: newTask
        }
    });
};