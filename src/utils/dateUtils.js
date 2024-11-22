import { weekNames, monthNames } from "@/config/dateNames";
import { parse } from "qs";

const toString = (date) => date.toJSON().split("T")[0];
export const toArray = (dateString) => dateString.split("-");
const getFirstDayOfWeek = (dateString) => {
  const d = new Date(dateString);
  const w = d.getDay();
  d.setDate(d.getDate() - w);
  return d;
};

const correctionToZero = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};

//////////////////////////

export const formatBirthday = (dateString) => {
  if (
    !dateString ||
    dateString === "" ||
    dateString === "null" ||
    dateString === "0000-00-00"
  )
    return "-";
  const [, month, day] = toArray(dateString);
  return `${day} de ${monthNames[month].short}.`;
};
export const formatDateTable = (dateString) => {
  if (!dateString) return "";
  const d = dateString.split(" ")[0];
  const [year, month, day] = toArray(d);
  return `${day} de ${monthNames[month].short}. ${year}`;
};

export const getDateFocus = () => new Date().toJSON().split("T")[0];

export const getHour = () => {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date());
};

export const parseDay = (dateString) => {
  const date = new Date(dateString);
  const w = date.getDay();
  const [year, m, day] = dateString.split("-");
  return {
    day,
    year,
    month: {
      long: monthNames[m].long,
      short: monthNames[m].short,
    },
    weekDay: {
      long: weekNames[w].long,
      short: weekNames[w].short,
    },
  };
};

export const getDayTitle = (dateString, isToday) => {
  const d = parseDay(dateString);
  return `${isToday ? "Hoy: " : ""}${d.weekDay.long} ${d.day} de ${
    d.month.long
  }`;
};

export const parseHour = (hourString) => {
  const [hour, minute] = hourString.split(":");
  return {
    hour,
    minute,
  };
};

export const normalizeHour = (hourString) => {
  if (!hourString) {
    return "--:--";
  }
  const { hour, minute } = parseHour(hourString);
  return `${hour}:${minute}`;
};

export const addDurationToStartTime = (startTime, duration) => {
  const { hour, minute } = parseHour(startTime);
  const newHour = parseInt(hour, 10);
  const newMinute = parseInt(minute, 10) + parseInt(duration, 10);
  let finalHour = newHour + Math.floor(newMinute / 60);
  finalHour = finalHour < 10 ? `0${finalHour}` : finalHour;
  let finalMinute = newMinute % 60;
  finalMinute = finalMinute < 10 ? `0${finalMinute}` : finalMinute;
  return `${finalHour}:${finalMinute}`;
};

// INTERVALS //////////////

export const getDayInterval = (dateString) => {
  const d = new Date(dateString);

  const from_day = toString(d);
  return { from_day, to_day: from_day };
};

export const getWeekInterval = (dateString) => {
  const d = getFirstDayOfWeek(dateString);
  const from_day = toString(d);
  d.setDate(d.getDate() + 6);
  const to_day = toString(d);
  return { from_day, to_day };
};

export const getMonthInterval = (dateString) => {
  const [y, m] = dateString.split("-");

  const d = new Date(y, parseInt(m, 10) - 1, "01");
  const from_day = toString(d);
  d.setMonth(d.getMonth() + 1);
  const to_day = toString(d);
  return { from_day, to_day };
};

export const getYearInterval = (dateString) => {
  const [y] = dateString.split("-");
  const from_day = `${y}-01-01`;
  const to_day = `${parseInt(y, 10) + 1}-01-01`;
  return { from_day, to_day };
};

export const getYearIntervalHistorial = (dateString) => {
  const [y, m, d] = dateString.split("-");

  const da = new Date(y, m, d);
  da.setMonth(da.getMonth() - 13);
  const from_day = toString(da);
  return { from_day, to_day: dateString };
};

///////////
export const getWeekSequence = (dateString) => {
  const weekMap = [];

  const d = getFirstDayOfWeek(dateString);

  const interval = [];

  let num = 0;
  while (num < 6) {
    const date = toString(d);

    if (num === 0 || num === 5) {
      interval.push(date);
    }

    const [, monthNum, dayNum] = toArray(date);
    weekMap.push({
      date,
      day: { num: dayNum, month: monthNames[monthNum].short },
      weekDay: { num, name: weekNames[num].short },
    });

    d.setDate(d.getDate() + 1);
    num++;
  }

  const [, sm, sd] = interval[0].split("-");
  const [, em, ed] = interval[1].split("-");
  const title = `Del ${sd}/${sm} al ${ed}/${em}`;

  return { title, weekMap };
};

export const getMonthSequence = (dateString) => {
  const monthMap = [];

  const [year, month] = toArray(dateString);

  const monthNum = parseInt(month, 10) - 1;

  const d = new Date(year, monthNum, "01");

  let w = d.getDay() - 1;
  w = w < 0 ? 6 : w;

  let num = -1 * w;
  while (num < 31) {
    if (num < 0) {
      monthMap.push(null);
    } else {
      const date = toString(d);

      const [, m, day] = toArray(date);
      const mNum = parseInt(m, 10) - 1;

      const weekDay = d.getDay();
      if (mNum === monthNum) {
        monthMap.push({ date, day, weekDay });
      }

      d.setDate(d.getDate() + 1);
    }

    num++;
  }

  const title = `${monthNames[month].long} ${year}`;

  const headers = Object.entries(weekNames)
    .sort((a, b) => a[0] - b[0])
    .map(([num, { short }]) => ({ num, short }));

  return { headers, title, monthMap };
};
export const getYearSequence = (dateString) => {
  const yearMap = [];

  const [year] = toArray(dateString);

  let num = 1;
  while (num <= 12) {
    const month = correctionToZero(num);

    yearMap.push({
      year,
      month,
      num,
      name: monthNames[month].long,
    });
    num++;
  }

  return { title: year, yearMap };
};

// NAVIGATION ///////////////
export const navigateDay = (dateString, dir) => {
  const d = new Date(dateString);
  const w = d.getDay();
  const mult = (w === 0 && dir === -1) || (w === 5 && dir === 1) ? 2 : 1;
  d.setDate(d.getDate() + dir * mult);
  return toString(d);
};

export const navigateWeek = (dateString, dir) => {
  const d = new Date(dateString);
  const mult = 7;
  d.setDate(d.getDate() + dir * mult);
  return toString(d);
};

export const navigateMonth = (dateString, dir) => {
  const [yearString, monthString] = toArray(dateString);

  const monthNum = parseInt(monthString, 10);
  const yearNum = parseInt(yearString, 10);

  let newMonth = monthNum + dir;
  let newYear = yearNum;

  if (newMonth < 1) {
    newMonth = 12;
    newYear = yearNum - 1;
  }
  if (newMonth > 12) {
    newMonth = 1;
    newYear = yearNum + 1;
  }

  return `${newYear}-${correctionToZero(newMonth)}-01`;
};

export const navigateYear = (dateString, dir) => {
  const [yearString] = toArray(dateString);
  const yearNum = parseInt(yearString, 10);
  const newYear = yearNum + dir;
  return `${newYear}-01-01`;
};
