import { configureStore } from "@reduxjs/toolkit";
import articles from "./slices/articles";

export const store = configureStore({
  reducer: {
    articles,
  },
});
