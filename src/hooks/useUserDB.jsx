import { useEffect } from "react";

// Store
import { useDispatch, useSelector } from "react-redux";
import { userDBAction } from "../store/slice/userDBSlice";
import { setUserDBThunk } from "../store/thunk/setUserDBThunk";

// Firebase
import { ref, onValue, set } from "firebase/database";
import { auth, db } from "../firebase";

const useUserDB = () => {
  const dispatch = useDispatch();
  const { isDataReceived, userData } = useSelector((state) => state.userDB);
  const { firstName, lastName, email, phoneNumber } = useSelector(
    (state) => state.registration
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/users/${auth.currentUser.uid}`), (snapshot) => {
          const data = snapshot.val();

          console.log(`Отправили запрос в базу данных, получили ${data}`);
          // отправляем запрос в базу данных
          // Запишем полученные данные в Store
          // Если пользователь регистрируется, то с базы мы получем null
          // И создадим его в базе данных
          dispatch(userDBAction.setUserData(data));
        });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (isDataReceived && !userData) {
      console.log("Создание user DB");
      set(ref(db, `/users/${auth.currentUser.uid}`), {
        firstName,
        lastName,
        email,
        phoneNumber,
      });
    }
  }, [dispatch, isDataReceived]);
};

export { useUserDB };
