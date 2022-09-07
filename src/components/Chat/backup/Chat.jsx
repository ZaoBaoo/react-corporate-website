// Styles
import styles from "./Chat.module.scss";

// Components
import { Dialog } from "../Dialog";
import { InputChat } from "../InputChat/InputChat";
import { ChatHeader } from "../ChatHeader/ChatHeader";

const Chat = () => {
  return (
    <div className={styles.chat}>
      <div className={styles.chatContent}>
        <ChatHeader />
        <div className={styles.chatMessages}>
          <div className={styles.chatMessagesWrapper}>
            <Dialog />
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
