import React, {Component} from 'react';
import UserItem from '../../components/Navbar/userItem'
import './usermenu.css';
import {Link, withRouter} from 'react-router-dom';

class UserMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            appdata: this.props.appdata,
            test:0,
            userList: {
                currentUser: (this.props.users[0].slice(0,1).toUpperCase() + this.props.users[0].slice(1)),
                list: this.props.users,
                isOpen: false
            }
        }
    }
    componentWillReceiveProps = (newProps) =>{
        this.setState({test: this.state.test++})
        console.log(this.state.test)
      }
    clickHandler = () => {
        const userList = this.state.userList;
        userList.isOpen = !userList.isOpen;
        console.log(userList)
        this.setState({userList: userList})
    }

    render(){
        let currentUser = this.state.userList.currentUser
        let list = this.state.userList.list
        let end = 6
        if(end > list.length) end = list.length;
        let switchList = list.slice(1, end)
        if (list.length === 1) switchList = []
        let open = this.state.userList.isOpen
        return (<>
        <div className="menu col-xs-12 col-sm-12 col-md-3" ismenuitem={'true'}>
        <div className="currentUser">
            <div className="userIcon">
                <div className="icon">
                    {currentUser.slice(0,1)}
                </div>
            </div>
            <div className="userName" ismenuitem={'true'}>
                {currentUser}
            </div>
        </div>
        <Link to='/editor'>
        <div className="option" ismenuitem={'true'}>
                <i className="fas fa-user-cog" aria-hidden="true" ismenuitem={'true'}></i><span className="optionName" ismenuitem={'true'}>Editor</span>
        </div>
        </Link>
       { list.length > 1 ? <div className="option" onClick={this.clickHandler} ismenuitem={'true'}>
            <i className="fas fa-users" aria-hidden="true" ismenuitem={'true'}></i><span className="optionName" ismenuitem={'true'}>Switch User</span>
        </div> : <></>}
                {open ?
                    <div className="userList" ismenuitem={'true'}>    
                        {switchList.map((user, i) => {
                            return <UserItem name={user} switchUser={this.props.switchUser} key={i}/>
                        })}
                    </div> : 
                    <></>}
        <Link to={`/history/${currentUser.toLowerCase()}`} >
        <div className="option" ismenuitem={'true'}>
            <i className="fas fa-history" aria-hidden="true" ismenuitem={'true'}></i><span className="optionName" ismenuitem={'true'}>History</span>
        </div>
        </Link>
    </div>
        </>)
    }
}

export default withRouter(UserMenu);