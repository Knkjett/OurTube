import React, { Component } from 'react';
import { getSearchResults, getItem, setItem } from '../services/service'
import { withRouter } from 'react-router-dom'
import { VideoCard, HiddenVid } from '../components/Search/searchList'
import Footer from '../components/footer'

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
  doSearch = (searchQuery, token) => {
    let userState = { ...this.state.appdata };
    let mySearch = {};
    getSearchResults(searchQuery, token)
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
        setItem('appdata',this.state.appdata);
      })
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
      .then(() => {
        if (this.props.isSearch) {
          const { search } = this.props.match.params;
          this.setState({
            value: search
          })
          this.doSearch(search, '')
        }
      })
  }

  showMore = () => {
    let currentQuery = this.state.appdata.users[this.state.appdata.userLists[0]].queries[0]
    let val = this.state.shownResults + 8
    if (this.props.isSearch) {
      if (val > 24) {
        window.scrollTo(0, 0);
        this.doSearch(currentQuery.query, currentQuery.results[0].token)
      }
      else {
        this.setState({
          shownResults: val,
        })
      }
    }
    else {
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
        if (i < this.state.shownResults) {
          return <VideoCard ele={e} key={i} cb={this.toVideo} />
        }
        else {
          return <HiddenVid ele={e} key={i} cb={this.toVideo} />
        }
      })
    }
  }
  historyList = () => {
    let currentUser = this.state.appdata.userLists[0];
    if (!this.state.appdata.users[currentUser].queries[0])
      return (<></>)
    else {
      return this.state.appdata.users[currentUser].history.map((e, i) => {
        if (i < this.state.shownResults) {
          return <VideoCard ele={e} key={i} cb={this.toVideo} />
        }
        else {
          return <HiddenVid ele={e} key={i} cb={this.toVideo} />
        }
      })
    }
  }
  isSearch = () => {
    if (this.props.isSearch) {
      return (<this.searchList />)
    }
    else {
      return (<this.historyList />)
    }
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit() {
    this.props.history.push(`/search/${this.state.value}`)
    this.doSearch(this.state.value, this.state.token)
  }

  toVideo = (e) => {
    let link = e.target.getAttribute('value')
    // getVideoInfo(link)
    // .then((vidData)=>{
    //   console.log(vidData)
    //   this.updateHistory(vidData)
    //   .then((data) => {
    //     this.setState({
    //       appdata: data
    //     })
    //     setItem('appdata', data);
    this.props.history.push(`/video/${link}`)
    // })
    // })

  }

  handleOnScroll = () => {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      this.showMore()
    }
  }

  render() {
    return (<>
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <this.isSearch />
      </div>
      <br />
      <br />
      <Footer />
    </>)
  }
}

export default withRouter(SearchApp);
