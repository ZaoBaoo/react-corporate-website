import { useState, useRef, useEffect } from 'react';

// Firebase
import { push, ref, set, serverTimestamp } from 'firebase/database';
import { auth, db } from '../../firebase';

// Styles
import styles from './InputChat.module.scss';

// Store
import { useSelector } from 'react-redux';

const InputChat = ({ handlerScroll }) => {
  const [textMessage, setTextMessage] = useState('');

  const { uidForShowChat } = useSelector((state) => state.modalUser);

  const inputRef = useRef(null);
  const btnRef = useRef(null);

  // (f) Обработчик сообщений [go]
  const handlerMessage = (e) => {
    setTextMessage(e.target.value);
  };

  // (f) Отправка сообщений
  const sendMessage = async () => {
    if (!textMessage) return;

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
        dateAt: serverTimestamp(),
        text: text
      });
    }

    await sendNewMessageToYourself(textMessage);
    setTextMessage('');
  };

  useEffect(() => {
    const input = inputRef.current;

    const checkKeyDown = (e) => {
      if (e.key === 'Enter') {
        btnRef.current.click();
      }
    };

    input.addEventListener('keydown', checkKeyDown);

    return () => input.removeEventListener('keydown', checkKeyDown);
  }, []);

  useEffect(() => {
    btnRef.current.onmousedown = (e) => {
      if (document.activeElement === inputRef.current) {
        e.preventDefault();
      }
    };
  }, []);

  return (
    <div className={styles.chatInputWrapper}>
      <input
        value={textMessage}
        onChange={handlerMessage}
        placeholder="Напишите сообщение..."
        type="text"
        ref={inputRef}
        onFocus={() => setTimeout(handlerScroll, 250)}
      />
      <button type="button" ref={btnRef} onClick={sendMessage}></button>
    </div>
  );
};

export { InputChat };
