import { useState, useEffect } from "react";

// store
import { useSelector, useDispatch } from "react-redux";
import { mobileAction } from "../store/slice/mobileSlice";

const useMobile = () => {
  const dispatch = useDispatch();
  const { isMobileSize } = useSelector((state) => state.mobile);
  useEffect(() => {
    const handleResize = () => {
      // Если разрешение меньше 425
      // Переключаем isMobileSize на true
      if (!isMobileSize && window.innerWidth < 800) {
        dispatch(mobileAction.toggle(true));
      }
      // Если разрешение больше 425
      // Переключаем isMobileSize на false
      if (isMobileSize && window.innerWidth > 800) {
        dispatch(mobileAction.toggle(false));
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileSize, dispatch]);
};

export { useMobile };
