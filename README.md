
# 👥 Корпоративная сеть для сотрудников

Веб-приложение для внутреннего взаимодействия сотрудников компании. Позволяет удобно искать коллег, просматривать профили и быстро связываться с любым сотрудником в режиме реального времени.

---

## Данные для тестового входа
- Логин: yurkin.daniil96@gmail.com
- Пароль: 123456789

---

## 🚀 Демо

- 🔗 **Онлайн-доступ:** [react-corporate-website](https://zaobaoo.github.io/react-corporate-website)
- 🎥 **Видео-демо:** [ссылка](https://zaobaoo.github.io/demo-pages/corporate-website.html)

---

## 🧩 Возможности

- Регистрация и авторизация
- Редактируемый профиль: имя, фамилия, отдел, должность, телефон, аватарка
- Поиск по имени, фамилии, должности, отделу
- Реал-тайм чат между сотрудниками
- Сброс пароля

---

## 🛠️ Технологии

**Frontend:**
- [React](https://react.dev/)
- [React Router DOM](https://reactrouter.com/) — маршрутизация
- [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) — валидация форм
- [Redux Toolkit](https://redux-toolkit.js.org/) - стейт менеджер
- [Framer Motion](https://www.framer.com/motion/) — анимации
- [Firebase](https://firebase.google.com/) — аутентификация, база данных, хранение файлов
- [Sass](https://sass-lang.com/) — стили
- [React Tooltip](https://react-tooltip.com/) — тултипы

**Сборка и инструменты:**
- `gh-pages` — деплой на GitHub Pages
- `eslint` + `prettier` — линтинг и форматирование кода

---

## ⚙️ Как запустить

```bash
# Установка зависимостей
npm install

# Локальный запуск
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр прод-версии
npm run preview

# Линтинг
npm run lint
```

---

## 📁 Структура проекта

- `/src` — исходный код
- `/public` — статика
- `/build`
- `.eslintrc`, `.prettierrc` — правила линтера и форматтера

---

## 🖥️ Деплой

Проект развёрнут на **GitHub Pages** по адресу:

🔗 [https://zaobaoo.github.io/react-corporate-website/](https://zaobaoo.github.io/react-corporate-website/)

Для деплоя используется `gh-pages`:

```bash
yarn build
npx gh-pages -d dist
```
