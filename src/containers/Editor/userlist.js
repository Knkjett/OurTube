import React from 'react';
import './userlist.css';
import User from '../../components/Editor/user';

const UserList = props =>{
    const {
        orderedList, 
        currUser, 
        clickUser, 
        selectedIndex,
    } = props;

    return (
        <div className='userList-wrapper'>
            <h5>User List</h5>
            <div>
                <div className='current-user'>
                    {currUser}
                    <span>&#x25BC;</span>
                </div>
                <div className='user-dropdown'>
                    <div className='search-div'>
                        <input className='search' type='text' placeholder='Search user...'/>
                    </div>
                    <div className='user-dlist'>
                        {orderedList.map( (e,i) => {
                            return <User user={e} key={i} index={i} clickUser={clickUser} selectedIndex={selectedIndex}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserList;