const addSuffixDate = (date) => {
  let strDate    = date.toString();
  const lastChar = strDate.charAt(strDate.length - 1);

  if (lastChar === '1' && strDate !== '11') {
    strDate = `${strDate}st`;
  } else if (lastChar === '2' && strDate !== '12') {
    strDate = `${strDate}nd`;
  } else if (lastChar === '3' && strDate !== '13') {
    strDate = `${strDate}rd`;
  } else {
    strDate = `${strDate}th`;
  }
  return strDate;
};

const dateFormatter =  (timestamp,{ monthLength = 'short', dateSuffix = true } = {}) => {
  let months;
  let meridiem;
  let dayOfMonth;
  if (monthLength === 'short') {
    months = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'Jun',
      6: 'Jul',
      7: 'Aug',
      8: 'Sep',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec'
    };
  } else {
    months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    };
  }

  const dateObj = new Date(timestamp);
  const formattedMonth = months[dateObj.getMonth()];

  if (dateSuffix) {
    dayOfMonth = addSuffixDate(dateObj.getDate());
  } else {
    dayOfMonth = dateObj.getDate();
  }

  const year = dateObj.getFullYear();

  let hour;
  if (dateObj.getHours > 12) {
    hour = Math.floor(dateObj.getHours() / 2);
  } else {
    hour = dateObj.getHours();
  }
  if (hour === 0) {
    hour = 12;
  }

  const mins = dateObj.getMinutes();

  if (dateObj.getHours() >= 12) {
    meridiem = 'pm';
  } else {
    meridiem = 'am';
  }

  return `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${mins} ${meridiem}`;

};

module.exports = dateFormatter;