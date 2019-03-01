import React, { Component } from 'react';
import AddUser from '../components/Editor/adduser';
import AddFeed from '../components/Editor/addfeed';
import UserList from '../containers/Editor/userlist';
import FeedList from '../containers/Editor/feedlist';
import './editorApp.css';


class EditorApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addUserInputField: '',
      userSrchInputField: '',
      userSrchStr: '',

      userList: ['Guest', 'Mo', 'Taqistan'],
      orderedList: ['Guest', 'Mo', 'Taqistan'],
      selectedIndex: 0,

      feedSrchInputField: '',
      feedSrchStr: '',

      users: {
        mo: {
          displayName: 'Mo',
          feeds: [
            {feedname: 'momos', videos: [], lastUpdated: new Date()},
            {feedname: 'how to make money', videos: [], lastUpdated: new Date()},
            {feedname: 'new tech', videos: [], lastUpdated: new Date()},
            {feedname: 'react lecture', videos: [], lastUpdated: new Date()},
            {feedname: 'current news', videos: [], lastUpdated: new Date()},
          ],
        },
        taqistan: {
          displayName: 'Taqistan',
          feeds: [
            {feedname: 'best halal food', videos: [], lastUpdated: new Date()},
            {feedname: 'cute cats', videos: [], lastUpdated: new Date()},
            {feedname: 'cute kittens', videos: [], lastUpdated: new Date()},
            {feedname: 'old school tech', videos: [], lastUpdated: new Date()},
            {feedname: 'intersection co', videos: [], lastUpdated: new Date()},
            {feedname: 'recursion', videos: [], lastUpdated: new Date()},
            {feedname: 'lol', videos: [], lastUpdated: new Date()},
            {feedname: 'best gyms in nyc', videos: [], lastUpdated: new Date()},
            {feedname: 'science', videos: [], lastUpdated: new Date()},
            {feedname: 'new break throughs in science', videos: [], lastUpdated: new Date()},
            {feedname: 'how to be human', videos: [], lastUpdated: new Date()},
          ],
        },
        'guest': {
          displayName: 'GuesT',
          feeds: [
            {
              feedname: 'cats',
              videos: [
                {
                  vidID: 'hY7m5jjJ9mM',  // <-- alphanumerical video id
                  title: 'CATS will make you LAUGH YOUR HEAD OFF - Funny CAT compilation',
                  duration: '', // <--- length of the video in hh:mm:ss
                  channelTitle: 'Tiger FunnyWorks', // <-- channel video originated from 
                  description: 'Cats are amazing creatures because they make us laugh all the time! Watching funny cats is the hardest try not to laugh challenge! Just look how all these cats ...', // <--- description of the video
                  viewCount: '',  //<--- how many times it was watched
                  publishedAt: '2017-05-31T09:30:02.000Z', // <--- date video was put on youtube}],
                  thumbnail: 'https://i.ytimg.com/vi/hY7m5jjJ9mM/maxresdefault.jpg'
                },
                {
                  vidID: 'Rmx1JGTX1yw',  // <-- alphanumerical video id
                  title: 'Funniest CATS EVER - Die LAUGING NOW!',
                  duration: '', // <--- length of the video in hh:mm:ss
                  channelTitle: 'Tiger FunnyWorks', // <-- channel video originated from 
                  description: 'Cats are the best pets and animals! Cats and kittens are so funny, they make us laugh and happy! They never fail to amuse us! This is the most impossible TRY ...', // <--- description of the video
                  viewCount: '',  //<--- how many times it was watched
                  publishedAt: '2018-07-26T11:00:05.000Z', // <--- date video was put on youtube}],
                  thumbnail: 'https://i.ytimg.com/vi/Rmx1JGTX1yw/maxresdefault.jpg'
                },
              ],
              lastUpdated: new Date(),
            }
          ],
        }
      }
    }
  }

// Add User Logic ----------------->
  clickAddBtn = (e) =>{
    const newUser = this.state.addUserInputField;
    const userKey = newUser.toLowerCase();

    if (!newUser) return;

    if (this.state.users[userKey]){
      alert('This user already exists. Please choose another name.');
      this.setState({addUserInputField: ''});
    } else {
      const newUserList = [newUser].concat([this.state.userList]);
      const newOrderedList = this.state.orderedList.concat([newUser]);
      const newUsersObj = Object.assign({}, this.state.users);
      newUsersObj[userKey] = {displayName: newUser, feeds: [], };
      const lastIndex = this.state.orderedList.length;

      this.setState({
        addUserInputField: '',
        userList: newUserList,
        orderedList: newOrderedList,
        users: newUsersObj,
        selectedIndex: lastIndex
      });
    }
  }

  onUserEnter = (e) =>{
    if (e.key !== 'Enter') return;
    if (!this.state.addUserInputField) return;
    this.clickAddBtn();
  }

  updateUserInputField = (e) =>{
    if (e.target.value.length > 25){
      alert('The user name is too long!')
      this.setState({addUserInputField: ''});
    } else {
      this.setState({addUserInputField: e.target.value});
    }
  }
// <--------------- Add User Logic

