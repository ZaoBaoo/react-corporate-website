import {
    auth
} from '../firebase'

const checkSessionTimeOut = (user) => {
    // Проверяем длительность сессии
    // Если она больше 3600000мс(1 час) то завершаем ее
    const res = new Date().getTime() - user.reloadUserInfo.lastLoginAt;
    const timeOut = 3600000;
    if (res > timeOut) {
        console.log("Токен умер. Вы вышли!");
        auth.signOut();
        localStorage.setItem('isLoggedIn', false)
    } else {
        console.log(
            `Осталось [ ${(
                (timeOut - res) /
                1000
              ).toFixed()} ] сек. до конца сессии`
        );
    }
}

export {
    checkSessionTimeOut,
}