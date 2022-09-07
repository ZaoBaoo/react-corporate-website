import { useState, useRef, useEffect } from "react";

// Firebase
import { push, ref, set } from "firebase/database";
import { auth, db } from "../../firebase";

// Styles
import styles from "./InputChat.module.scss";

// Store
import { useSelector } from "react-redux";

const InputChat = () => {
  const [textMessage, setTextMessage] = useState("");

  const { uidForShowChat } = useSelector((state) => state.modalUser);

  const inputRef = useRef(null);
  const btnRef = useRef(null);

  // (f) Обработчик сообщений
  const handlerMessage = (e) => {
    setTextMessage(e.target.value);
  };

  // (f) Отправка сообщений
  const sendMessage = async () => {
    if (!textMessage) return;

    const DATE = new Date();

    // Отправить сообщение себе
    async function sendNewMessageToYourself(text) {
      const refForNewMessage = push(
        ref(
          db,
          `/DBMessages/${auth.currentUser.uid}/dialogues/${uidForShowChat}/message`
        )
      );

      await set(refForNewMessage, {
        from: auth.currentUser.uid,
        date: DATE.toISOString(),
        dateAt: DATE.getTime(),
        text: text,
      });
    }

    sendNewMessageToYourself(textMessage);
    inputRef.current.focus();
    setTextMessage("");
  };

  useEffect(() => {
    const input = inputRef.current;
    const checkKeyDown = (e) => {
      if (e.key === "Enter") {
        btnRef.current.click();
      }
    };
    inputRef.current.addEventListener("keydown", checkKeyDown);
    return () => input.removeEventListener("keydown", checkKeyDown);
  }, []);

  return (
    <div className={styles.chatInputWrapper}>
      <input
        value={textMessage}
        onChange={handlerMessage}
        placeholder="Напишите сообщение..."
        type="text"
        ref={inputRef}
      />
      <button ref={btnRef} onClick={sendMessage}></button>
    </div>
  );
};

export { InputChat };
