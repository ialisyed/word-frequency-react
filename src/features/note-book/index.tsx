import React, { FC } from "react";
import { Button, TableCell, TableRow, TextField } from "@material-ui/core";
import getWordSimilarity from "../../managers/Home";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  NotebookError,
  notebookSelector,
  NotebookSimilarWords,
  setFrequency,
  setNotebookEntry,
  setNotebookError,
  setRequestedWord,
  setSimilarWords,
} from "./notebookSlice";

import "./styles.css";
import CustomTable from "../../components/table";
import { STRINGS } from "../../localization";
import { renderIf } from "../../util";

interface HomeProps {}

const requestedWordErrorInitialState: NotebookError = {
  error: false,
  helperText: "",
};

const Home: FC<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const {
    frequency,
    notebookEntry,
    requestedWord,
    error,
    similarWords,
  } = useAppSelector(notebookSelector);

  /**
   * notebookEntry change handler
   * @param e 
   */
  const onNotebookEntryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNotebookEntry(e.target.value));
  };

  /**
   * requested word change handler
   * @param e 
   */
  const onChangeRequestedWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    dispatch(setRequestedWord(val));

    if (val.trim().split(" ").length > 1) {
      dispatch(
        setNotebookError({
          error: true,
          helperText: STRINGS.REQUESTED_WORD_ERROR,
        })
      );
    } else {
      dispatch(setNotebookError(requestedWordErrorInitialState));
    }
  };

  /**
   * form submit handler
   * @param e 
   */
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { frequency, similarWords } = getWordSimilarity(
      requestedWord,
      notebookEntry
    );
    dispatch(setSimilarWords(similarWords as NotebookSimilarWords));
    dispatch(setFrequency(frequency));
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>{STRINGS.NOTEBOOK_HEADING}</h1>
      <form
        onSubmit={onSubmit}
        className="w-100 mt-4 d-flex flex-column align-items-center"
      >
        <TextField
          multiline
          id="notebook"
          variant="outlined"
          label="Notebook"
          rows="8"
          name="notebook"
          className="w-75 m-4"
          value={notebookEntry}
          onChange={onNotebookEntryChange}
        />

        <TextField
          id="word"
          label="Frequency of the word"
          variant="outlined"
          onChange={onChangeRequestedWord}
          value={requestedWord}
          {...error}
        />

        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          type="submit"
          disabled={error.error || !notebookEntry || !requestedWord}
        >
          {STRINGS.NOTEBOOK_SUBMIT_BTN}
        </Button>
      </form>

      {renderIf(!!Object.keys(similarWords).length)(
        <CustomTable
          headings={
            <TableRow className="heading">
              <TableCell className="text-center">{STRINGS.FREQUENCY}</TableCell>
            </TableRow>
          }
          data={Object.keys(similarWords).map((key) => (
            <TableRow className="cell" key={key}>
              <TableCell className="text-center" component="th" scope="row">
                {frequency}
              </TableCell>
            </TableRow>
          ))}
        />
      )}

      {renderIf(!!Object.keys(similarWords).length)(
        <CustomTable
          headings={
            <TableRow className="heading">
              <TableCell className="text-center">
                {STRINGS.SIMILAR_WORDS}
              </TableCell>
              <TableCell className="text-center" align="right">
                {STRINGS.COUNT}
              </TableCell>
            </TableRow>
          }
          data={Object.keys(similarWords).map((key) => (
            <TableRow className="cell" key={key}>
              <TableCell className="text-center" component="th" scope="row">
                {key}
              </TableCell>
              <TableCell className="text-center" align="right">
                {similarWords[key]}
              </TableCell>
            </TableRow>
          ))}
        />
      )}
    </div>
  );
};

export default Home;
