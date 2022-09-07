import { useState, useEffect } from "react";

// Store
import { useSelector } from "react-redux";

// Firebase
import { onValue, ref } from "firebase/database";
import { auth, db } from "../firebase";

const getSortMessage = (message) => message.sort((a, b) => a.dateAt - b.dateAt);
const getConcatArray = (arr1, arr2) => {
  let newArr1 = [];
  let newArr2 = [];
  if (arr1.length) {
    newArr1 = [...arr1];
  }
  if (arr2.length) {
    newArr2 = [...arr2];
  }
  return [...newArr1, ...newArr2];
};

const useLoadChat = () => {
  const [myMessagesList, setMyMessagesList] = useState([]);
  const [userMessagesList, setUserMessagesList] = useState([]);
  const [allMessages, setAllMessages] = useState([]);

  const { uidForShowChat } = useSelector((state) => state.modalUser);

  useEffect(() => {
    if (uidForShowChat) {
      return auth.onAuthStateChanged(async (user) => {
        if (user) {
          console.log("start");
          const messageProcessing = (rawData) => {
            return rawData.val() ? Object.values(rawData.val().message) : [];
          };

          const myMessages = new Promise((resolve, reject) => {
            onValue(
              ref(
                db,
                `/DBMessages/${auth.currentUser.uid}/dialogues/${uidForShowChat}`
              ),
              (snapshot) => {
                console.log("Сообщения мои");
                const dataMessage = messageProcessing(snapshot);
                setMyMessagesList(dataMessage);
                resolve(dataMessage);
              }
            );
          });

          const userMessages = new Promise((resolve, reject) => {
            onValue(
              ref(
                db,
                `/DBMessages/${uidForShowChat}/dialogues/${auth.currentUser.uid}`
              ),
              (snapshot) => {
                console.log("Сообщения пользователя");
                const dataMessage = messageProcessing(snapshot);
                setUserMessagesList(dataMessage);
                resolve(dataMessage);
              }
            );
          });

          console.log("Promise.all");

          const response = await Promise.all([myMessages, userMessages]);

          const messagesUnion = getConcatArray(response[0], response[1]);

          const sortMessage = getSortMessage(messagesUnion);

          setAllMessages(sortMessage);
        }
      });
    }
  }, [uidForShowChat]);

  useEffect(() => {
    if (allMessages) {
      setAllMessages(getSortMessage([...myMessagesList, ...userMessagesList]));
    }
  }, [myMessagesList, userMessagesList]);

  return [allMessages];
};

export { useLoadChat };
