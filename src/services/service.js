import axios from 'axios';

const decodeEntities = (encodeString) => {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = encodeString;
  return textArea.value;
}

const getSearchResults = (search, token='', maxRe=24) => {
  
  return axios({
      method: 'get',
      url: 'https://www.googleapis.com/youtube/v3/search',
      params: {
        part: 'snippet',
        maxResults: maxRe,
        videoDefinition: 'high',
        type: 'video',
        videoEmbeddable: 'true',
        key: 'AIzaSyDYBvl9E3OnbTu9a1Yzho92JDvvV7SQUA4',// 'AIzaSyDOFMGuhvVjPsTnOReo9vKcSMVQbO-hkrk', // //AIzaSyDYBvl9E3OnbTu9a1Yzho92JDvvV7SQUA4//'AIzaSyAiQQ2iNo-tX2YPEBIR2dlomTz9gGmc4LE', //'AIzaSyA1IbC0luLEbBiBVEMUsRcJ2nYxPliGWAg, AIzaSyCb9A4kjrypWw84UxCN6AwnagElm_90OlU',
        q: `${search}`,
        pageToken: `${token}`
      }
      
      
    })
    .then((res)=>{
      console.log('res',res)
      return res.data.items.map((e,i)=>{
        let titleParsed = decodeEntities(e.snippet.title)
        let cTitleParsed = decodeEntities(e.snippet.channelTitle)
        let descParsed = decodeEntities(e.snippet.description)
        let video = {
          'vidID': e.id.videoId,
          'title': titleParsed,
          'channelTitle': cTitleParsed,
          'description': descParsed,
          'publishedAt': e.snippet.publishedAt,
          'thumbnail' : `https://i.ytimg.com/vi/${e.id.videoId}/mqdefault.jpg`,
          'token' : res.data.nextPageToken
        };
        return video;
      })
    })
}

//Grab In
const getVideoInfo = (videoID) => {
  return axios({
      method: 'get',
      url: 'https://www.googleapis.com/youtube/v3/videos',
      params: {
        id: `${videoID}`,
        type: 'list',
        part: 'snippet,contentDetails,statistics',
        key: 'AIzaSyDYBvl9E3OnbTu9a1Yzho92JDvvV7SQUA4', // 'AIzaSyDOFMGuhvVjPsTnOReo9vKcSMVQbO-hkrk',//'AIzaSyDYBvl9E3OnbTu9a1Yzho92JDvvV7SQUA4', //AIzaSyDOFMGuhvVjPsTnOReo9vKcSMVQbO-hkrk //"AIzaSyAiQQ2iNo-tX2YPEBIR2dlomTz9gGmc4LE"  // 'AIzaSyA1IbC0luLEbBiBVEMUsRcJ2nYxPliGWAg, AIzaSyCb9A4kjrypWw84UxCN6AwnagElm_90OlU'
      }
    })
    .then((res)=>{
      console.log('res',res.data.items)
      let info = res.data.items[0];
      let tags = info.snippet.tags.map(e => {return e})
      let titleParsed = decodeEntities(info.snippet.title)
      let cTitleParsed = decodeEntities(info.snippet.channelTitle)
      let descParsed = decodeEntities(info.snippet.description)
      let videoStats = {
        'vidID': videoID,
        'title': titleParsed,
        'duration' : info.contentDetails.duration,
        'channelTitle': cTitleParsed,
        'description' : descParsed,
        'viewCount': info.statistics.viewCount,
        'publishedAt' : info.snippet.publishedAt,
        'thumbnail': `https://i.ytimg.com/vi/${videoID}/mqdefault.jpg`,
        'tags': tags,
      };
      return videoStats;
    })
}

const getItem = (keyName) => {
  return new Promise ((resolve, reject) => {
    if(typeof keyName === "string"){
      if(localStorage.getItem(keyName)){
        resolve(localStorage.getItem(keyName));
      }
      else{
        reject('Invalid data, key does not exist')
      }
    }
    else{
      reject('Invalid data, keyName must be a string')
    }
  })
  .then(data => {
    return JSON.parse(data);
  })
  .catch(err => {
    console.log('getItem: ',err)
  })
};

const setItem = (keyName, keyValue) => {
  return new Promise ((resolve, reject) => {    
    if(typeof keyName === "string"){
      const data = {'keyName':keyName, 'keyValue':keyValue}
      resolve(data)
    }
    else{
      reject('Invalid data, keyName must be a string')
    }
  })
  .then(data => {
    if(typeof data.keyValue === 'string') localStorage.setItem(`${data.keyName}`,`${data.keyValue}`)
    else localStorage.setItem(`${data.keyName}`, JSON.stringify(data.keyValue))
  })
  .catch(err => {
    console.log('setItem: ',err)
  })
}

export {getSearchResults, getVideoInfo, setItem, getItem}