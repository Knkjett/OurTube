import React, { Component } from 'react';
import {getSearchResults, getItem, setItem } from '../../services/service';
import './navbar.css';
import UserMenu from '../../containers/Navbar/usermenu';
import {withRouter, Link} from 'react-router-dom';

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      appdata: {
        userLists: ['guest'],
        users: {
          'guest': {
            toWatchLater: [],
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
            history:[],
            queries:[]
          }
        }
      }
    }
  }


  switchUser = (e) => {
    const user = e.target.getAttribute('user')
    const copy = {...this.state.appdata}
    let userLists = copy.userLists
    const i = userLists.indexOf(user)
    userLists = [user].concat(userLists.slice(0, i).concat(userLists.slice(i+1)))
    this.setState({ appdata: copy })
  }

  componentDidMount = () => {
    getItem('appdata')
      .then((data) => {
        if(!data){
          setItem('appdata',this.state.appdata)
        }
        else{
        this.setState({ appdata: data })
        }
      })
  }
  handleChange = (event) => {
    if(event.keyCode===13){
      this.setState({ value: event.target.value.trim() },this.handleSubmit);
    }
  }
  handleSubmit = () => {
    this.props.history.push(`/search/${this.state.value}`)
  }
  
         
  render() {

    const open = this.props.display

    return (
      <>
      {open ? 
        <UserMenu appdata={this.state.appdata} users={this.state.appdata.userLists} switchUser={this.switchUser}/> : 
        <></>
      }
      <nav className="navbar navbar-light bg-light justify-content-between" onClick={this.props.toggle}>
        <div className="leftButtons">
          <div>
            <Link to='/' className="navbar-brand">Binge Watch</Link>
          </div>
        </div>
        <form className="form-inline search">
          <input className="form-control searchField" type="search" placeholder="Search" aria-label="Search" onKeyUp={this.handleChange}/>
          <button className="btn searchBtn btn-dark" type="submit"><i className="fas fa-search"></i></button>
        </form>
        <div className="user" ismenu={'true'} onClick={this.props.toggle}>
          <div className="userIcon" ismenu={'true'}>
            {this.state.appdata.userLists ?
              <div className="icon" ismenu={'true'}>
                {this.state.appdata.userLists[0].slice(0, 1).toUpperCase()}
              </div> : <></>
            }
          </div>
        </div>
      </nav>
      </>)
  }
}


export default withRouter(Navbar);