import React from 'react'
import './userItem.css'

const UserItem = (props) => {
    const name = props.name.slice(0,1).toUpperCase() + props.name.slice(1)
    return (
    <div className="userListItem" onClick={props.switchUser} name={props.name} ismenuitem={'true'}>
        <div className="smallUserIcon" name={props.name}>
            <div className="smallIcon" name={props.name}>
                {name[0]}
            </div>
        </div>
        <span className="userListName" name={props.name}>{name}</span>
    </div>)
}

export default UserItem;