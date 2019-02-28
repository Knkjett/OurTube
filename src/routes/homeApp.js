import React, { Component } from 'react';
import Footer from '../components/footer'

class HomeApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
              lastUpdated: new Date(),
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
          },],
        }
      }
    }
  }

  render() {
    return (<>
    <h1>Home Page</h1>
    <Footer />
    </>)
    
  }
}

export default HomeApp;
