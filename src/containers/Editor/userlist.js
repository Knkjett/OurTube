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
        clickX,
    } = props;

    const hasMatchingUser = orderedList.some(e =>e.toLowerCase().includes(searchStr));
    if (orderedList.length === 0){
        return <div className='noUsers'><h6>No users at the moment</h6></div>
    }

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
                        <input className='editorsearch' onChange={showMatchingUsers} type='text' placeholder='Search user...' value={userSrchInputField}/>
                    </div>
                    <div className='user-dlist'>
                        { hasMatchingUser 
                        ?
                            orderedList.map( (e,i) => {
                                if (e.toLowerCase().includes(searchStr)){
                                    return <User key={i} index={i} user={e} 
                                        selectedIndex={selectedIndex} 
                                        clickUser={clickUser}
                                        clickX={clickX}/>
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