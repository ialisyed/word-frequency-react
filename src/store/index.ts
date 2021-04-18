import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import throttle from "lodash.throttle";
import { loadState, saveState } from "../lib/local-storage";
import rootReducer from "./reducers";

const preloadedState = loadState();
const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  preloadedState,
});

store.subscribe(
  throttle(() => {
    saveState({
      notebook: store.getState().notebook,
    });
  }, 1000)
);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
