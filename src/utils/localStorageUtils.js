export const setLocalStorgeData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorgeData = (key) =>
  JSON.parse(localStorage.getItem(key));