// User Dropdown Logic ----------------->
  showMatchingUsers = (e) => {
    if(e.target.value.length > 25){
      alert('The username is too long!')
      this.setState({
        userSrchInputField: '',
        userSrchStr: '',
      });
    } else {
      this.setState({
        userSrchStr: e.target.value.toLowerCase().trim(),
        userSrchInputField: e.target.value,
      });
    }
  }

  clickUser = (e) => {
    if (e.target.innerText === 'x') return;
    const index = parseInt(e.target.getAttribute('index'));
    const mostRecentUser = this.state.orderedList[index];
    if (mostRecentUser === this.state.userList[0]) return;
    const usersSet = new Set([mostRecentUser].concat(this.state.userList));
    const userArr = Array.from(usersSet);
    this.setState({
      userList: userArr, 
      selectedIndex: index,
      userSrchInputField: '',
      userSrchStr: '',
    }, ()=>{
      // console.log(this.state.userList);
    });
  }

  clickX = (e) =>{
    const index = parseInt( e.target.getAttribute('index') );
    const user = this.state.orderedList[index];
    const soonToBeSelectedUser = this.state.orderedList[index+1];
    const text = `Are you sure you want to delete ${user}\nand all of ${user}'s feeds?`;

    if (window.confirm(text)){
      // new ordered list
      const orderedList = this.state.orderedList;
      const newOrderedList = orderedList.slice(0,index).concat(orderedList.slice(index+1));
      // new user list with updated current user
      let selectedIndex = this.state.selectedIndex;
      const newUserList0 = this.state.userList.filter(e => e !== user);
      let newUserList = newUserList0;
      if (user === this.state.userList[0]){ 
        // if user to be removed is the same as selected user, update most current on userList
        newUserList0.unshift(soonToBeSelectedUser);
        const newSet = new Set(newUserList0);
        newUserList = Array.from(newSet);
      }
      if (index < selectedIndex) selectedIndex--;
      
      // delete user key from this.state.users
      const newUsersObj = Object.assign({}, this.state.users);
      const userKey = user.toLowerCase();
      delete newUsersObj[userKey];   

      this.setState({
        userList: newUserList,
        orderedList: newOrderedList,
        users: newUsersObj,
        selectedIndex,
      }, ()=>{
        alert(`${user}'s account permanently deleted.`)
      })
    } else {
      console.log('not ready to delete yet')
      return;
    }
  }
// <--------------- User Dropdown Logic

// Add Feed Logic --------------------->

// <--------------------- Add Feed Logic

// Feed Dropdown Logic --------------------->
  showMatchingFeeds = (e) => {
    if(e.target.value.length > 25){
      alert('The feed name is too long!')
      this.setState({
        feedSrchInputField: '',
        feedSrchStr: '',
      });
    } else {
      this.setState({
        feedSrchStr: e.target.value.toLowerCase().trim(),
        feedSrchInputField: e.target.value,
      });
    }
  }

  clickFeed = (e) => {
    if (e.target.innerText === 'x') return;
    const index = parseInt(e.target.getAttribute('index'));
    const userKey = this.state.userList[0].toLowerCase();
    const oldFeedList = [...this.state.users[userKey].feeds];
    const clickedFeed = oldFeedList[index];
    oldFeedList.unshift(clickedFeed);
    const newFeedSet = new Set(oldFeedList);
    const newFeedList = Array.from(newFeedSet);
    const newUsersObj = Object.assign({}, this.state.users);
    newUsersObj[userKey].feeds = newFeedList;

    this.setState({users: newUsersObj});
  }

  clickFeedX = (e) =>{
    if (e.target.innerText !== 'x') return;
    const index = parseInt( e.target.getAttribute('index') );
    const userKey = this.state.userList[0].toLowerCase();
    const feedList = this.state.users[userKey].feeds;
    const newFeedList = feedList.slice(0,index).concat(feedList.slice(index+1));
    const newUsersObj = Object.assign({}, this.state.users);
    newUsersObj[userKey].feeds = newFeedList;

    this.setState({users: newUsersObj});
  }
// <--------------------- Feed Dropdown Logic

  componentDidMount = () =>{
    // localStorage.getItem('');
    // ordered list becomes a copy of userlist;
    // const usersList = Object.keys(this.state.users);
    // const currUser = this.state.userList[0];
    // const currFeedObjs = this.state.users[currUser].feeds;
    // const currentFeeds = currFeedObjs.map( feed => feed.feedname );
    // this.setState({});
    // localStorage.setItem('');
  }

  render() {
    const {orderedList, 
            userList, 
            addUserInputField,
            selectedIndex,
            userSrchStr,
            userSrchInputField,
            users,
            feedSrchInputField,
            feedSrchStr,
          } = this.state;
    const currFeeds = users[userList[0].toLowerCase()].feeds;

    return (
      <div className='editor-wrapper'>
        <div className='userbox'>
          <AddUser 
            clickAddBtn={this.clickAddBtn}
            onUserEnter={this.onUserEnter}
            addUserInputField={addUserInputField}
            updateUserInputField={this.updateUserInputField}
          />
          <br />          
          <UserList 
            clickUser={this.clickUser}
            currUser={userList[0]} 
            orderedList={orderedList}
            selectedIndex={selectedIndex}
            showMatchingUsers={this.showMatchingUsers}
            searchStr={userSrchStr}
            userSrchInputField={userSrchInputField}
            clickX={this.clickX}
          />
        </div>
        <div className='feedbox'>
          <AddFeed />
          <br />
          <FeedList
            currFeeds={currFeeds}
            showMatchingFeeds={this.showMatchingFeeds}
            feedSrchInputField={feedSrchInputField}
            searchStr={feedSrchStr}
            clickFeed={this.clickFeed}
            clickFeedX={this.clickFeedX}
          />
        </div>
      </div>
    );
  }
}

export default EditorApp;
