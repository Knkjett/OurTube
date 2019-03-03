import React, { Component } from 'react';
import { getItem, setItem } from '../../services/service'
import Feed from './feed'
import './catalogue.css';

class Catalogue extends Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
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

    componentDidMount = () => {
        getItem('appdata')
        .then((data) => {
            if(!data){
                setItem('appdata',this.state.appdata)
                this.setState({isLoading: false})
            }
            else{
            this.setState({appdata: data, isLoading: false})
            }
        })
    }

    render(){

        const copy = {...this.state}
        delete copy['isLoading']

        return (
            <div className="container" onClick={this.props.toggle}>
            {this.state.isLoading ? 
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div> : 
                    this.state.appdata.users[this.state.appdata.userLists[0]].feeds.map((feed, i) => {
                        return <Feed key={i} keyVal={i} name={feed.feedname} state={copy} toggle={this.props.toggle} user={this.state.appdata.userLists[0]} isLoading={feed.isLoading}/>
                    })}
            </div>
        )
    }
}

export default Catalogue;