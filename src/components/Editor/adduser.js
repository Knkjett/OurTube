import React, { Component } from 'react';
import './adduser.css';

const AddUser = props =>{
    return (
        <form className='addUser-form'>
            <h4>Create a new user</h4>
            <div className='nowrap'>
                <input className='user-input' type='text' placeholder="User's name" />
                <button>Add</button>
            </div>
        </form>
    );
}

export default AddUser;