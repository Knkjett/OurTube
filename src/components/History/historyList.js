import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { VideoCard, HiddenVid } from '../components/Search/searchList'
import Footer from '../components/footer'

class SearchApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shownResults: 8,
      appdata: {
        userLists: ['guest'],
        users: {
          'guest': {
            history: [],
            queries: [],
          }
        }
      }
    }
  }
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleOnScroll);
    getItem('appdata')
      .then((data) => {
        if (!data) {
          setItem('appdata', this.state.appdata)
        }
        else {
          this.setState({
            appdata: data
          })
        }
      })
    const {search} = this.props.match.params;
    this.setState({
      value: search
    })
    this.doSearch(search,'')
  }
  searchList = () => { //Function gets called in the render which will render the return of the map
    let currentUser = this.state.appdata.userLists[0]; //Grabs current user from state.
    if (!this.state.appdata.users[currentUser].queries[0])
      return (<></>)
    else {
      return this.state.appdata.users[currentUser].queries[0].results.map((e, i) => {
        // console.log(i) 
        if (i < this.state.shownResults) {
          return <VideoCard ele={e} key={i} cb= {this.toVideo}/>
        }
        else {
          return <HiddenVid ele={e} key={i} cb= {this.toVideo}/>
        }
      })
    }
  }

}