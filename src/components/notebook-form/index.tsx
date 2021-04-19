import { Button, TextField } from "@material-ui/core";
import React, {
  ChangeEventHandler,
    FC,
  FormEventHandler,
  MouseEventHandler,
} from "react";
import { STRINGS } from "../../localization";
import { NotebookError } from "../../features/note-book/notebookSlice";

interface NotebookFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  notebookEntry: string;
  onChangeNotebookEntry: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  onChangeRequestedWord: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  requestedWord: string;
  error: NotebookError;
  onReset: MouseEventHandler<HTMLButtonElement>;
}

const NotebookForm: FC<NotebookFormProps> = (props: NotebookFormProps) => {
  const {
    onSubmit,
    notebookEntry,
    onChangeNotebookEntry,
    onChangeRequestedWord,
    requestedWord,
    error,
    onReset,
  } = props;
  return (
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
        onChange={onChangeNotebookEntry}
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

      <Button
        variant="contained"
        color="primary"
        className="mt-4"
        onClick={onReset}
      >
        {STRINGS.RESET}
      </Button>
    </form>
  );
};

export default NotebookForm;
