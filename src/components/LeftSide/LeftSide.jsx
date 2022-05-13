import { useEffect, useState } from "react";

// Firebase
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";

// Components
import styles from "./LeftSide.module.scss";
import { PersonBox } from "../PersonBox";

const LeftSide = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const referens = ref(db, `/users`);
    onValue(referens, (snapshot) => {
      setUsers(snapshot.val());
    });
  }, []);

  return (
    <>
      <div className={styles.leftSide}>
        {users &&
          Object.entries(users).map((user) => (
            <PersonBox
              key={user[0]}
              firstName={user[1].firstName}
              lastName={user[1].lastName}
              department={user[1].department}
            />
          ))}
      </div>
    </>
  );
};

export { LeftSide };
