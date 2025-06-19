const { ILike } = require("typeorm");
const { AppDataSource } = require("../config/db");

class TodoService {
  constructor() {
    this.todoRepository = AppDataSource.getRepository("Todo");
  }

  getAllTodos = async (status) => {
    const whereClause = status === "all" ? {} : { status };

    const todos = await this.todoRepository.find({
      where: whereClause,
      order: {
        createdAt: "DESC",
      },
    });

    return todos;
  };

  getTodoById = async (id) => {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
      },
    });
    return todo;
  };

  getTodoByTitle = async (todoTitle) => {
    const todo = await this.todoRepository.findOne({
      where: {
        title: ILike(`%${todoTitle}%`),
      },
    });
    return todo;
  };

  createTodo = async (data) => {
    const todo = this.todoRepository.create(data);
    await this.todoRepository.save(todo);
    return todo;
  };

  updateTodoById = async (id, data) => {
    data.updatedAt = new Date();
    await this.todoRepository.update(id, data);
    const updatedTodo = await this.getTodoById(id);
    return updatedTodo;
  };

  deleteTodoById = async (id) => {
    await this.todoRepository.delete(id);
  };
}

module.exports = { TodoService };
