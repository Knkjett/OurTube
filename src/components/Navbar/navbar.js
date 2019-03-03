import React, { Component } from 'react';
import { getSearchResults, getItem, setItem } from '../../services/service'
import './navbar.css';
import UserMenu from '../../containers/Navbar/usermenu'

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      appdata: {}
    }
  }

  switchUser = (e) => {
    const user = e.target.getAttribute('user')
    const copy = {...this.state.appdata}
    let userList = copy.userList
    const i = userList.indexOf(user)
    userList = [user].concat(userList.slice(0, i).concat(userList.slice(i+1)))
    this.setState({ appdata: copy })
  }

  componentDidMount = () => {
    getItem('appdata')
      .then((data) => {
        this.setState({ appdata: data })
      })
  }

  render() {

    const open = this.props.display

    return (
      <>
      {open ? 
        <UserMenu appdata={this.state.appdata} users={this.state.appdata.userList} switchUser={this.switchUser}/> : 
        <></>
      }
      <nav className="navbar navbar-light bg-light justify-content-between" onClick={this.props.toggle}>
        <div className="leftButtons">
          <div>
            <a className="navbar-brand">Binge Watch</a>
          </div>
        </div>
        <form className="form-inline search">
          <input className="form-control searchField" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn searchBtn btn-dark" type="submit"><i className="fas fa-search"></i></button>
        </form>
        <div className="user" ismenu={'true'} onClick={this.props.toggle}>
          <div className="userIcon" ismenu={'true'}>
            {this.state.appdata.userList ?
              <div className="icon" ismenu={'true'}>
                {this.state.appdata.userList[0].slice(0, 1).toUpperCase()}
              </div> : <></>
            }
          </div>
        </div>
      </nav>
      </>)
  }
}


export default Navbar

//{user.slice(0,1)}