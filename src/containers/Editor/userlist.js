import React from 'react';
import './userlist.css';
import User from '../../components/Editor/user';

const UserList = props =>{
    const {
        orderedList, 
        currUser, 
        clickUser, 
        selectedIndex,
        showMatchingUsers,
        searchStr,
        userSrchInputField,
    } = props;
    const hasMatchingUser = orderedList.some(e =>e.toLowerCase().includes(searchStr));

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
                        <input className='search' onChange={showMatchingUsers} type='text' placeholder='Search user...' value={userSrchInputField}/>
                    </div>
                    <div className='user-dlist'>
                        { hasMatchingUser 
                        ?
                            orderedList.map( (e,i) => {
                                if (e.toLowerCase().includes(searchStr)){
                                    return <User user={e} key={i} index={i} clickUser={clickUser} selectedIndex={selectedIndex}/>
                                }
                            })
                        :
                            <div className='no-srch-match'>No matching user</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserList;