const { DataSource } = require("typeorm");
const { Todo } = require("../entities/Todo.entity");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Todo],
});

const initializeDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("DB CONNECTION: SUCCESS");
  } catch (e) {
    console.log("DB CONNECTION: FAILED", e);
  }
};

module.exports = {initializeDB,AppDataSource };
