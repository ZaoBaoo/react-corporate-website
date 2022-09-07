import { useState, useEffect, useRef } from "react";

// Components
import { Oval } from "react-loader-spinner";

// Styles
import styles from "./UserPhoto.module.scss";
import cn from "classnames";

// STORAGE
import { auth, db } from "../../firebase";
import { ref as dbRef, update } from "firebase/database";

const UserPhoto = ({ size, src, uid }) => {
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputFile = useRef(null);

  const formHandler = (e) => {
    e.preventDefault();
    uploadFiles(e.target.files[0]);
  };

  const uploadFiles = async (file) => {
    if (!file) return;

    setImageIsLoading(true);

    const formData = new FormData();

    formData.append("image", file);

    try {
      const data = await fetch(
        `https://compress-pictures.herokuapp.com/api?uid=${auth.currentUser.uid}`,
        {
          method: "POST",
          body: formData,
        }
      );

      inputFile.current.value = "";

      if (data.status !== 200) {
        switch (data.status) {
          case 415:
            setError("Данный формат файла не поддерживается");
            break;

          default:
            setError("Возникла ошибка");
            break;
        }

        throw new Error("Error");
      }

      await addAvatarUrl(await data.json());
    } catch (error) {
      setError("Произошла ошибка!");
      setImageIsLoading(false);
      throw new Error(error);
    }
  };

  const addAvatarUrl = async (data) => {
    await update(dbRef(db, `/users/${auth.currentUser.uid}`), {
      urlAvatar: data.url,
    });
    setImageIsLoading(false);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 3000);
    }
  }, [error]);

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
        <form onChange={formHandler}>
          <input
            ref={inputFile}
            type="file"
            accept="image/*"
            id="fileLoad"
            disabled={imageIsLoading}
          />
          <label
            style={{ zIndex: imageIsLoading ? "-100" : "3" }}
            htmlFor="fileLoad"
          >
            Изменить
          </label>
          {imageIsLoading && (
            <Oval
              wrapperClass={styles.oval}
              visible={true}
              strokeWidth={1.2}
              strokeWidthSecondary={1.2}
              secondaryColor="#ffffff"
            />
          )}
          {error && <span className={styles.error}>{error}</span>}
        </form>
      )}
    </div>
  );
};

export { UserPhoto };
