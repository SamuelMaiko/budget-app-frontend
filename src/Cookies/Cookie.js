import Cookies from "js-cookie";

const cookieConfig = {
  expires: new Date("2026-01-01T00:00:00"),
  secure: false,
  httpOnly: false,
};

export const createNewCookie = (cookieName, cookieValue) => {
  Cookies.set(cookieName, cookieValue, cookieConfig);
};

export const getCookie = (cookieName) => Cookies.get(cookieName);

export const deleteCookie = (cookieName) => {
  Cookies.remove(cookieName);
};
