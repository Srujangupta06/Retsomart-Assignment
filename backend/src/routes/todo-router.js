const express = require("express");
const {
  getAllTodos,
  createTodo,
  deleteTodo,
  getTodoById,
  updateTodoById,
} = require("../controllers/todo-controller");

const router = express.Router();

router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);
router.put('/:id',updateTodoById)
router.delete("/:id", deleteTodo);

module.exports = router;
