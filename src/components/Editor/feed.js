import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './feed.css';

const Feed = props =>{
    const {
        feed,
        index,
        clickFeedX,
        clickFeed
    } = props;

    const feedClassList = (index === 0) ? 'feed bg-blue font-white' : 'feed';
    const selectedClassList = (index === 0) ? 'selected' : 'selected hide';
    return (
        <div index={index} className={feedClassList} onClick={clickFeed}>
            <div index={index}>{feed}</div>
            <div index={index} className={selectedClassList}>selected</div>
            <div index={index} className='x-div hide' onClick={clickFeedX}>x</div>
        </div>
    );
}

export default Feed;

