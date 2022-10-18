import { useRef } from 'react';

// Styles
import styles from './Chat.module.scss';

// Components
import { Dialog } from '../Dialog';
import { InputChat } from '../InputChat';
import { ChatHeader } from '../ChatHeader';

const Chat = () => {
  const elementScroll = useRef(null);

  const handlerScroll = () => {
    elementScroll.current.scrollTop = 99999;
  };

  return (
    <div className={styles.chat}>
      <div className={styles.chatContent}>
        <ChatHeader />
        <div ref={elementScroll} className={styles.chatMessages}>
          <div className={styles.chatMessagesWrapper}>
            <Dialog handlerScroll={handlerScroll} />
          </div>
        </div>
        <div className={styles.chatInputWrapper}>
          <InputChat handlerScroll={handlerScroll} />
        </div>
      </div>
    </div>
  );
};

export { Chat };
