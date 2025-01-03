import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "@/redux/slice/postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer, // Add the posts reducer to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
