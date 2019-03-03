import React, { Component } from 'react';
import Catalogue from '../containers/Home/catalogue'
import { getItem, setItem } from '../services/service'

class HomeApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appdata: {
        userList: ['guest', 'guest', 'guest', 'guest', 'guest', 'guest'],
        users: {
          'guest': {
            feeds: [
              {
                feedname: 'cats',
                isLoading: false,
                isCollapsed: true,
                display: 4,
                videos: [
                  {
                    vidID: 'hY7m5jjJ9mM',
                    title: 'CATS will make you LAUGH YOUR HEAD OFF - Funny CAT compilation',
                    duration: '',
                    channelTitle: 'Tiger FunnyWorks',
                    description: 'Cats are amazing creatures because they make us laugh all the time! Watching funny cats is the hardest try not to laugh challenge! Just look how all these cats ...', // <--- description of the video
                    viewCount: '',
                    publishedAt: '2017-05-31T09:30:02.000Z',
                    thumbnail: 'https://i.ytimg.com/vi/hY7m5jjJ9mM/maxresdefault.jpg'
                  },
                  {
                    vidID: 'Rmx1JGTX1yw',
                    title: 'Funniest CATS EVER - Die LAUGING NOW!',
                    duration: '',
                    channelTitle: 'Tiger FunnyWorks',
                    description: 'Cats are the best pets and animals! Cats and kittens are so funny, they make us laugh and happy! They never fail to amuse us! This is the most impossible TRY ...', // <--- description of the video
                    viewCount: '100', 
                    publishedAt: '2018-07-26T11:00:05.000Z', 
                    thumbnail: 'https://i.ytimg.com/vi/Rmx1JGTX1yw/maxresdefault.jpg'
                  },
                ],
                updated: (Date.now() - 3600001),
            }],
          }
        }
      }
    }
  }

  getOutdated = (data) => {
    const copy = {...data}
    const user = copy.userList[0]
    const feeds = copy.users[user].feeds
    const outdated = feeds.map((feed, i) => {
      if(Date.now() - feed.updated >= 3600000){
        feed.isLoading = true;
        console.log(feed.feedname, feed.isLoading)
        return {'name': feed.feedname, 'position':i}
      }
    })
    setItem('appdata', copy)
      .then(this.setState({appdata:copy}))
  }

  // getUpdates = (feeds) => {

  //   const copy = {...this.state.appdata}
  //   const user = copy.userList[0]
  //   const feedsList = copy.users[user].feeds

  //   const promises = []
  //   for(let i = 0; i < feeds.length; i++){
  //     promises.push(getSearchResults(feeds[i].feedname))
  //   }

  //   return Promise.all(promises)

  // }

  // update = (data, outdated) => {

  //     const copy = {...this.state.appdata}
  //     const user = copy.userList[0]
  //     const feeds = copy.users[user].feeds

  //     for(let i = 0; i < outdated.length; i++){
  //       feeds[outdated[i].position].videos = data[i]
  //       feeds[outdated[i].position].isLoading = false;
  //     }

  //     this.setState({appdata: copy})
  // }

  componentDidMount = () => {
    getItem('appdata')
      .then((data) => {
        if (!data) {
          setItem('appdata', this.state.appdata)
        }
        else {
          this.getOutdated(this.state.appdata)
        }
      })
  }

  render() {
    const active = this.state.appdata.userList[0];
    const userName = active.slice(0,1).toUpperCase() + active.slice(1);
    setItem('appdata',this.state.appdata)
    return (<>
      <Catalogue toggle={this.props.toggle}/>
      </>)
  }
}

/* Dummy State

users: {
        'guest': {
          feeds: [
            {
              feedname: 'cats',
              videos: [
                {
                  vidID: 'hY7m5jjJ9mM',  // <-- alphanumerical video id
                  title: 'CATS will make you LAUGH YOUR HEAD OFF - Funny CAT compilation',
                  duration: '', // <--- length of the video in hh:mm:ss
                  channelTitle: 'Tiger FunnyWorks', // <-- channel video originated from 
                  description: 'Cats are amazing creatures because they make us laugh all the time! Watching funny cats is the hardest try not to laugh challenge! Just look how all these cats ...', // <--- description of the video
                  viewCount: '',  //<--- how many times it was watched
                  publishedAt: '2017-05-31T09:30:02.000Z', // <--- date video was put on youtube}],
                  thumbnail: 'https://i.ytimg.com/vi/hY7m5jjJ9mM/maxresdefault.jpg'
                },
                {
                  vidID: 'Rmx1JGTX1yw',  // <-- alphanumerical video id
                  title: 'Funniest CATS EVER - Die LAUGING NOW!',
                  duration: '', // <--- length of the video in hh:mm:ss
                  channelTitle: 'Tiger FunnyWorks', // <-- channel video originated from 
                  description: 'Cats are the best pets and animals! Cats and kittens are so funny, they make us laugh and happy! They never fail to amuse us! This is the most impossible TRY ...', // <--- description of the video
                  viewCount: '',  //<--- how many times it was watched
                  publishedAt: '2018-07-26T11:00:05.000Z', // <--- date video was put on youtube}],
                  thumbnail: 'https://i.ytimg.com/vi/Rmx1JGTX1yw/maxresdefault.jpg'
                },
              ],
              lastUpdated: date.Now(),
            }],
          history: [{
            vidID: 'hY7m5jjJ9mM',  // <-- alphanumerical video id
            title: 'CATS will make you LAUGH YOUR HEAD OFF - Funny CAT compilation',
            duration: '', // <--- length of the video in hh:mm:ss
            channelTitle: 'Tiger FunnyWorks', // <-- channel video originated from 
            description: 'Cats are amazing creatures because they make us laugh all the time! Watching funny cats is the hardest try not to laugh challenge! Just look how all these cats ...', // <--- description of the video
            viewCount: '',  //<--- how many times it was watched
            publishedAt: '2017-05-31T09:30:02.000Z', // <--- date video was put on youtube}],
            thumbnail: 'https://i.ytimg.com/vi/hY7m5jjJ9mM/maxresdefault.jpg'
          },
          {
            vidID: 'Rmx1JGTX1yw',  // <-- alphanumerical video id
            title: 'Funniest CATS EVER - Die LAUGING NOW!',
            duration: '', // <--- length of the video in hh:mm:ss
            channelTitle: 'Tiger FunnyWorks', // <-- channel video originated from 
            description: 'Cats are the best pets and animals! Cats and kittens are so funny, they make us laugh and happy! They never fail to amuse us! This is the most impossible TRY ...', // <--- description of the video
            viewCount: '',  //<--- how many times it was watched
            publishedAt: '2018-07-26T11:00:05.000Z', // <--- date video was put on youtube}],
            thumbnail: 'https://i.ytimg.com/vi/Rmx1JGTX1yw/maxresdefault.jpg'
          }],

*/

export default HomeApp;
