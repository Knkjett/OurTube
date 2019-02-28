import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {getSearchResults, getVideoInfo, setItem, getItem} from '../services/service'
import { Container, Row, Col, Button} from 'reactstrap';
import VideoPlayer from '../components/Video/videoplayer';
import Suggestions from '../components/Video/suggesstion';
import Comments from '../components/Video/comments';
import '../../src/components/Video/suggestion.css'



class VideoApp extends Component {

  constructor(props) {
    super(props)
    this.state={
      currentVid: '',
      token: '',
      suggestionsResults: [],
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

    // get vid infos api call to grap video infos and tags
    // display vid infos 
    // use tags to make getsearchresults api call no token
    
    // MAKE SURE TO UPDATE URL with proper vidId toVideo = (e) => {
    //    let link = e.target.getAttribute('value')
    //    this.props.history.push(`/video/${link}`)
    //   }
    //   onClick={this.toVideo}

    
  
  const {id} = this.props.match.params;


  const searchTest = 'cup'; // cup should be replaced with local storage 'tags';
  
  let appdata2 = {...this.state.appdata};
  const currentUser = this.state.appdata.userLists[0];  
  

    getItem('appdata')    
      .then((data) => {
        if (!data) {
          setItem('appdata', this.state.appdata)
        }
        else {
          getSearchResults(searchTest, '')
          .then(data => {
            console.log(data)
            appdata2.users = {
                [currentUser]: {
                  history: (this.state.appdata.users[currentUser].history || []).concat(data),
                  queries: (this.state.appdata.users[currentUser].queries || []).concat(searchTest)
              }
            }
            this.setState({
              currentVid: id,
              appdata: appdata2
            })
            
            setItem('appdata', this.state.appdata)
            // console.log('state indid mount: ', this.state)
          })          
        }
      })
      console.log("this.props: ", this.props)
    }

    loadMore = () => {

      const currentUser = this.state.appdata.userLists[0]; 
      let currentUserData = {...this.state.appdata};
      const searchQuery =  this.state.appdata.users[currentUser].queries[0];  
      // console.log("currentUser: ", currentUser)
      // console.log("currentUserData: ", currentUserData)
      // console.log("searchQuery: ",searchQuery)

      getSearchResults(searchQuery)
      .then(data => {
        currentUserData.users = {
             [currentUser] : {
              history: (this.state.appdata.users[currentUser].history || []).concat(data),
              queries: (this.state.appdata.users[currentUser].queries || []).concat(searchQuery)
            }
          }              
          this.setState({
            appdata: currentUserData
          })
      })
      // console.log(this.state)   
    }

    handleClicked = (e) => {
        // console.log(e.target)
        // console.log(e.target.getAttribute("vidid"))
        const vidKey = e.target.getAttribute("vidid");
        

        let appDataCpy = {...this.state.appdata};
        console.log(appDataCpy)

          this.setState({
            currentVid: vidKey,
          })
    }

  render() {



    // console.log("vidID: ", this.state.appdata.users[this.state.appdata.userLists[0]].history[1])
    return ( 
      
      <>
        <Container>
          <Row >
            <Col col-8> 
               < VideoPlayer vidID={this.state.currentVid} />  
            </Col>


            <Col col-4 fluid>
              < Comments />
            </Col>
          </Row>
          
          <Row> 
          <div className="scrollmenu">
          
            { this.state.appdata.users[this.state.appdata.userLists[0]].history.map((e,i) => {
              return < Suggestions
                thumbnail={e.thumbnail}
                title={e.title}
                description={e.description}
                vidid={e.vidID}
                handleClick={this.handleClicked}
              />
            })}

            <button className="loadMore" onClick={this.loadMore}> Load More </button>
          </div>
          </Row>
          
        </Container>
      </>
    )
  }
}

export default withRouter(VideoApp);