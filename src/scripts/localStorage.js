export function setLocalMarkup(id, markup, timeStamp = Date.now()) {
  localStorage.setItem(id, markup);
  localStorage.setItem(id + '-timestamp-local', timeStamp);
}

export function getLocalMarkup(id) {
  return {
    markup: localStorage.getItem(id),
    timestamp: Math.floor(
      Number(localStorage.getItem(id + '-timestamp-local')) / 1000
    ),
  };
}

export function setFirebaseMarkup(id, markup, timeStamp) {
  localStorage.setItem(id + '-firebase', markup);
  localStorage.setItem(id + '-timestamp-firebase', timeStamp);
}

export function getFirebaseMarkup(id) {
  return {
    markup: localStorage.getItem(id + '-firebase'),
    timestamp: Number(localStorage.getItem(id + '-timestamp-firebase')),
  };
}
