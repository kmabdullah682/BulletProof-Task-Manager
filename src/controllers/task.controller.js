import Task from "../models/task.models.js";

const createTask = async (req, res) => {
  try {
    const { title, description, status, hastags, dueDate } = req.body;

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
      hastags,
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

export { createTask };
