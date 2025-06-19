const { EntitySchema } = require("typeorm");

const Todo = new EntitySchema({
  name: "Todo",
  tableName: "todos",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    title: {
      type: "varchar",
      nullable: false,
    },
    description: {
      type: "varchar",
      nullable: true,
    },
    status: {
      type: "enum",
      enum: ["todo", "in_progress", "done"],
      default: "todo",
    },
    dueDate: {
      type: "date",
      nullable: true
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updatedAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});

module.exports = { Todo };
