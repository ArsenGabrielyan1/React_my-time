import LOCAL_STORAGE from "./localStorage";
// import TIZEN from "../services/platform/tizen";
// import WEBOS from "../services/platform/webos";
// import BROWSER from "../services/platform/browser";

export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const months = [
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


export const constructQueryString = (queryParams) => {
  return Object.keys(queryParams)
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(queryParams[key])
    )
    .join("&");
};

export const scrollElement = (elem, xy = "x", size = 0, time = 0.3) => {
  if (!elem) return;
  elem.style.transform = `translate${xy}(${size})`;
  elem.style.transition = `${time}s`;
};

export const navigationDispatcher = (path, event) => {
  window.dispatchEvent(new CustomEvent("music navigated", { detail: path }));
};

export const showSideBar = (prevState) => {
  window.dispatchEvent(new CustomEvent("sidebarShow", { detail: prevState }));
};