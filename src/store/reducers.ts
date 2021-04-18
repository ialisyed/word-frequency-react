import { combineReducers } from "redux";
import notebook from "../features/note-book/notebookSlice";

const rootReducer = combineReducers({
  notebook,
});

export default rootReducer;

