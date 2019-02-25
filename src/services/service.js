import Axios from 'axios';

const getVideos = (search) => {
  Axios({
      method: 'get',
      url: 'https://www.googleapis.com/youtube/v3/search',
      params: {
        part: 'snippet',
        maxResults: 24,
        videoDefinition: 'high',
        type: 'video',
        videoEmbeddable: 'true',
        key: 'AIzaSyCW33eITeJJ3jx8nVJKFylDq6R4V5aTWGU',
        q: `${search}`,
        pageToken: ''
      }
    })
    .then((res)=>{
      return res.data.items.map((e,i)=>{
        let video = {
          'vidID': e.id.videoId,
          'title':e.snippet.title,
          'channelTitle': e.snippet.channelTitle,
          'description': e.snippet.description,
          'publishedAt' :e.snippet.publishedAt,
          'thumbnail' : `https://i.ytimg.com/vi/${e.id.videoId}/maxresdefault.jpg`
        };
        return video;
      })
    }).then((video)=>{
      console.log(video)
    })
}

//Grab In
const getInfo = (videoID) => {
  Axios({
      method: 'get',
      url: 'https://www.googleapis.com/youtube/v3/videos',
      params: {
        id: `${videoID}`,
        part: 'snippet,contentDetails,statistics',
        key: 'AIzaSyCW33eITeJJ3jx8nVJKFylDq6R4V5aTWGU',
      }
    })
    .then((res)=>{
      let info = res.data.items[0];
      let videoStats = {
        'title': info.snippet.title,
        'duration' : info.contentDetails.duration,
        'channelTitle': info.snippet.channelTitle,
        'description' : info.snippet.description,
        'viewCount':info.statistics.viewCount,
        'publishedAt' :info.snippet.publishedAt,
        'thumbnail': info.snippet.thumbnails.maxres.url,
      };
      return videoStats;
    })
    .then((videoStats)=>{
      console.log(videoStats)
    })
}

export {getVideos, getInfo}

// localStorage.getItem('nameofKey') //users, recentUsers
// localStorage.setItem('nameofKey','value')
// JSON.stringify()