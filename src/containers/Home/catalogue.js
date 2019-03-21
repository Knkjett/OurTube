import React, { Component } from 'react';
import { getItem, setItem } from '../../services/service'
import Feed from './feed'
import './catalogue.css';

class Catalogue extends Component {

    constructor(props){
        super(props)
        this.state = {
            appdata: {
              },
            isLoading: true,
        }
    }

    componentDidMount = () => {
      console.log('catalogue mounted')
      getItem('appdata')
        .then((data) => {
          if(!data){
            console.log('no data')  
            setItem('appdata',this.state.appdata)   
          }
          else{
            this.setState({isLoading: false, appdata: data})
          }
        })
    }

    loading = () => {
      return (this.state.isLoading ? 
        <div className="text-center">
          <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
          </div>
        </div> : this.displayFeed())
    }

    displayFeed = () => {
      let copy = {...this.state}
      const user = this.state.appdata.userLists[0]
      console.log(user)
      console.log(this.state.users)
      const feeds = this.state.appdata.users[user].feeds

      return feeds.length === 0 ? ( 
        <div className="row">
            <div className="col-10 nada">No Feeds</div>
        </div>)
        : 
        this.state.appdata.users[user].feeds.map((feed, i) => {
            return <Feed key={i} 
            keyVal={i} name={feed.feedname} state={copy} toggle={this.props.toggle} user={this.state.appdata.userLists[0]} isLoading={feed.isLoading}/>
        })
    }

    render(){ 
      return (
          <div className="container" onClick={this.props.toggle}>
            {this.loading()}
          </div>
      )
    }
}

export default Catalogue;