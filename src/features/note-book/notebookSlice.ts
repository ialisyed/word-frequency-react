import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface NotebookError {
  helperText: string;
  error: boolean;
}

export interface NotebookState {
  notebookEntry: string;
  frequency: number;
  requestedWord: string;
  similarWords: string[];
  isLoading: boolean;
  error: NotebookError;
}

export const initialState: NotebookState = {
  notebookEntry: "",
  isLoading: false,
  error: { helperText: "", error: false },
  frequency: 0,
  requestedWord: "",
  similarWords: [],
};

export const notebookSlice = createSlice({
  name: "notebook",
  initialState,
  reducers: {
    setNotebookEntry: (state, { payload }: PayloadAction<string>) => {
      state.notebookEntry = payload;
    },
    setFrequency: (state, { payload }: PayloadAction<number>) => {
      state.frequency = payload;
    },
    setRequestedWord: (state, { payload }: PayloadAction<string>) => {
      state.requestedWord = payload;
    },
    setSimilarWords: (state, { payload }: PayloadAction<string[]>) => {
      state.similarWords = payload;
    },
  },
});

export const {
  setNotebookEntry,
  setFrequency,
  setRequestedWord,
  setSimilarWords,
} = notebookSlice.actions;

export const notebookSelector = (state: RootState) => state.notebook;

export default notebookSlice.reducer;