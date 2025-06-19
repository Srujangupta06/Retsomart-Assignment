import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: [],
  reducers: {
    addTaskList:(state,action)=>{
      return [...action.payload];
    },
    addTask: (state, action) => {
      state.push(...action.payload);
    },
    removeTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask,addTaskList, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
