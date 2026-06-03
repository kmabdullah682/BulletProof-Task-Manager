import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      default: "pending",
      required: true,
    },

    hastags: {
      type: [String],
    },

    dueDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => {
          return value >= new Date();
        },
        message: "Due date cannot be in the past",
      },
    },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
