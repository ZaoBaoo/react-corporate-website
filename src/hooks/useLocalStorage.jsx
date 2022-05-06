import { useEffect } from "react";

// Store
import { useSelector } from "react-redux";

const useLocalStorage = () => {
  const { isLoggedIn } = useSelector((state) => state.login);
  // (e)
  useEffect(() => {
    isLoggedIn && localStorage.setItem("isLoggedIn", true);
    !isLoggedIn && localStorage.setItem("isLoggedIn", false);
  }, [isLoggedIn]);
};

export { useLocalStorage };
