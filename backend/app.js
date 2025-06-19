const express = require("express");
const { initializeDB } = require("./src/config/db");
require("dotenv").config();
const cors = require("cors");
const todoRoutes = require("./src/routes/todo-router");
const app = express();

// PORT DECLARATION
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
// Routes
app.use("/api/tasks", todoRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const initializeDBAndServer = async () => {
  try {
    await initializeDB();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (e) {
    console.log("Failed to start server", e);
  }
};

initializeDBAndServer();
