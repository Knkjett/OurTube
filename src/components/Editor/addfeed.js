import React, { Component } from 'react';
import './addfeed.css';

const AddFeed = props =>{
    return (
        <form className='addFeed-form'>
            <h4>Create a new explore feed</h4>
            <div className='nowrap'>
                <input className='feed-input' type='text' placeholder="Feed Name"/>
                <button>Add</button>
            </div>
        </form>
    );
}

export default AddFeed;