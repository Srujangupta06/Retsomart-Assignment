// ALLOWED TODO STATUS TYPES
const ALLOWED_STATUS = ["todo", "in_progress", "done"];

const validateTodoCreation = (data) => {
  const { title, dueDate, description } = data;

  if (!title || title.trim() === "") {
    throw new Error("Title is required and cannot be empty");
  }
  if (title.trim().length < 8) {
    throw new Error("Title must be at least 8 characters long");
  }

  if (title.trim().length > 50) {
    throw new Error("Title cannot exceed 50 characters");
  }

  if (description !== null && description !== "") {
    const trimmed = description.trim();

    if (trimmed.length < 10) {
      throw new Error("Description must be at least 10 characters long");
    }

    if (trimmed.length > 200) {
      throw new Error("Description must be less than 200 characters long");
    }
  }

  if (dueDate && dueDate.trim() === "") {
    throw new Error("Due Date cannot be empty");
  }

  if (dueDate && isNaN(Date.parse(dueDate))) {
    throw new Error("Invalid Due Date");
  }
};

const validateTodoUpdate = (data, res) => {
  const { title, description, status, dueDate } = data;
  if (!title || title.trim() === "") {
    throw new Error("Title is required and cannot be empty");
  }

  if (title.trim().length < 8) {
    throw new Error("Title must be at least 8 characters long");
  }
  if (title.trim().length > 50) {
    throw new Error("Title cannot exceed 50 characters");
  }

  if (description !== null && description !== "") {
    const trimmed = description.trim();

    if (trimmed.length < 10) {
      throw new Error("Description must be at least 10 characters long");
    }

    if (trimmed.length > 200) {
      throw new Error("Description must be less than 200 characters long");
    }
  }

  if (dueDate && dueDate.trim() === "") {
    throw new Error("Due Date cannot be empty");
  }

  if (dueDate && isNaN(Date.parse(dueDate))) {
    throw new Error("Invalid Due Date");
  }

  if (status && !ALLOWED_STATUS.includes(status)) {
    throw new Error("Invalid Todo Status!");
  }
};

module.exports = { validateTodoCreation, validateTodoUpdate };
