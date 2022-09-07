import { useState, useEffect } from "react";

// Animate
import { motion, AnimatePresence } from "framer-motion";

// Styles
import styles from "./WrapperPanel.module.scss";
import { useSelector } from "react-redux";

const pVariants = {
  hidden: {
    opacity: 0,
    x: -500,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 500,
  },
};

let countUpdatePage = 0;

const WrapperPanel = ({ children }) => {
  const [showBlock, setShowBlock] = useState(true);

  const { uidForShowUserPage, uidForShowChat } = useSelector(
    (state) => state.modalUser
  );
  const { isMobileSize } = useSelector((state) => state.mobile);

  useEffect(() => {
    if (countUpdatePage < 2) {
      countUpdatePage++;
      return;
    }
    if (uidForShowUserPage && !isMobileSize) {
      setShowBlock(false);
      setTimeout(() => {
        setShowBlock(true);
      }, 400);
    }
  }, [uidForShowUserPage]);

  return (
    <AnimatePresence initial={false}>
      {showBlock && (
        <motion.div
          initial={"hidden"}
          animate={"visible"}
          exit="exit"
          transition={{ duration: 0.2 }}
          variants={pVariants}
          className={styles.wrapperPanel}
          style={uidForShowChat ? { padding: "0" } : { padding: "5rem" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { WrapperPanel };
