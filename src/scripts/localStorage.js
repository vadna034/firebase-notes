export function setLocalMarkup(id, markup, timeStamp = Date.now()) {
  localStorage.setItem(id, markup);
  localStorage.setItem('timestamp-local', timeStamp);
}

export function setFirebaseMarkup(id, markup, timeStamp) {
  localStorage.setItem(id + '-firebase', markup);
  localStorage.setItem('timestamp-firebase', timeStamp);
}
