import React from 'react';
import './feedlist.css';
import Feed from '../../components/Editor/feed';

const FeedList = props =>{
    return (
        <div className='feedList-wrapper'>
            <h5>Explore Feed List</h5>
            <div>
                <input className='current-feed' type='text' placeholder='current feed selected'/>
                <div className='feed-dropdown'>
                    {<Feed />}
                </div>
            </div>
        </div>
    );
}

export default FeedList;