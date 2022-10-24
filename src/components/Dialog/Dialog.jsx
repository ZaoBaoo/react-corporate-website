import { useEffect, useRef } from 'react';

// Components
import { Message } from '../Message';

// Styles
import styles from './Dialog.module.scss';

// Hooks
import { useLoadChat } from '../../hooks/useLoadChat';

// Store
import { useSelector } from 'react-redux';

// Tools func
import { getDateHoursAndMinutes } from '../../tool-function/getDateHoursAndMinutes.js';

const Dialog = ({ handlerScroll }) => {
  const [messages] = useLoadChat();

  const dialogRef = useRef(null);

  const { uidForShowChat } = useSelector((state) => state.modalUser);

  useEffect(() => {
    if (messages.length) {
      if (messages.length === dialogRef.current.childElementCount) {
        handlerScroll();
      }
    }
  }, [messages, handlerScroll]);

  return (
    <div ref={dialogRef} className={styles.dialog}>
      {messages &&
        messages.map((i) => {
          const position = i.from === uidForShowChat ? 'left' : 'right';
          const text = i.text;
          const key = i.dateAt;
          const time = getDateHoursAndMinutes(i.dateAt)[0];
          const date = getDateHoursAndMinutes(i.dateAt)[1];

          return (
            <Message
              position={position}
              text={text}
              date={date}
              time={time}
              key={key}
            />
          );
        })}
    </div>
  );
};

export { Dialog };
