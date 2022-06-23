import { useEffect, useState } from "react";

// Firebase
import { auth } from "../../firebase";

// Store
import { useSelector } from "react-redux";
// import { userDBAction } from "../../store/slice/userDBSlice";

// Components
import styles from "./LeftSide.module.scss";
import { PersonBox } from "../PersonBox";

const filterForSearch = (text, users, mode) => {
  return Object.values(users).filter((user) => {
    // Mode
    if (mode) {
      if (user[mode].toLowerCase().includes(text.toLowerCase())) {
        return true;
      }
    }
    // Имя + Фамилия
    if (
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(text.toLowerCase())
    ) {
      return true;
    }
    // Отдел
    if (user.department.toLowerCase().includes(text.toLowerCase())) {
      return true;
    }
  });
};

const LeftSide = () => {
  // LocalState
  const [users, setUsers] = useState([]);

  const { usersData } = useSelector((state) => state.userDB);
  const { textForSearch, searchMode } = useSelector((state) => state.search);

  // Отрисовка по фильтру и поиску
  useEffect(() => {
    if (textForSearch) {
      const sortUsers = filterForSearch(textForSearch, usersData, searchMode);
      setUsers(sortUsers);
      return;
    }
    textForSearch === "" && setUsers(Object.values(usersData));
  }, [textForSearch, searchMode]);

  // Initial отрисовка пользователей без фильра
  useEffect(() => {
    if (usersData !== null) {
      const usersArr = Object.values(usersData).filter(
        (user) => user.uid !== auth.currentUser.uid
      );
      setUsers(usersArr);
    }
  }, [usersData]);

  return (
    <>
      <div className={styles.leftSide}>
        {users.map((user) => {
          const { firstName, lastName, department, uid } = user;
          return (
            <PersonBox
              key={uid}
              uid={uid}
              firstName={firstName}
              lastName={lastName}
              department={department}
            />
          );
        })}
      </div>
    </>
  );
};

export { LeftSide };
