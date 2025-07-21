const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayOfWeekNames = ["SUN", "mon", "TUE", "WED", "THU", "FRI", "SAT"];

const dayOfWeekFullNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function twoDigitPad(num) {
  return num < 10 ? "0" + num : num;
}

export const formatDate = (date, patternStr) => {
  if (date != "Invalid Date") {
    if (!patternStr) {
      patternStr = "M/d/yyyy";
    }
    let day = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      second = date.getSeconds(),
      miliseconds = date.getMilliseconds(),
      h = hour % 12,
      hh = twoDigitPad(h),
      HH = twoDigitPad(hour),
      mm = twoDigitPad(minute),
      ss = twoDigitPad(second),
      aaa = hour < 12 ? "AM" : "PM",
      EEEE = dayOfWeekNames[date.getDay()],
      bbbb = dayOfWeekFullNames[date.getDay()],
      EEE = EEEE.substr(0, 3),
      dd = twoDigitPad(day),
      M = month + 1,
      MM = twoDigitPad(M),
      MMMM = monthNames[month],
      MMM = MMMM.substr(0, 3),
      yyyy = year + "",
      yy = yyyy.substr(2, 2);
    // checks to see if month name will be used
    patternStr = patternStr
      .replace("hh", hh)
      .replace("h", h)
      .replace("HH", HH)
      .replace("H", hour)
      .replace("mm", mm)
      .replace("m", minute)
      .replace("ss", ss)
      .replace("s", second)
      .replace("S", miliseconds)
      .replace("dd", dd)
      .replace("d", day)
      .replace("bbbb", bbbb)
      .replace("EEEE", EEEE)
      .replace("EEE", EEE)
      .replace("yyyy", yyyy)
      .replace("yy", yy)
      .replace("aaa", aaa);
    if (patternStr.indexOf("MMM") > -1) {
      patternStr = patternStr.replace("MMMM", MMMM).replace("MMM", MMM);
    } else {
      patternStr = patternStr.replace("MM", MM).replace("M", M);
    }
    return patternStr;
  }
};

export const formatTime = (seconds, type) => {
  if (!seconds) {
    return "00:00";
  }

  let hh = Math.floor(seconds / 3600),
    mm = Math.floor(seconds / 60) % 60,
    ss = Math.floor(seconds) % 60;

  if (type == "minute") {
    return (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
  } else {
    if (hh) {
      return (
        hh + ":" + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss
      );
    } else {
      return (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
    }
  }
};

export const format_time = (seconds) => {
  if (!seconds) {
    return "00:00";
  }

  let hh = Math.floor(seconds / 3600),
    mm = Math.floor(seconds / 60) % 60;

  if (hh) {
    return hh + " " + "hr" + " " + (mm < 10 ? "0" : "") + mm + " " + "min.";
  } else {
    return (mm < 10 ? "0" : "") + mm + " " + "min.";
  }
};
