const getDateHoursAndMinutes = (date) => {
  const dateJs = new Date(date);
  const minutes = dateJs.getMinutes().toString();
  const hourse = dateJs.getHours().toString();

  const fix = (data) => {
    if (data.length < 2) {
      data = `${0}${data}`;
    }
    return data;
  };

  return `${fix(hourse)}.${fix(minutes)}`;
};

export { getDateHoursAndMinutes };
