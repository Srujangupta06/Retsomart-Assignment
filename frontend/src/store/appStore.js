import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/todoSlice";
const appStore = configureStore({
  reducer: {
    task: taskReducer,
  },
});

export default appStore;
