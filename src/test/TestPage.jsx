//  ДЛЯ ТЕСТИРОВАНИЯ ИСПОЛЬЗОВАТЬ ТОЛЬКО ПОЛЬОВАТЕЛЯ:
//
//
//               test@gg.gg
//               test@gg.gg
//
//
//
//
// Нормальные правила до ввода функции ЛИЧНЫЕ СООБЩЕНИЯ:
//
// {
//   "rules": {
//     "users": {
//       ".read": true,
//       "$uid": {
//         ".write": "$uid === auth.uid"
//       }
//     }
//   }
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

import { useState, useEffect } from "react";

// firebase
import { auth } from "../firebase";
import { db } from "../firebase";
import { get, ref, set, onValue, push, update } from "firebase/database";
import {
  signInWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";

// Styles
import styles from "./TestPage.module.scss";
import { async } from "@firebase/util";

const MY_UID = "Od7R2Epsz0QzDKdRp0Jie52CLOr2";
const OTHER_USER_UID = "QPRtv6R3GndKDXNnk7JRc4yDEA83";

const getSortMessage = (message) => message.sort((a, b) => a.dateAt - b.dateAt);

const TestPage = () => {
  // State
  const [data, setData] = useState({ email: "", password: "" });
  const [textMessage, setTextMessage] = useState("");
  const [status, setStatus] = useState("не зашли");
  const [myMessagesList, setMyMessagesList] = useState([]);
  const [userMessagesList, setUserMessagesList] = useState([]);
  const [allMessages, setAllMessages] = useState([]);

  // (f) setState
  const dataHandler = (e) => {
    setData((data) => {
      data[e.target.type] = e.target.value;
      return {
        ...data,
      };
    });
  };

  // (f) Exit
  const exitHandler = async (e) => {
    e.preventDefault();

    await auth.signOut();

    // await sendPasswordResetEmail(auth, "tampoox@gmail.com");

    console.log(auth.currentUser);
  };

  // (f) Login
  const handlerLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);

      console.log(auth.currentUser);
    } catch (error) {
      console.log(error.message);
    }
  };

  // (f) Отправка сообщений
  const writeDBHandler = async (e) => {
    e.preventDefault();

    const DATE = new Date();

    // Отправить сообщение другому пользователю
    async function sendNewMessageOtherUser(text) {
      const refForNewMessage = push(
        ref(db, `/DBMessages/${OTHER_USER_UID}/dialogues/${MY_UID}/message`)
      );

      await set(refForNewMessage, {
        date: DATE.toISOString(),
        dateAt: DATE.getTime(),
        text: text,
      });
    }

    // Отправить сообщение себе
    async function sendNewMessageToYourself(text) {
      const refForNewMessage = push(
        ref(db, `/DBMessages/${MY_UID}/dialogues/${OTHER_USER_UID}/message`)
      );

      await set(refForNewMessage, {
        from: auth.currentUser.uid,
        date: DATE.toISOString(),
        dateAt: DATE.getTime(),
        text: text,
      });
    }

    // Уведовить другово пользователя
    async function changeFieldNotificationToTrue() {
      const updates = {};
      updates[
        `/DBMessages/${OTHER_USER_UID}/dialogues/${MY_UID}/haveNewMessages`
      ] = true;

      await update(ref(db), updates);
    }

    // sendNewMessageOtherUser(textMessage);
    sendNewMessageToYourself(textMessage);
    // changeFieldNotificationToTrue();
    setTextMessage("");

    console.log("Отправлено");
  };

  // (f) Обработчик сообщений
  const handlerMessage = (e) => {
    setTextMessage(e.target.value);
  };

  // (f) Чтение - Get
  const readDBHandler = async (e) => {
    e.preventDefault();

    const response = await get(
      ref(db, `/DBMessages/${OTHER_USER_UID}/dialogues/${MY_UID}`)
    );

    // console.log(response && response.val());
    Object.values(response.val().message).forEach((i) => console.log(i));
  };

  // (e) Установка стату "в сети" или "не в сети"
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && setStatus("в сети");
      user || setStatus("не зашли");
    });
  }, []);

  // (e) Загружаем сообщения с сервера 2 пользователей при первой загрузки
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const messageProcessing = (rawData) =>
          Object.values(rawData.val().message);

        const myMessages = new Promise((resolve, reject) => {
          onValue(
            ref(
              db,
              `/DBMessages/${auth.currentUser.uid}/dialogues/${OTHER_USER_UID}`
            ),
            (snapshot) => {
              const dataMessage = messageProcessing(snapshot);
              setMyMessagesList(dataMessage);
              resolve(dataMessage);
            }
          );
        });

        const userMessages = new Promise((resolve, reject) => {
          onValue(
            ref(
              db,
              `/DBMessages/${OTHER_USER_UID}/dialogues/${auth.currentUser.uid}`
            ),
            (snapshot) => {
              const dataMessage = messageProcessing(snapshot);
              setUserMessagesList(dataMessage);
              resolve(dataMessage);
            }
          );
        });

        const response = await Promise.all([myMessages, userMessages]);

        const messagesUnion = [...response[0], ...response[1]];

        const sortMessage = getSortMessage(messagesUnion);

        setAllMessages(sortMessage);
      }
    });
  }, []);

  // (e) Получние новых сообщений реалтайм
  useEffect(() => {
    if (allMessages) {
      setAllMessages(getSortMessage([...myMessagesList, ...userMessagesList]));
    }
  }, [myMessagesList, userMessagesList]);

  return (
    <div className={styles.mainTest}>
      <form action="/" onSubmit={handlerLogin}>
        <div className={styles.login}>
          <h1 className={styles.title}>Authorization</h1>
          <div className={styles.btnGroup}>
            <button
              className={styles.btnExit}
              onClick={exitHandler}
              type="button"
            >
              EXIT
            </button>

            <button className={styles.btnLogin} type="submit">
              LOGIN
            </button>
          </div>

          <label>
            <p>E-mail</p>
            <input onChange={dataHandler} type="email" />
          </label>

          <label>
            <p>Password</p>
            <input onChange={dataHandler} type="password" />
          </label>
        </div>

        <div className={styles.dataBase}>
          <h1 className={styles.title}>Message</h1>

          <span className={styles.titleUser}>
            Вы:{" "}
            <span
              className={
                status === "в сети"
                  ? styles.titleUserStatusOnline
                  : styles.titleUserStatusOffline
              }
            >
              {status}
            </span>
          </span>

          <div className={styles.dialog}>
            <div className={styles.chat}>
              {allMessages &&
                allMessages.map((i) => {
                  if (i.from === auth.currentUser.uid) {
                    return (
                      <div key={i.date} className={styles.rightUser}>
                        <span className={styles.rightText}>{i.text}</span>
                      </div>
                    );
                  } else {
                    return (
                      <div key={i.date} className={styles.leftUser}>
                        <span className={styles.leftText}>{i.text}</span>
                      </div>
                    );
                  }
                })}
            </div>
            <div className={styles.inputBlock}>
              <textarea
                value={textMessage}
                onChange={handlerMessage}
                className={styles.inputText}
              ></textarea>
            </div>
          </div>

          <div className={styles.btnBD}>
            <button onClick={writeDBHandler} type="button">
              Send message
            </button>
          </div>

          <div className={styles.btnBD}>
            <button onClick={readDBHandler} type="button">
              Get DB
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export { TestPage };

// const dataForSendDB = {
//   [OTHER_USER_UID]: {
//     dialogues: {
//       [MY_UID]: {
//         haveNewMessages: true,
//         message: [
//           {
//             date: DATE.toISOString(),
//             dateAt: DATE.getTime(),
//             text: "Привет!",
//           },
//           {
//             date: DATE.toISOString(),
//             dateAt: DATE.getTime(),
//             text: "Как дела?",
//           },
//         ],
//       },
//     },
//   },
// };
