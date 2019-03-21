import React, { Component } from 'react';
import Catalogue from '../containers/Home/catalogue'
import { getItem, initialize } from '../services/service'
import Footer from '../components/footer'

class HomeApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appdata: {}
    }
  }

  getOutdated = (data) => {
    console.log('gettingOutdated')
    const copy = {...data}
    const user = copy.userLists[0]
    const feeds = copy.users[user].feeds
    console.log('feeds: ',feeds)
    feeds.map((feed, i) => {
      if(Date.now() - feed.updated >= 3600000 || !feed.updated){
        feed.isLoading = true;
        return {'name': feed.feedname, 'position':i}
      }
    })
    this.setState({appdata: copy})
  }

  componentDidMount = () => {
    console.log('home mounted, getting item')
    getItem('appdata')
      .then((data) => {
        const user = data.userLists[0]
        const feeds = data.users[user].feeds
        if(feeds.length > 0) this.getOutdated(data)
      })
  }

  componentDidUpdate() {
    console.log('Home updated')
  }

  render() {
    console.log('rendering Home')
    console.log('state in home: ', this.state)
    // const active = this.state.appdata.userLists[0];
    // console.log('current user: ', active)
    return (<>
      <Catalogue toggle={this.props.toggle}/>
      <Footer />
      </>)
  }
}

export default HomeApp;
