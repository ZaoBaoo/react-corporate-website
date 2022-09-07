import { useState } from "react";
import { useSelector } from "react-redux";

// Components
import { PageUser } from "../PageUser";
import styles from "./RightSide.module.scss";
import { WrapperPanel } from "../WrapperPanel";
import { Chat } from "../Chat/Chat";

// Store

const RightSide = () => {
  const { uidForShowUserPage, uidForShowChat } = useSelector(
    (store) => store.modalUser
  );
  return (
    <div className={styles.rightSide} style={{ pointerEvents: "auto" }}>
      <WrapperPanel>{uidForShowChat ? <Chat /> : <PageUser />}</WrapperPanel>
    </div>
  );
};

export { RightSide };
