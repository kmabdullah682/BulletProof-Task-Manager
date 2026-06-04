import Task from "../models/task.models.js";

const createTask = async (req, res) => {
  try {
    const { title, description, status, hashtags, dueDate } = req.body;

    if (!title || !description || !dueDate || !status) {
      return res.status(400).json({
        success: false,
        message: "Please fill up all required fields",
      });
    }

    const userId = req.id;

    const task = await Task.create({
      title,
      description,
      status,
      hashtags,
      dueDate,
      user: userId,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create task, internal server error",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    const userId = req.id;

    const tasks = await Task.find({ user: userId, status: status })
      .skip(skip)
      .limit(limit);

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve tasks, internal server error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const updates = req.body;
    const taskId = req.params.id;

    if (!updates) {
      return res.status(400).json({
        success: false,
        message: "please replace the fields with the updated one",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "there is no task to update please find another one",
      });
    }

    res.status(200).json({
      success: true,
      message: "task edited successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error please try again",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const deleteTask = await Task.findByIdAndDelete(taskId);

    if (!deleteTask) {
      return res.status(404).json({
        success: false,
        message: "there is not this task to delete find another one to delete",
      });
    }

    res.status(200).json({
      success: true,
      message: "task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error please try again",
    });
  }
};

export { createTask, getTasks, updateTask, deleteTask };
