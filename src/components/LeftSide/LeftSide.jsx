// import { useEffect, useState } from "react";

// Firebase
import { auth } from "../../firebase";
// import { db } from "../../firebase";
// import { onValue, ref } from "firebase/database";

// Store
import { useSelector } from "react-redux";
// import { userDBAction } from "../../store/slice/userDBSlice";

// Components
import styles from "./LeftSide.module.scss";
import { PersonBox } from "../PersonBox";

const LeftSide = () => {
  const { usersData } = useSelector((state) => state.userDB);
  // const [users, setUsers] = useState(null);

  return (
    <>
      <div className={styles.leftSide}>
        {usersData &&
          Object.values(usersData)
            .filter((user) => user.uid !== auth.currentUser.uid)
            .map((user) => (
              <PersonBox
                key={user.uid}
                firstName={user.firstName}
                lastName={user.lastName}
                department={user.department}
                uid={user.uid}
              />
            ))}
      </div>
    </>
  );
};

export { LeftSide };
