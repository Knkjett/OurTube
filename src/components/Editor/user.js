import React from 'react';
import './user.css';

const User = props =>{
    const {user, index, clickUser, clickX, selectedIndex} = props;

    const selectedClassL = (index===selectedIndex) ? 'selected' : 'selected hide';
    const usernameClassL = (index===selectedIndex) ? 'username bg-blue font-white' : 'username';
    const badgeClassL = (index===selectedIndex) ? 'x-div hide bg-blue font-white' : 'x-div hide';
    

    return (
        <div index={index} className={usernameClassL} onClick={clickUser}>
            <div index={index}>{user}</div>
            <div index={index} className={selectedClassL}>selected</div>
            <div index={index} className={badgeClassL} onClick={clickX}>x</div>
        </div>
    );
}

export default User;