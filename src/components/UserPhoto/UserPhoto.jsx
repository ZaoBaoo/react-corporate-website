import { useState, useEffect } from "react";

import styles from "./UserPhoto.module.scss";
import cn from "classnames";

// STORAGE
import { storage, auth, db } from "../../firebase";
import { ref as dbRef, update } from "firebase/database";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
  deleteObject,
} from "firebase/storage";

const UserPhoto = ({ size, src, uid }) => {
  const [imagesStatus, setImagesStatus] = useState({
    isLoad: false,
    progress: 0,
  });

  const formHandler = (e) => {
    e.preventDefault();
    uploadFiles(e.target.files[0]);
  };

  const uploadFiles = async (file) => {
    try {
      //
      if (!file) return;
      setImagesStatus((state) => ({ ...state, isLoad: true }));

      const refFolder = ref(storage, `/avatars/${auth.currentUser.uid}/`);
      const refFile = ref(
        storage,
        `/avatars/${auth.currentUser.uid}/${file.name}`
      );

      // Получаем кол-во фото у пользователя
      // Одно или ноль
      const list = await listAll(refFolder);

      if (list?.items[0].name === file.name) {
        setImagesStatus((state) => ({ ...state, isLoad: false }));
        throw new Error("Такой файл уже сушествует");
      }

      // Пустая переменная
      let namePhotoForRemove;

      // Проверям есть ли загруженное фото
      // Если есть, то помечаем его
      if (list?.items?.length) {
        namePhotoForRemove = list?.items[0].name;
      }

      const uploadTask = uploadBytesResumable(refFile, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setImagesStatus((state) => ({ ...state, progress: prog }));
        },
        (err) => {
          setImagesStatus((state) => ({ progress: 0, isLoad: false }));
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            const removePhoto = () => {
              // Ссылка на файл для удаления
              const refFile = ref(
                storage,
                `/avatars/${auth.currentUser.uid}/${namePhotoForRemove}`
              );

              deleteObject(refFile).then(
                console.log(`Файл ${namePhotoForRemove} удален`)
              );
            };

            namePhotoForRemove && removePhoto();

            addAvatarUrl(url);

            // setImagesStatus((state) => ({ ...state, isLoad: false }));
            setImagesStatus((state) => ({ progress: 0, isLoad: false }));
          });
        }
      );
    } catch (error) {
      console.dir(error.message);
    }
  };

  const addAvatarUrl = (url) => {
    update(dbRef(db, `/users/${auth.currentUser.uid}`), {
      urlAvatar: url,
    });
  };

  return (
    <div
      className={cn({
        [styles.l]: size === "l",
        [styles.m]: size === "m",
        [styles.s]: size === "s",
      })}
    >
      <img src={src} alt="" className={styles.img} />
      {size === "l" && auth.currentUser.uid === uid && (
        <>
          <form onChange={formHandler}>
            <input
              type="file"
              accept="image/*"
              id="fileLoad"
              disabled={imagesStatus.isLoad}
            />
            <label htmlFor="fileLoad">Изменить</label>
            {imagesStatus.isLoad && <span>{imagesStatus.progress} %</span>}
          </form>
        </>
      )}
    </div>
  );
};

export { UserPhoto };
