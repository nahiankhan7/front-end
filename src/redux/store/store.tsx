import { configureStore } from "@reduxjs/toolkit";
import fetchReducer from "../slice/todosSlice";

const store = configureStore({
  reducer: {
    todos: fetchReducer,
  },
});

export default store;
