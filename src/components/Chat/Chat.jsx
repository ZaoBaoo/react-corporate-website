import { useRef } from "react";

// Styles
import styles from "./Chat.module.scss";

// Components
import { Dialog } from "../Dialog";
import { InputChat } from "../InputChat/InputChat";
import { ChatHeader } from "../ChatHeader/ChatHeader";

const Chat = () => {
  const elemetnScroll = useRef(null);

  const handlerScroll = () => {
    elemetnScroll.current.scrollTop = 99999;
  };

  return (
    <div className={styles.chat}>
      <div className={styles.chatContent}>
        <ChatHeader />
        <div ref={elemetnScroll} className={styles.chatMessages}>
          <div className={styles.chatMessagesWrapper}>
            <Dialog handlerScroll={handlerScroll} />
          </div>
        </div>
        <div className={styles.chatInputWrapper}>
          <InputChat />
        </div>
      </div>
    </div>
  );
};

export { Chat };
