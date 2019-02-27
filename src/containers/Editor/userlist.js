import React, { Component } from 'react';
import './userlist.css';

const UserList = props =>{
    return (
        <div className='userList-wrapper'>
            <h4>User List</h4>
            <div>
                <input className='current-user' type='text' value='current user selected' />
                <div className='user-dropdown'>

                </div>
            </div>
        </div>
    );
}

export default UserList;