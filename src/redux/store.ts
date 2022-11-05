import { configureStore } from "@reduxjs/toolkit";

import characterReducer from "./character/character.slice";

export const rootReducer = {
  character: characterReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = typeof rootReducer;
export type AppDispatch = typeof store.dispatch;
