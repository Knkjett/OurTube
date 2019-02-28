import React from 'react';
import './userlist.css';
import User from '../../components/Editor/user';

const UserList = props =>{
    const {orderedList, userList, clickUser, clickCurrUser, showDropDown} = props;
    const classList = showDropDown ? 'user-dropdown': 'user-dropdown hide';

    return (
        <div className='userList-wrapper'>
            <h5>User List</h5>
            <div>
                <div className='current-user' onClick={clickCurrUser}>
                    {userList[0]}
                    <span className='selected'>selected &#x25BC;</span>
                </div>
                <div className={classList}>
                    <input className='search' type='text' placeholder='Search...'/>
                    {orderedList.map( (e,i) => {
                        return <User user={e} key={i} index={i} clickUser={clickUser}/>
                    })}
                </div>
            </div>
        </div>
    );
}

export default UserList;