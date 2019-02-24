import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor() {
    this.state = {
      currentTab = '',
      currentUser = '',
      recentUsers = [],
      users = {
     /* userName: {
          feeds:[
            feed: {
              videos: []
              lastUpdated: date
            }
          ] <--- list of feeds,
          initials: '' <--- used for the 'icon' for quick switch Menu
          history: [{
            vidID: '', <-- alphanumerical video id
            channelName: '', <-- channel video originated from
            description: '', <--- description of the video
            viewCount: '', <--- how many times it was watched
            uploadDate: '', <--- date video was put on youtube 
          }]
        } */
      },
    }

    updateUser = (userName, key, data) => {
      //update specific users info, will need if conditionals
    }

    updateFeeds = (feeds) => {
      //update feeds key
      //checks to see if videos haven't been updated in a while,
      //gets new videos
    }

    changeUser = (userName) => {
      //handles changing the user
      //also modifies recent users
    }

  }

  render() {
    return;
  }
}

export default App;
