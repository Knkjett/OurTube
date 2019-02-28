import React from 'react';
import './user.css';

const User = props =>{
    const {user, index, clickUser} = props;

    return (
        <div index={index} className='username' onClick={clickUser}>
            <span index={index}>{user}</span>
            <span index={index} className='badge badge-pill'>x</span>
        </div>
    );
}

export default User;