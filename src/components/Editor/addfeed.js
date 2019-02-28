import React from 'react';
import './addfeed.css';

const AddFeed = props =>{
    return (
        <form className='addFeed-form'>
            <h2>Create a new explore feed</h2>
            <div className='nowrap input-row'>
                <input className='feed-input' type='text' placeholder="Feed Name"/>
                <button>Add</button>
            </div>
        </form>
    );
}

export default AddFeed;