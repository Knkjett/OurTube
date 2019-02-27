import React, { Component } from 'react';
import './feedlist.css';

const FeedList = props =>{
    return (
        <div className='feedList-wrapper'>
            <h4>Explore Feed List</h4>
            <div>
                <input className='current-feed' type='text' value='current feed selected' />
                <div className='feed-dropdown'>
            
                </div>
            </div>
        </div>
    );
}

export default FeedList;