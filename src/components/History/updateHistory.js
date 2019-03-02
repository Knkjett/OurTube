import { getItem, setItem } from '../../services/service';

//USE USERNAME TO GENERATE APPDATA AND PULL USERNAME.
const updateHistory = (username, videoID) => {
  return getItem('appdata')
    .then((data) => {
      let historyState = data;
      console.log('history state=', historyState)
      for (let i = 0; i < historyState.users[username].history.length; i++) {
        if (videoID === historyState.users[username].history[i].vidID) {
          historyState.users[username].history.splice(i, 1);
        }
      }
      historyState.users[username].history.unshift(videoID)
      setItem(appdata, historyState)
    })
}


export default updateHistory;