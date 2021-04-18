import { RootState } from "../store";

const STORE_KEY = "state";

/**
 * Save state in localstorage
 * @param {RootState} state 
 */
export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORE_KEY, serializedState);
  } catch (e) {
    console.log(e);
  }
};

/**
 * get State from local storage
 * @returns {RootState} state
 */
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
