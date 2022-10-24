const getDateHoursAndMinutes = (fullDate) => {
  const dateJs = new Date(fullDate);
  const minutes = dateJs.getMinutes().toString();
  const hours = dateJs.getHours().toString();

  const fix = (data) => {
    if (data.length < 2) {
      data = `${0}${data}`;
    }
    return data;
  };

  const time = `${fix(hours)}.${fix(minutes)}`;
  const date = `${dateJs.getDate()}.${
    dateJs.getMonth() + 1
  }.${dateJs.getFullYear()}`;

  return [time, date];
};

export { getDateHoursAndMinutes };
