export const clearAll = () => {
  // Clear local storage
  localStorage.clear();

  // Clear cookies
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie.replace(
      /=.*/,
      "=;expires=" + new Date(0).toUTCString() + ";path=/"
    );
  });
};
