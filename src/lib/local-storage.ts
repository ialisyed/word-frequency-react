import { RootState } from "../store";

const STORE_KEY = "state";

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORE_KEY, serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
