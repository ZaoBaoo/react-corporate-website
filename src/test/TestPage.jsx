import { useState, useEffect } from "react";

// firebase
import { auth } from "../firebase";
import { db } from "../firebase";
import { get, ref, set } from "firebase/database";
import {
  signInWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";

// Styles
import styles from "./TestPage.module.scss";

const TestPage = () => {
  // State
  const [data, setData] = useState({ email: "", password: "" });

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

  // (f) DB Запись - Send
  const writeDBHandler = async (e) => {
    e.preventDefault();

    const dataForSendDB = {
      uuid: auth.currentUser.uid,
      email: data.email,
      password: data.password,
    };

    await set(ref(db, `/users/${auth.currentUser.uid}`), dataForSendDB);

    console.log("Отправлено");
  };

  // (f) Чтение - Get
  const readDBHandler = async (e) => {
    e.preventDefault();

    const response = await get(ref(db, `/users/${auth.currentUser.uid}`));

    console.log(response.val());
  };

  // (e)
  useEffect(() => {
    //
    auth.onAuthStateChanged((us) => {
      us && console.log("Зашли в учетную запись");
      us || console.log("Вышли");
    });
  }, []);

  return (
    <div className={styles.mainTest}>
      <form action="/" onSubmit={handlerLogin}>
        <div className={styles.buttonWrapper}>
          <button onClick={exitHandler} type="button">
            EXIT
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

        <div className={styles.buttonWrapper}>
          <button type="submit">LOGIN</button>
        </div>

        <div className={styles.buttonWrapper}>
          <button onClick={writeDBHandler} type="button">
            Send DB
          </button>
        </div>

        <div className={styles.buttonWrapper}>
          <button onClick={readDBHandler} type="button">
            Get DB
          </button>
        </div>
      </form>
    </div>
  );
};

export { TestPage };
