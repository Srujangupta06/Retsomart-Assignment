
# Frontend Setup 

Using Vite Bundler

npm create vite@latest

# To Start the Development Server

npm run dev

PORT Default: 5173

# To create a Production Build

npm run build

# Tailwind Configuration

Configure the Tailwind CSS using Vite process 

# Install React-Router-dom 

- For Navigation b/w the Routes in React App

Routes used

/           - Landing Page

/home       - Home page where you can see all tasks created already

/add        - Page to create task

/edit:id    - Page to Edit the Existing Task

Note: Page refers to Route because, This is SPA . So, it can have many routes with single page using React


# Frontend Folder Structure

Inside Src Dir 

 - components - UI which are can be reusable

 - pages - Routes for App

 - store - Files related to Redux Store and it's slices

 # Redux Toolkit Configuration

 Install command

 npm i @reduxjs/toolkit

 To bind Our App with Store install

 npm i react-redux


- Next Step is to Configure Store and Create Slices.

- Bind Store with Our App using React-Redux 

# Hot Notifications 

- Used a react-hot-toast for displaying user-centric notifications for better UX

  npm i react-hot-toast

# Main Features

- Displaying all Tasks Created 
  
  - Filter By Status (todo,in_progress,done)

  - If No tasks found, Simply shows No task Found View

- Creating a Task (including client-side validations)

  - Shows a Hot-Toast Notification

- Updating a Task (including client-side validations)

  - Shows a Hot-Toast Notification

- Deleting a Task by user Permission

  - Shows a Hot-Toast Notification


# Environment Variables

- Created a .env file for actual env variables

- Created a .env.example file for reference



# Backend Setup

TechStack
 - Nodejs
 - Express
 - Postgres

# To start Development Server
    npm run server

# Default PORT

PORT: 8080 (from .env) else 3000

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


# Postgres Database Configuration with TypeORM

In /config/db.js

  type: '',            -  DB Type
  host: '',            -  Host name
  port: 5432,          -  Default Port of DB Server
  username: '',        -  DB USER NAME
  password: '',        -  DB USER PASSWORD
  database: '',        -  YOUR DB NAME

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

