import React from 'react';
import './feedlist.css';
import Feed from '../../components/Editor/feed';

const FeedList = props =>{
    const {
        currFeeds,
        showMatchingFeeds,
        feedSrchInputField,
        searchStr,
        clickFeed,
        clickFeedX,
    } = props;
    const hasMatchingFeed = currFeeds.some(f =>f.feedname.toLowerCase().includes(searchStr));

    return (
        <div className='feedList-wrapper'>
            <h5>Explore Feed List</h5>
            <div>
                <div className='current-feed'>
                    {currFeeds[0].feedname}
                    <span><em>selected</em></span>
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