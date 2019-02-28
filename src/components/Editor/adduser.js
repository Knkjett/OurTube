import React from 'react';
import './adduser.css';

const AddUser = props =>{
    const {clickAddBtn,
            addUserInputField,
            updateUserInputField,
    } = props;

    return (
        <form className='addUser-form'>
            <h2>Create a new user</h2>
            <div className='nowrap input-row'>
                <input className='user-input' 
                        type='text' 
                        placeholder="User's name" 
                        onChange={e => updateUserInputField(e)}
                        value={addUserInputField}
                />
                <button onClick={clickAddBtn}>Add</button>
            </div>
        </form>
    );
}

export default AddUser;