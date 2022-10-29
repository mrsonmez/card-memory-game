import { configureStore } from "@reduxjs/toolkit";
import memoryGameReducer from "./../slice/memoryGameSlice";

export const store = configureStore({
  reducer: memoryGameReducer,
});
