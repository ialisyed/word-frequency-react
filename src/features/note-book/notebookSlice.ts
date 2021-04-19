import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface NotebookError {
  helperText: string;
  error: boolean;
}

export interface NotebookSimilarWords {
  [word: string]: number;
}

export interface NotebookState {
  notebookEntry: string;
  frequency?: number;
  requestedWord: string;
  similarWords: NotebookSimilarWords;
  error: NotebookError;
}

export const requestedWordErrorInitialState: NotebookError = {
  error: false,
  helperText: "",
};

export const initialState: NotebookState = {
  notebookEntry: "",
  error: requestedWordErrorInitialState,
  frequency: undefined,
  requestedWord: "",
  similarWords: {},
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
    setSimilarWords: (
      state,
      { payload }: PayloadAction<NotebookSimilarWords>
    ) => {
      state.similarWords = payload;
    },
    setNotebookError: (state, { payload }: PayloadAction<NotebookError>) => {
      state.error = payload;
    },
    resetNotebookState: (state) => initialState,
  },
});

export const {
  setNotebookEntry,
  setFrequency,
  setRequestedWord,
  setSimilarWords,
  setNotebookError,
  resetNotebookState,
} = notebookSlice.actions;

export const notebookSelector = (state: RootState) => state.notebook;

export default notebookSlice.reducer;
