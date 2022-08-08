export function storeData(name, data) {
  localStorage.setItem(name, data);
}
export function getData(name) {
  return localStorage.getItem(name);
}
export function eraseData(name) {
  localStorage.removeItem(name);
}
export function alphanumeric(val) {
  return (
    (val >= "a".charCodeAt(0) && val <= "z".charCodeAt(0)) ||
    (val >= "A".charCodeAt(0) && val <= "Z".charCodeAt("0")) ||
    (val >= "0".charCodeAt(0) && val <= "9".charCodeAt(0))
  );
}
