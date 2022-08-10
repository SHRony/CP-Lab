import Axios from "axios";
//Stores data into local storage
export function storeData(name, data) {
  localStorage.setItem(name, data);
}
//Access data from local storage
export function getData(name) {
  return localStorage.getItem(name);
}
//Erases data from local storage
export function eraseData(name) {
  console.log(localStorage.getItem(name));
  localStorage.removeItem(name);
}

//Returns ture if val is alphanumeric
export function alphanumeric(val) {
  return (
    (val >= "a".charCodeAt(0) && val <= "z".charCodeAt(0)) ||
    (val >= "A".charCodeAt(0) && val <= "Z".charCodeAt("0")) ||
    (val >= "0".charCodeAt(0) && val <= "9".charCodeAt(0))
  );
}
//Returns 1 if user not defined or null
export async function isLoggedIn() {
  let user = getData("current_user");
  if (user === null || user === undefined) return 1;
  else
    return await Axios.post("http://localhost:3001/auth", {
      token: getData("current_user"),
    }).then((response) => response.data);
}

//Returns 1 if user not defined or null
//Returns 3 if database error occurs
export async function getUser(username) {
  if (username === null || username === undefined) return 1;
  else
    return await Axios.post("http://localhost:3001/api/getUser", {
      user: username,
    }).then((response) => response.data);
}
export async function updateHandles(handles) {
  if (handles === null || handles === undefined) return 1;
  else
    return await Axios.post("http://localhost:3001/api/updateHandles", {
      handles: handles,
      token: getData("current_user"),
    }).then((response) => response.data);
}

export function timeSince(time) {
  let cur = Date.now();
  cur = Math.floor(cur / 1000);
  let dif = cur - time;
  console.log(dif);
  dif = Math.floor(dif / 60);
  if (dif <= 120) {
    return dif + " minutes ago";
  } else {
    dif = Math.round(dif / 60);
    if (dif <= 48) {
      return dif + " hours ago";
    } else {
      dif = Math.round(dif / 24);
      if (dif <= 360) return dif + " days ago";
    }
  }
  dif = Math.round(dif / 360);
  return dif + " years ago";
}
