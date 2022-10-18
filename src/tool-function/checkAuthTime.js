const checkAuthTime = (authTime) => {
  const timeOut = new Date().getTime() - authTime;
  // const authDuration = 3600000;
  const authDuration = 24 * 60 * 60 * 1000;

  if (timeOut > authDuration) {
    return false;
    // console.log("Токен умер. Вы вышли!");
    // auth.signOut();
    // localStorage.setItem("isLoggedIn", false);
  } else {
    console.log(
      `Осталось [ ${(
        (authDuration - timeOut) /
        1000
      ).toFixed()} ] сек. до конца сессии`
    );
    return true;
  }
};

export { checkAuthTime };
