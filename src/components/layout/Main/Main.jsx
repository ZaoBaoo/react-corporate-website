import { useState } from "react";
// Firebase
import { auth } from "../../../firebase";

// ID
import { v4 as idGenerator } from "uuid";

// Store
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../store/slice/loginSlice";
import { userDBAction } from "../../../store/slice/userDBSlice";

// Components
import { Header } from "../../Header";
import { Push } from "../../Push";
import { Search } from "../../Search";
import { Container } from "../../Container";

import miniUserIcon from "../../../img/miniUserIcon.png";
import messageIcon from "../../../img/messageIcon.svg";
// Style
import styles from "./Main.module.scss";

const Main = () => {
  return (
    <>
      <Header />
      <Push>
        <Search />
      </Push>

      <div className={styles.generalBlock}>
        <Container>
          <div className={styles.generalContent}>
            <div className={styles.leftSide}>
              <div className={styles.personBox}>
                <div className={styles.infoUser}>
                  <div className={styles.imgUser}>
                    <img src={miniUserIcon} alt="" />
                  </div>
                  <div className={styles.infoName}>
                    <span>Марина Путина</span>
                    <div className={styles.infoDepartment}>СММ специалист</div>
                  </div>
                </div>
                <img
                  src={messageIcon}
                  alt=""
                  className={styles.messageUserIcon}
                />
              </div>

              <div className={styles.personBox}>
                <div className={styles.infoUser}>
                  <div className={styles.imgUser}>
                    <img src={miniUserIcon} alt="" />
                  </div>
                  <div className={styles.infoName}>
                    <span>Марина Путина</span>
                    <div className={styles.infoDepartment}>СММ специалист</div>
                  </div>
                </div>
                <img
                  src={messageIcon}
                  alt=""
                  className={styles.messageUserIcon}
                />
              </div>

              <div className={styles.personBox}>
                <div className={styles.infoUser}>
                  <div className={styles.imgUser}>
                    <img src={miniUserIcon} alt="" />
                  </div>
                  <div className={styles.infoName}>
                    <span>Марина Путина</span>
                    <div className={styles.infoDepartment}>СММ специалист</div>
                  </div>
                </div>
                <img
                  src={messageIcon}
                  alt=""
                  className={styles.messageUserIcon}
                />
              </div>

              <div className={styles.personBox}>
                <div className={styles.infoUser}>
                  <div className={styles.imgUser}>
                    <img src={miniUserIcon} alt="" />
                  </div>
                  <div className={styles.infoName}>
                    <span>Марина Путина</span>
                    <div className={styles.infoDepartment}>СММ специалист</div>
                  </div>
                </div>
                <img
                  src={messageIcon}
                  alt=""
                  className={styles.messageUserIcon}
                />
              </div>
            </div>
            <div className={styles.rightSide}></div>
          </div>
        </Container>
      </div>
    </>
  );
};

export { Main };
