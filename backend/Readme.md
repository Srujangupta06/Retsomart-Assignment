# Backend Setup

TechStack
 - Nodejs
 - Express
 - Postgres

# To start Development Server
    npm run server

# To Start Production Server
    npm run start

Note: I had installed nodemon globally, make sure to install nodemon before running local server

# To install Nodemon (As a Dev Dependency)

    npm i -D nodemon

# Folder Structure

 Root Dir - Src

 src
  - config          : db configuration related files
  - routes          : for route handling while hitting endpoints
  - controllers     : Route Handlers
  - services        : Reusable Services for DB Operations with Route handlers
  - entities        : For Database Entity 
  - utils           : Utility functions

# Environment Variables

.env - for securing the important info

# API 

 1) To GET ALL TASKS
  
  GET - http://localhost:3001/api/tasks

    - returns all Tasks

    - Expects a query param 'status' status can be ["todo","in_progress","done"]

 2) TO GET ONLY ONE TASK BASED ON ID
 
  GET - http://localhost:3001/api/tasks/:id

    - return one task related to id

3) TO CREATE A TASK
  
  POST - http://localhost:3001/api/tasks

    Req Body:
    {
        "title"             :       required,
        "description"       :       optional,
        "status"            :       By default("todo") ["todo","in_progress","done"],
        "dueDate"           :       By default 4 days from current date
    }

    Resposne 201 for Successful Task Creation

4) TO UPDATE A TASK

  PUT - http://localhost:3001/api/tasks/:id

    For Updating the Existing Task

5) TO DELETE A TASK

  DELETE - http://localhost:3001/api/tasks/:id

    For removing the Existing Task

