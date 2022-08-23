// {
//   "rules": {
//     "DBMessages": {
//       	// ".read": "auth != null",
//       	// ".write": "auth != null",
//         "$uid2": {
//           ".read": "$uid2 === auth.uid",
//           "dialogues": {
//             "$uid": {
//               ".write": "$uid === auth.uid || $uid2 === auth.uid",
//             }
//           }
//         }
//     },
//     "users": {
//       ".read": true,
//       "$uid": {
//         ".write": "$uid === auth.uid",
//       }
//     }
//   }
// }


// ПРОВЕРИТЬ ДАЗУ ДАННЫХ ЧТОБЫ ОНА БЫЛА ОДНА А НЕ 2

const messages1 = { // Все исходящие сообщения пользователей
    'uid1': { // СООБЩЕНИЯ КАКОГО ПОЛЬЗОВАТЕЛЯ [FROM:]
        'uid3': [ // СООБЩЕНИЯ ДЛЯ КОГО [TO:]
            {
                date: '21.02.2022',
                message: 'Привет'
            },
            {
                date: '21.02.2022',
                message: 'Как дела?'
            },
            {
                date: '21.02.2022',
                message: 'Классный день сегодня!'
            }
        ],
        'uid4': [ // СООБЩЕНИЯ ДЛЯ КОГО [TO:]
            {
                date: '21.02.2022',
                message: 'Привет'
            },
            {
                date: '21.02.2022',
                message: 'Как дела?'
            },
            {
                date: '21.02.2022',
                message: 'Классный день сегодня!'
            }
        ]
    },
    'uid2': { // СООБЩЕНИЯ КАКОГО ПОЛЬЗОВАТЕЛЯ [FROM:]
        'uid1': [ // СООБЩЕНИЯ ДЛЯ КОГО [TO:]
            {
                date: '21.02.2022',
                message: 'Привет'
            },
            {
                date: '21.02.2022',
                message: 'Как дела?'
            },
            {
                date: '21.02.2022',
                message: 'Классный день сегодня!'
            }
        ],
        'uid3': [ // СООБЩЕНИЯ ДЛЯ КОГО [TO:]
            {
                date: '21.02.2022',
                message: 'Привет'
            },
            {
                date: '21.02.2022',
                message: 'Как дела?'
            },
            {
                date: '21.02.2022',
                message: 'Классный день сегодня!'
            }
        ]
    }
}

const DATE = new Date()

const DBMessages = {
    "uid1": {
        "dialogues": {
            "uid3": {
                "haveNewMessages": false,
                "message": [{
                        "date": DATE.toISOString(),
                        "dateAt": DATE.getTime(),
                        "text": "Привет!"
                    },
                    {
                        "date": DATE.toISOString(),
                        "dateAt": DATE.getTime(),
                        "text": "Как дела?"
                    }
                ]
            }
        }
    }
}

console.log(new Date().toISOString());
console.log(new Date().getTime());