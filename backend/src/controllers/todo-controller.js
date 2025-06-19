const { TodoService } = require("../services/todo-service");
const { isEditAllowed } = require("../utils/helper");
const {
  validateTodoCreation,
  validateTodoUpdate,
} = require("../utils/validations");

// API TO GET ALL TODOS
const getAllTodos = async (req, res) => {
  try {
    const todoService = new TodoService();
    const {status} = req.query;
    
    // Fetch All Todos
    const todoList = await todoService.getAllTodos(status);

    return res.json({
      message: "Todos Fetched Successfully",
      data: todoList,
    });

  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error:e.message
    });
  }
};

// API TO GET A TODO BY ID
const getTodoById = async (req, res) => {
  try {
    const todoService = new TodoService();
    const { id } = req.params;

    // Fetch Todo by ID
    const todo = await todoService.getTodoById(id);
    if (!todo) {
      return res.status(404).json({
        message: "Todo Not Found",
        error: "NOT_FOUND",
      });
    }
    
    return res.json({
      message: "Todo Fetched Successfully",
      data: todo,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

// API TO CREATE A TODO
const createTodo = async (req, res) => {
  try {
    const todoService = new TodoService();

    const { title, dueDate, description } = req.body;

    // Validate the Req Body
    validateTodoCreation(req.body);

    // Check Similar Todo Exist before
    const todoExist = await todoService.getTodoByTitle(title);
    if (todoExist) {
      return res.status(409).json({
        message: "Todo Already Exist",
        error: "CONFLICT",
      });
    }

    // Create a new Todo
    const newTodo = {
      title,
      description,
      status: "todo",
      dueDate: dueDate
        ? new Date(dueDate)
        : new Date(new Date().setDate(new Date().getDate() + 4)),
    };

    // Save Todo to DB
    await todoService.createTodo(newTodo);

    return res.json({
      message: "Todo Created Successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: e.message,
    });
  }
};

// API TO UPDATE A TODO
const updateTodoById = async (req, res) => {
  try {
    const todoService = new TodoService();
    const { id } = req.params;

    // Check whether Todo Exist before updating
    const todoExists = await todoService.getTodoById(id);
    if (!todoExists) {
      return res.status(404).json({
        message: "Todo Not Found",
        error: "NOT_FOUND",
      });
    }

    // Validate the Req Body;
    validateTodoUpdate(req.body);

    // Check Allowed to Modify or not
    const isAllowed = isEditAllowed(req.body);
    if (!isAllowed) {
      return res.status(400).json({
        message: "Not Allowed to Update Requested Fields",
        error: "BAD_REQUEST",
      });
    }

    // Update the Todo
    const updatedTodo = await todoService.updateTodoById(id, req.body);

    res.json({
      message: "Todo Updated Successfully",
      data: updatedTodo,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

// API TO DELETE A TODO
const deleteTodo = async (req, res) => {
  try {
    const todoService = new TodoService();
    const { id } = req.params;

    // Check whether Todo Exist before deleting
    const todoExists = await todoService.getTodoById(id);
    if (!todoExists) {
      return res.status(404).json({
        message: "Todo Not Found",
        error: "NOT_FOUND",
      });
    }

    await todoService.deleteTodoById(id);
    return res.status(204).json({
      message: "Todo Deleted Successfully",
    });
    
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodoById,
  deleteTodo,
};
