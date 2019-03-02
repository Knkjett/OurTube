import React from 'react';
import './addfeed.css';

const AddFeed = props =>{
    const {
        addFeedInputField,
        updateFeedInputField,
        clickAddBtn,
        onFeedEnter,
    } = props;
    return (
        <form className='addFeed-form'>
            <h2>Create a new explore feed</h2>
            <div className='nowrap input-row'>
                <input className='feed-input' 
                        type='text' 
                        placeholder="Feed Name"
                        onChange={updateFeedInputField}
                        onKeyPress={onFeedEnter}
                        value={addFeedInputField}
                />
                <button className='add-btn' onClick={clickAddBtn}>Add</button>
            </div>
        </form>
    );
}

export default AddFeed;