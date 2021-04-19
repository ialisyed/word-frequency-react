import React, { FC, useEffect, useMemo, useRef } from "react";
import { Button, TableCell, TableRow, TextField } from "@material-ui/core";
import getWordSimilarity from "../../managers/Home";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  notebookSelector,
  NotebookSimilarWords,
  requestedWordErrorInitialState,
  resetNotebookState,
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
import NotebookForm from "../../components/notebook-form";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const resultRef = useRef<null | HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const {
    frequency,
    notebookEntry,
    requestedWord,
    error,
    similarWords,
  } = useAppSelector(notebookSelector);

  const similarWordsKeys = useMemo(() => Object.keys(similarWords), [
    similarWords,
  ]);

  useEffect(() => {
    if (
      (frequency !== undefined && frequency !== null) ||
      similarWordsKeys.length
    ) {
      resultRef!.current!.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }, [frequency, similarWordsKeys]);

  /**
   * notebookEntry change handler
   * @param e
   */
  const onChangeNotebookEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  /**
   * reset notebook
   * @param e
   */
  const onReset = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetNotebookState());
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>{STRINGS.NOTEBOOK_HEADING}</h1>
      <NotebookForm
        onSubmit={onSubmit}
        notebookEntry={notebookEntry}
        onChangeNotebookEntry={onChangeNotebookEntry}
        requestedWord={requestedWord}
        onChangeRequestedWord={onChangeRequestedWord}
        onReset={onReset}
        error={error}
      />

      <div
        ref={resultRef}
        className="w-75 d-flex flex-column align-items-center"
      >
        {renderIf(frequency !== null && frequency !== undefined)(
          <CustomTable
            headings={
              <TableRow className="heading">
                <TableCell className="text-center">
                  {STRINGS.FREQUENCY}
                </TableCell>
              </TableRow>
            }
            data={
              <TableRow className="cell">
                <TableCell className="text-center" component="th" scope="row">
                  {frequency}
                </TableCell>
              </TableRow>
            }
          />
        )}

        {renderIf(!!similarWordsKeys.length)(
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
            data={similarWordsKeys.map((key) => (
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
    </div>
  );
};

export default Home;
