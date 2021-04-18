import React, { FC, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import getWordSimilarity from "../../managers/Home";
import { useFormInput } from "../../hooks";

interface HomeProps {}

const requestedWordErrorInitialState = {
  error: false,
  helperText: "",
};

const Home: FC<HomeProps> = () => {
  const notebookEntry = useFormInput("");
  const requestedWord = useFormInput("");

  const [requestedWordError, setRequestedWordError] = useState(
    requestedWordErrorInitialState
  );

  const onChangeRequestedWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    requestedWord.onChange(e);
    const val = e.target.value;
    if (val.trim().split(" ").length > 1) {
      setRequestedWordError((prev) => ({
        ...prev,
        error: true,
        helperText: "Only one word is allowed",
      }));
    } else {
      setRequestedWordError(requestedWordErrorInitialState);
    }
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { frequency, similarWords } = getWordSimilarity(
      requestedWord.value,
      notebookEntry.value
    );
    console.log(frequency, similarWords);
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>Word Frequency</h1>
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
          {...notebookEntry}
        />
        <TextField
          id="word"
          label="Frequency of the word"
          variant="outlined"
          onChange={onChangeRequestedWord}
          value={requestedWord.value}
          {...requestedWordError}
        />

        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          type="submit"
          disabled={requestedWordError.error}
        >
          Search Word Frequency
        </Button>
      </form>
    </div>
  );
};

export default Home;
