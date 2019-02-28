import React, { Component } from 'react';
import {getSearchResults, getVideoInfo, setItem, getItem} from '../services/service'
import { VideoCard, HiddenVid } from '../components/Search/searchList'

class SearchApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      token: '',
      shownResults: 8,
      isLoading: true,
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  doSearch = (searchQuery) => {
    let userState = {...this.state.appdata};
    let mySearch = {};
    getSearchResults(searchQuery)
      .then((data) => {
        mySearch = {
          query: searchQuery,
          results: data,
        }
        userState.users[userState.userLists[0]].queries.unshift(mySearch);
        this.setState({
          shownResults: 8,
          appdata: userState
        })
      })
  }

  componentDidMount = () => {
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
    // if (!localStorage.getItem('users')) {
    //   localStorage.setItem('users', JSON.stringify(this.state.appdata.users))
    //   if (!localStorage.getItem('userLists')) {
    //     localStorage.setItem('userLists', JSON.stringify(this.state.userLists))
    //   }
    // }
    // else if (!localStorage.getItem('userLists')) {
    //   localStorage.setItem('userLists', JSON.stringify(this.state.userLists))
    //   if (!localStorage.getItem('users')) {
    //     localStorage.setItem('users', JSON.stringify(this.state.appdata.users))
    //   }
    // }
    // else {
    //   let userList = localStorage.getItem('users');
    //   let userListsList = localStorage.getItem('userLists')
    //   this.setState({
    //     users: JSON.parse(userList),
    //     userLists: JSON.parse(userListsList),
    //   })
    // }
    // doSearch('','')
  }

  showMore = () => {
    let currentQuery = this.state.appdata.users[this.state.appdata.userLists[0]].queries[0]
    console.log("currenr QUery: ",currentQuery)
    let val = this.state.shownResults + 8;  
    if(val > (currentQuery.results.length)){
      window.scrollTo(0, 0);
      this.doSearch(currentQuery.query,currentQuery.results[0].token)
    }
    else{
      console.log(this.state)
    this.setState({
      shownResults: val,
    })
  }
  }

  searchList = () => { //Function gets called in the render which will render the return of the map
    let currentUser = this.state.appdata.userLists[0]; //Grabs current user from state.
    if (!this.state.appdata.users[currentUser].queries[0])
      return (<></>)
    else {
      return this.state.appdata.users[currentUser].queries[0].results.map((e, i) => {
        // console.log(i) 
        if (i < this.state.shownResults) {
          return <VideoCard ele={e} key={i} />
        }
        else {
          return <HiddenVid ele={e} key={i} />
        }
      })
    }
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit() {
    this.doSearch(this.state.value)
  }

  render() {
    return (<>
      <div className='container'>
      <form onSubmit={this.handleSubmit}>
        <label>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
          {/* <input type="text" value={this.state.value} onChange={this.handleSearch} /> */}
        </label>
        <input type="submit" value="Submit" />
      </form>
        <this.searchList />
        <button type="button" className="btn btn-dark justify-content-center" onClick={this.showMore}>Show More</button>
      </div>
    </>)
  }
}

export default SearchApp;
