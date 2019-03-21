import React, { Component } from 'react';
import { getItem, setItem } from '../../services/service';
import './navbar.css';
import UserMenu from '../../containers/Navbar/usermenu';
import {withRouter, Link} from 'react-router-dom';

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
        appdata: getItem('appdata')
      }
    }

  switchUser = (e) => {
    const user = e.target.getAttribute('name')
    const copy = {...this.state.appdata}
    let userLists = [...copy.userLists]
    const i = userLists.indexOf(user)
    userLists = [user].concat(userLists.slice(0, i).concat(userLists.slice(i+1)))
    console.log('user lists a:', userLists)
    copy.userLists = userLists
    console.log('copy:',copy)
    console.log('setting item in navbar')
    setItem('appdata', copy)
    getItem('appdata')
      .then(data => {
        console.log('data in nav', data)
      })
    this.setState({ appdata: copy })
  }

  componentDidMount = () => {
    console.log('Nav mounting, getting item')
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

export default withRouter(Navbar)