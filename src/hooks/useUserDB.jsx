import { useState, useEffect } from "react";

// Store
import { useDispatch, useSelector } from "react-redux";
import { userDBAction } from "../store/slice/userDBSlice";
import { modalUserAction } from "../store/slice/modalUser";

// Firebase
import { ref, onValue, set } from "firebase/database";
import { auth, db } from "../firebase";

const useUserDB = () => {
  const [response, setResponse] = useState();

  const dispatch = useDispatch();
  const { firstName, lastName, email, phoneNumber } = useSelector(
    (state) => state.registration
  );

  const { userForShow } = useSelector((state) => state.modalUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/users`), (snapshot) => {
          const data = snapshot.val();

          setResponse(data);
        });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (response !== undefined) {
      const creatUserDB = () => {
        set(ref(db, `/users/${auth.currentUser.uid}`), {
          firstName,
          lastName,
          email,
          phoneNumber,
          department: "",
          position: "",
          uid: auth.currentUser.uid,
        });
      };

      if (response === null) {
        creatUserDB();
        return;
      }

      const user = response[auth.currentUser.uid];

      if (user === undefined) {
        creatUserDB();
        return;
      }

      // Для отображения в header
      dispatch(userDBAction.setUserData(user));

      // ТЕСТ
      // Для отображения в modal (right side)
      if (userForShow === "") {
        dispatch(modalUserAction.setUserForShow(user));
      }

      // Список пользователей
      dispatch(userDBAction.setUsersData(response));
    }
  }, [response]);
};

export { useUserDB };
