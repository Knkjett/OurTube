import React from 'react';
import './feedlist.css';
import Feed from '../../components/Editor/feed';
import {Link} from 'react-router-dom';

const FeedList = props =>{
    const {
        currFeeds,
        showMatchingFeeds,
        feedSrchInputField,
        searchStr,
        clickFeed,
        clickFeedX,
    } = props;
    
    if (currFeeds.length === 0){
        return <div className='noFeeds'><h6>No feeds yet</h6></div>
    }

    const hasMatchingFeed = currFeeds.some(f =>f.feedname.toLowerCase().includes(searchStr));
    
    return (
        <div className='feedList-wrapper'>
            <h5>Explore Feed List</h5>
            <div>
                <div className='current-feed'>
                    {currFeeds[0].feedname}
                    <Link to={'/search/'+currFeeds[0].feedname} className='explore-feed'>
                        <span title='Take me to the video page!'>
                            Explore &#x25B6;
                        </span>
                    </Link>
                </div>
                <div className='feed-dropdown'>
                    <div className='search-div'>
                        <input className='search' onChange={showMatchingFeeds} type='text' placeholder='Search existing feeds...' value={feedSrchInputField}/>
                    </div>
                    <div className='feed-dlist'>
                        { hasMatchingFeed
                        ?
                            currFeeds.map( (f,i) => {
                                if (f.feedname.toLowerCase().includes(searchStr)){
                                    return <Feed key={i} index={i} feed={f.feedname}
                                    clickFeed={clickFeed}
                                    clickFeedX={clickFeedX} />
                                }
                            })
                        :
                            <div className='no-feed-match'>No such feed</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedList;