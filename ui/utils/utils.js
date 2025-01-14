export function getDate(stringDate) {
  const date = new Date(stringDate);
  return date.toLocaleString('en-US');
}

export function isTheSameUser(user, userId) {
  if (!user) return false;
  return Number(userId) === Number(user.userId);
}

export function saveToLocalStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

export function removeFromLocalStorage(key) {
  window.localStorage.removeItem(key);
}