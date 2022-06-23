import { useEffect, useState } from "react";

// Store
import { searchAction } from "../../store/slice/searchSlice";
import { useDispatch, useSelector } from "react-redux";

// Style
import styles from "./Search.module.scss";

const Search = () => {
  const [showDropDown, setDropDown] = useState(false);
  const [searchMode, setSearchMode] = useState("");

  const dispatch = useDispatch();

  // (f) Записываем в store текст для поиска
  const listenerInputSearch = (e) => {
    dispatch(searchAction.setTextForSearch(e.target.value.toLowerCase()));
  };

  // (f) Записываем в store и state мод для поиска
  const switchSearchMode = (e) => {
    if (e.target.id === searchMode) {
      setSearchMode("");
      dispatch(searchAction.setSearchMode(""));
      return;
    }
    setSearchMode(e.target.id);
    dispatch(searchAction.setSearchMode(e.target.id));
  };

  // (f) Переключение видимости DropDown
  const toggleVisibilityDropDown = () => {
    setDropDown(!showDropDown);
  };

  // (e) при клике на НЕ DropDown закрыть DropDown
  useEffect(() => {
    const event = (e) => {
      if (!e.target.hasAttribute("data-dropdown")) {
        setDropDown(false);
      }
    };
    if (showDropDown) {
      document.addEventListener("click", event);
    }
    return () => {
      document.removeEventListener("click", event);
    };
  }, [showDropDown]);

  return (
    <div className={styles.search}>
      <input
        type="search"
        spellCheck={false}
        placeholder="Поиск..."
        onChange={listenerInputSearch}
      />

      <div className={styles.dropBtn} onClick={toggleVisibilityDropDown}>
        <input type="text" readOnly={true} />
      </div>

      {showDropDown && (
        <>
          <div className={styles.dropDown} data-dropdown>
            <div className={styles.dropDownHeader} data-dropdown>
              <span data-dropdown>Поиск по:</span>
            </div>

            <dir data-dropdown className={styles.groupRadio}>
              <input
                data-dropdown
                type="checkbox"
                name="search"
                id="firstName"
                onChange={switchSearchMode}
                checked={searchMode === "firstName" ? true : false}
              />
              <label data-dropdown htmlFor="firstName">
                Имя
              </label>
            </dir>

            <dir data-dropdown className={styles.groupRadio}>
              <input
                data-dropdown
                type="checkbox"
                name="search"
                id="lastName"
                onChange={switchSearchMode}
                checked={searchMode === "lastName" ? true : false}
              />
              <label data-dropdown htmlFor="lastName">
                Фамилия
              </label>
            </dir>

            <dir data-dropdown className={styles.groupRadio}>
              <input
                data-dropdown
                type="checkbox"
                name="search"
                id="department"
                onChange={switchSearchMode}
                checked={searchMode === "department" ? true : false}
              />
              <label data-dropdown htmlFor="department">
                Отдел
              </label>
            </dir>
          </div>
        </>
      )}
    </div>
  );
};

export { Search };
