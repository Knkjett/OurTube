import { getItem, setItem } from '../../services/service';


const updateHistory = (videoID) => {
  return getItem('appdata')
    .then((data) => {
      let historyState = data;
      console.log('history state=', historyState)
      let currentUser = this.state.appdata.userLists[0];
      for (let i = 0; i < historyState.users[currentUser].history.length; i++) {
        if (videoID === historyState.users[currentUser].history[i].vidID) {
          historyState.users[currentUser].history.splice(i, 1);
        }
      }
      historyState.users[currentUser].history.unshift(videoID)
      setItem(appdata, historyState)
    })
}


export default updateHistory;