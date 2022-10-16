import { useEffect, useState } from "react";

// Firebase
import { auth } from "../../firebase";

// Store
import { useSelector } from "react-redux";

// Components
import styles from "./LeftSide.module.scss";
import { PersonBox } from "../PersonBox";

// Фильтрует пользователей
const filterForSearch = (text, users, mode) => {
  const usersArr = sortUsers(users);

  const toLower = (a) => a.toLowerCase();
  const match = (a, b) => toLower(a).includes(toLower(b));

  // Возвращает отсортированный массим с пользователями [{}, {}, {}]
  return usersArr.filter((user) => {
    // Поиск если включены критерии поиска
    if (mode === "") {
      if (match(user.department, text)) return true;
      if (match(`${user.firstName} ${user.lastName}`, text)) return true;
    }

    // Поиск по стандарту, если критерии для поиска не выбраны
    if (mode) {
      if (match(user[mode], text)) return true;
    }
  });
};

// Сортирует удаляя из списка пользователей авторизованного пользователя
const sortUsers = (users) => {
  return Object.values(users).filter(
    (user) => user.uid !== auth?.currentUser?.uid
  );
};

const personVariants = {
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.08,
    },
  }),
  hidden: { opacity: 0 },
};

const LeftSide = () => {
  // LocalState
  const [users, setUsers] = useState([]);

  // Store
  const { usersData } = useSelector((state) => state.userDB);
  const { textForSearch, searchMode } = useSelector((state) => state.search);

  // Отрисовка по фильтру и поиску
  useEffect(() => {
    if (textForSearch) {
      const listUsers = filterForSearch(textForSearch, usersData, searchMode);
      setUsers(listUsers);
      return;
    }
    textForSearch === "" && setUsers(sortUsers(usersData));
  }, [textForSearch, searchMode]);

  // Начальная отрисовка пользователей без фильра и поиска
  // И удаление авторизованного пользователя из списка
  useEffect(() => {
    if (usersData !== null) {
      setUsers(sortUsers(usersData));
    }
  }, [usersData]);

  return (
    <>
      <div className={styles.leftSide}>
        {users.map((user, i) => {
          const { firstName, lastName, department, uid, urlAvatar } = user;
          return (
            <PersonBox
              key={uid}
              uid={uid}
              firstName={firstName}
              lastName={lastName}
              department={department}
              urlAvatar={urlAvatar}
              variants={personVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            />
          );
        })}
      </div>
    </>
  );
};

export { LeftSide };
