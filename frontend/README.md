
# Frontend Setup 

Using Vite Bundler

npm create vite@latest

# To Start the Development Server

npm run dev

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