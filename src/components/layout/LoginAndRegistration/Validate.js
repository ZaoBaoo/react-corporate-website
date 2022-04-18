const emailVal = {
    required: true,
    minLength: {
        value: 6,
        message: 'Слишком короткий'
    },
    pattern: {
        value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        message: 'Заполнено неправильно'
    }
}

const passVal = {
    required: true,
    minLength: {
        value: 7,
        message: 'Слишком короткий [мин. 7 символов]'
    }
}

const textVal = {
    required: true,
    minLength: {
        value: 2,
        message: '[мин. 2 символа]'
    },
    pattern: {
        value: /^[А-Яа-яA-Za-z]+$/,
        message: 'Может содержать только буквы'
    },
}

const telVal = {
    required: true,
    pattern: {
        value: /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm,
        message: 'Заполнено неправильно'
    },
    minLength: {
        value: 15
    },
}

export {
    emailVal,
    passVal,
    textVal,
    telVal
}