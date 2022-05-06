import { useState } from "react";

const useLocalStorage = (key) => {
  //
  const getDataForLocalStorage = () => {
    const dataLS = localStorage.getItem(key);
    return dataLS ? dataLS : "";
  };

  const [value, setValue] = useState(getDataForLocalStorage);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const value = e.target.value;
    error && setError(null);
    if (value !== "Danil") {
      setValue(e.target.value);
      localStorage.setItem(key, e.target.value);
      return;
    }
    setError("Поле не должно быть Danil");
  };

  return {
    value,
    onChange,
    error,
  };
};

export { useLocalStorage };
