// Our in-memory "Database"
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
  // Express extracts URL variables and puts them in 'req.params' as strings
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

    // 🛡️ Input Validation Guard: Check if title is missing or empty
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
            status: "fail",
            message: "Validation Error: 'title' is required and must be a non-empty string."
        });
    }

    // Determine the next ID sequentially
    const newId = tasksDatabase.length > 0 
        ? Math.max(...tasksDatabase.map(t => t.id)) + 1 
        : 1;

    // Create the new task record
    const newTask = {
        id: newId,
        title: title.trim(),
        completed: typeof completed === 'boolean' ? completed : false // default to false if not provided
    };

    // Push it into our in-memory database
    tasksDatabase.push(newTask);

    // Return the response with status 201 Created
    res.status(201).json({
        status: "success",
        data: {
            task: newTask
        }
    });
};