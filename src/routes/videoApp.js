import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { getSearchResults, getVideoInfo, setItem, getItem } from '../services/service'
import { Row, Col, Button } from 'reactstrap';
import VideoPlayer from '../components/Video/videoplayer';
import Suggestions from '../components/Video/suggesstion';
import Comments from '../components/Video/comments';
import '../components/Video/suggestion.css';

class VideoApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tags: [],
      currentVid: {},
      suggestionsResults: [],
      appdata: {
        userLists: ['guest'],
        users: {
          'guest': {
            toWatchLater: [],
            history: [],
            queries: [],
          }
        } 
      }
    }
  }

  componentDidMount = () => {

    let appdata2 = { ...this.state.appdata };
    let suggestionsResults2 = this.state.suggestionsResults;
    let tags2 = this.state.tags;
    const currentUser = this.state.appdata.userLists[0];
    const { id } = this.props.match.params;

    getItem('appdata')
      .then((data) => {
        if (!data) {
          setItem('appdata', this.state.appdata)
        }
        else {
          getVideoInfo(id)
            .then(videoData => {
              // console.log(videoData)
              let videoStats = {
                "vidID": id,
                "channelTitle": videoData.channelTitle,
                "description": videoData.description,
                "duration": videoData.duration,
                "publishedAt": videoData.publishedAt,
                "tags": videoData.tags,
                "thumbnail": videoData.thumbnail,
                "title": videoData.title,
                "viewCount": videoData.viewCount
              }
              // console.log("videoStatsTags: ", videoData.tags);

              appdata2.users[currentUser].history.unshift(videoStats);
              tags2 = videoStats.tags;

              getSearchResults(videoStats.tags, '')
                .then(SuggestionsData => {
                  // let arr = suggestionsResults2.concat(SuggestionsData)
                  suggestionsResults2 = suggestionsResults2.concat(SuggestionsData);


                  this.setState({
                    currentVid: videoStats,
                    tags: tags2,
                    suggestionsResults: suggestionsResults2,
                    appdata: appdata2,
                  })

                  // console.log("this.State in cdidMount: ",this.state)
                  setItem('appdata', this.state.appdata)
                })
            })
        }
      })
  }

  loadMore = () => {

    const currentUser = this.state.appdata.userLists[0];
    let currentUserData = { ...this.state.appdata };
    const searchQuery =  this.state.tags[Math.floor(Math.random() * (this.state.tags.length -1))];  
    let cpySuggestionsResults = this.state.suggestionsResults;
    // console.log("currentUser: ", currentUser)
    // console.log("currentUserData: ", currentUserData)
    // console.log("searchQuery: ", searchQuery)

    getSearchResults(searchQuery)
      .then(data => {
        cpySuggestionsResults = cpySuggestionsResults.concat(data)
        // currentUserData.users[currentUser].queries.unshift({ query: searchQuery, results: data })
        // console.log('current user data: ', currentUserData)
        this.setState({
          suggestionsResults: cpySuggestionsResults,
          appdata: currentUserData
        })
        setItem('appdata', this.state.appdata)
      })
    console.log(this.state)   
  }

  handleClicked = (e) => {

    const { id } = this.props.match.params;

    this.props.history.push(`/video/${id}`)
    const vidKey = e.target.getAttribute("vidid");
    let appDataCpy = { ...this.state.appdata };
    let currentUser = appDataCpy.userLists[0];
    let tagsCpy = this.state.tags;
      // if (e.taget.getAttribute('icon') !== null) {
      //   console.log("icon: ",e.target.getAttribute("icon"))
      // }

    // console.log('target: ', e.target)

    getVideoInfo(vidKey)
      .then(videoData => {
        // console.log(videoData)
        let videoStats = {
          "vidID": vidKey,
          "channelTitle": videoData.channelTitle,
          "description": videoData.description,
          "duration": videoData.duration,
          "publishedAt": videoData.publishedAt,
          "tags": videoData.tags,
          "thumbnail": videoData.thumbnail,
          "title": videoData.title,
          "viewCount": videoData.viewCount
        }
        // console.log("videoStats: ", videoStats);

        appDataCpy.users[currentUser].history = appDataCpy.users[currentUser].history.concat(videoStats);
        tagsCpy = videoData.tags;

        this.setState({
          currentVid: videoStats,
          tags: tagsCpy,
          appdata: appDataCpy
        })
        setItem('appdata', this.state.appdata)

      })
  }

  handleWatchLater = (e) => {

    let appDataCpy = { ...this.state.appdata };
    let currentUser = appDataCpy.userLists[0];
    const vidIdx = e.target.getAttribute("idx");
    const suggestionsResultsCpy = this.state.suggestionsResults;
    // console.log("in the X ", vidIdx)
    const currentVideo = this.state.suggestionsResults[vidIdx]
    suggestionsResultsCpy.splice(vidIdx,1);
    console.log("currentVideo: ", currentVideo)

    appDataCpy.users[currentUser].toWatchLater.push(currentVideo);

    this.setState({
      suggestionsResults: suggestionsResultsCpy,
      appData: appDataCpy,
    })

    setItem('appdata', this.state.appdata)
  }


  render() {

    // this.state.tags.map(e => { return console.log(e) })
    return (

      <>

        <div className="PageWrapper">
            <Col col-8>
              < VideoPlayer currentVid={this.state.currentVid} />
            </Col>

            <Col>
              < Comments currVidDescription={this.state.currentVid.description} currVidTags={this.state.tags} toWatchLaterList={this.state.appdata.users[this.state.appdata.userLists[0]].toWatchLater}/>
            </Col>
        </div>

        <div className="suggestionsWrapper">
          <Button className="btn" color="secondary" size="lg" style={{ marginBottom: '0rem' }} block> Related Videos </Button>
          <Row>
            <div className="scrollmenu">

              {this.state.suggestionsResults.map((e, i) => {
                return < Suggestions
                  idx ={i}
                  appData ={this.state.appdata}
                  thumbnail={e.thumbnail}
                  title={e.title}
                  description={e.description}
                  vidid={e.vidID}
                  handleClick={this.handleClicked}
                  addToWatchLater={this.handleWatchLater}
                />
              })}

              <button className="loadMore" onClick={this.loadMore}> Load More </button>
            </div>
          </Row>
        </div>
      </>
    )
  }
}

export default withRouter(VideoApp);