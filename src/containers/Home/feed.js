import React, { Component } from 'react';
import { getSearchResults, getItem, setItem } from '../../services/service'
import VideoCard from '../../components/Home/videocard'
import { withRouter } from 'react-router-dom'
import './feed.css';


class Feed extends Component {

    constructor(props) {
        super(props)
        this.state = this.props.state;
    }

    getUpdate = (data) => {
        console.log('getting update')
        const user = this.props.user
        const feeds = data.users[user].feeds
        const key = this.props.keyVal
        return getSearchResults(feeds[key].feedname, '', 4)
    }

    clickHandler = (e) => {
        this.props.history.push(`/video/${e.target.getAttribute('link')}`)
    }

    clickFeedName = (e) => {
        const copy = this.state.appdata
        const key = this.props.keyVal
        const user = this.props.user
        const feed = copy.users[user].feeds[key]
        feed.isCollapsed = !feed.isCollapsed;
        this.setState({ appdata: copy })
    }

    componentDidMount = () => {
        console.log('feed mounting')
        getItem('appdata')
            .then(data => {
                return this.getUpdate(data)
            })
            .then(updated => {
                const copy = { ...this.state.appdata }
                const user = this.props.user
                const key = this.props.keyVal
                copy.users[user].feeds[key].videos = updated;
                copy.users[user].feeds[key].updated = Date.now();
                copy.users[user].feeds[key].isLoading = false;
                setItem('appdata', copy)
                    .then(this.setState({ appdata: copy }))
            })
    }
    

    render() {
        const key = this.props.keyVal
        const user = this.props.user
        const feedname = this.props.name.slice(0, 1).toUpperCase() + this.props.name.slice(1);
        const feed = this.state.appdata.users[user].feeds[key]

        let end = feed.display
        if (feed.display > feed.videos.length) end = feed.length
        const videos = feed.videos.slice(0, end)
        return (
            <>
                {this.state.appdata.users ?
                    <div className="content" onClick={this.props.toggle}>
                        <div className="feed">
                            {feed.isCollapsed ?
                                <>
                                    <div className="btn btn-dark collapsed" aria-expanded="false" onClick={this.clickFeedName}>
                                        <div className="feedName">{feedname}<i className="fa fa-chevron-right"></i></div>
                                    </div>
                                    <div className="collapse">
                                        <div className="feed-content row">
                                            {feed.isLoading ?
                                                <div className="text-center">
                                                    <div className="spinner-border" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </div> :
                                                videos.map((video, i) => {
                                                    return <VideoCard key={i} keyVal={i} clickHandler={this.clickHandler} info={video} />
                                                })
                                            }
                                        </div>
                                    </div>
                                </> :
                                <>
                                    <div className="btn btn-dark" aria-expanded="true" onClick={this.clickFeedName}>
                                        <div className="feedName">{feedname} <i className="fa fa-chevron-down"></i></div>
                                    </div>
                                    <div className="collapse show">
                                        <div className="feed-content row">
                                            {feed.isLoading ?
                                                <div className="text-center">
                                                    <div className="spinner-border" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </div> :
                                                videos.map((video, i) => {
                                                    return <VideoCard key={i} keyVal={i} toggle={this.props.toggle} clickHandler={this.clickHandler} info={video} />
                                                })}
                                        </div>
                                    </div>
                                </>}
                        </div>
                    </div> :
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>}
            </>
        )
    }
}

export default withRouter(Feed);
