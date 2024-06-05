import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../slices/userSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
