import React, { Component } from 'react';
import {getVideos, getInfo} from '../services/service'

class SearchApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recentUsers: ['guest'],
      users: {
        'guest': {
          history: [],
          queries: [],
        }
      }
    }
  }
  componentDidMount = () => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users',JSON.stringify(this.state.users))
      if (!localStorage.getItem('recentUsers')){
        localStorage.setItem('recentUsers', JSON.stringify(this.state.recentUsers))
      }
    }
    else{
      let userList = localStorage.getItem('users');
      let recentUsersList = localStorage.getItem('recentUsers')
      this.setState({
        users: userList,
        recentUsers: recentUsersList
      })
      // setInterval(()=>[
      //   console.log(this.state)
      // ],2000)
    }
  }
  
// getVideos('cats')
// getInfo('9bZkp7q19f0')
  searchList = () => { //Function gets called in the render which will render the return of the map
    let currentUser = this.state.recentUsers[0]; //Grabs current user from state.
    
    return this.state.users[currentUser].queries[0].results.map((e, i) => {
      return (<>
        <div className='row' key={i}>{e.vidID}</div>
      </>)
    })
  }

  render() {
    return (<>
      <div className='container'>
        {/* <this.searchList /> */}
      </div>
    </>)
  }
}

export default SearchApp;
