import { useState } from "react";

function useFormInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
}

export default useFormInput;
