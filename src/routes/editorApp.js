import React, { Component } from 'react';
import AddUser from '../components/Editor/adduser';
import AddFeed from '../components/Editor/addfeed';
import UserList from '../containers/Editor/userlist';
import FeedList from '../containers/Editor/feedlist';
import './editorApp.css';
import Footer from '../components/footer';
import { setItem, getItem } from '../services/service';



class EditorApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addUserInputField: '',
      userSrchInputField: '',
      userSrchStr: '',
      selectedIndex: 0,
      feedSrchInputField: '',
      feedSrchStr: '',
      addFeedInputField: '',
      orderedList: ['guest',],

      appdata: {
        userLists: ['guest',],
        users: {
          'guest': {
            toWatchLater: [],
            feeds: [
              {
                feedname: 'cats',
                isLoading: false,
                isCollapsed: true,
                display: 4,
                videos: [
                  {
                    vidID: 'hY7m5jjJ9mM',
                    title: 'CATS will make you LAUGH YOUR HEAD OFF - Funny CAT compilation',
                    duration: '',
                    channelTitle: 'Tiger FunnyWorks',
                    description: 'Cats are amazing creatures because they make us laugh all the time! Watching funny cats is the hardest try not to laugh challenge! Just look how all these cats ...', // <--- description of the video
                    viewCount: '',
                    publishedAt: '2017-05-31T09:30:02.000Z',
                    thumbnail: 'https://i.ytimg.com/vi/hY7m5jjJ9mM/maxresdefault.jpg'
                  },
                  {
                    vidID: 'Rmx1JGTX1yw',
                    title: 'Funniest CATS EVER - Die LAUGING NOW!',
                    duration: '',
                    channelTitle: 'Tiger FunnyWorks',
                    description: 'Cats are the best pets and animals! Cats and kittens are so funny, they make us laugh and happy! They never fail to amuse us! This is the most impossible TRY ...', // <--- description of the video
                    viewCount: '100',
                    publishedAt: '2018-07-26T11:00:05.000Z',
                    thumbnail: 'https://i.ytimg.com/vi/Rmx1JGTX1yw/maxresdefault.jpg'
                  },
                ],
                updated: (Date.now() - 3600001),
              }],
            history: [],
            queries: []
          }
        }
      }

    }
  }


  // Add User Logic ----------------->
  clickAddBtn = (e) => {
    const newUser = this.state.addUserInputField;
    const userKey = newUser.toLowerCase();

    if (!newUser) return;

    if (this.state.appdata.users[userKey]) {
      alert('This user already exists. Please choose another name.');
      this.setState({ addUserInputField: '' });
    } else {
      const newUserList = [newUser].concat([...this.state.appdata.userLists]);
      const newOrderedList = [...this.state.orderedList].concat([newUser]);
      const newUsersObj = Object.assign({}, this.state.appdata.users);
      newUsersObj[userKey] = { displayName: newUser, feeds: [], history: [],queries: [],toWatchLater: []};
      const lastIndex = this.state.orderedList.length;

      this.setState({
        addUserInputField: '',
        orderedList: newOrderedList,
        selectedIndex: lastIndex,
        appdata: { userLists: newUserList, users: newUsersObj },
      }, () => {
        setItem('appdata', this.state.appdata)
      });
    }
  }

  onUserEnter = (e) => {
    if (e.key !== 'Enter') return;
    if (!this.state.addUserInputField) return;
    this.clickAddBtn();
  }

  updateUserInputField = (e) => {
    if (e.target.value.length > 25) {
      alert('The user name is too long!')
      this.setState({ addUserInputField: '' });
    } else {
      this.setState({ addUserInputField: e.target.value });
    }
  }
  // <--------------- Add User Logic

  // User Dropdown Logic ----------------->
  showMatchingUsers = (e) => {
    if (e.target.value.length > 25) {
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
    if (mostRecentUser === this.state.appdata.userLists[0]) return;
    const usersSet = new Set([mostRecentUser].concat(this.state.appdata.userLists));
    const userArr = Array.from(usersSet);
    const oldAppData = Object.assign({}, this.state.appdata);
    const newAppData = Object.assign(oldAppData, { userLists: userArr });
    this.setState({
      appdata: newAppData,
      selectedIndex: index,
      userSrchInputField: '',
      userSrchStr: '',
    }, () => {
      setItem('appdata', this.state.appdata)
    });
  }

  clickX = (e) => {
    const index = parseInt(e.target.getAttribute('index'));
    const user = this.state.orderedList[index];
    const soonToBeSelectedUser = this.state.orderedList[index + 1];
    const text = `Are you sure you want to delete ${user}\n    and all of ${user}'s feeds?`;

    if (window.confirm(text)) {
      // new ordered list
      const orderedList = this.state.orderedList;
      const newOrderedList = orderedList.slice(0, index).concat(orderedList.slice(index + 1));
      // new user list with updated current user
      let selectedIndex = this.state.selectedIndex;
      const newUserList0 = this.state.appdata.userLists.filter(e => e !== user);
      let newUserList = newUserList0;
      if (user === this.state.appdata.userLists[0]) {
        // if user to be removed is the same as selected user, update most current on userList
        newUserList0.unshift(soonToBeSelectedUser);
        const newSet = new Set(newUserList0);
        newUserList = Array.from(newSet);
      }
      if (index < selectedIndex) selectedIndex--;

      // delete user key from this.state.appdata.users
      const newUsersObj = Object.assign({}, this.state.appdata.users);
      const userKey = user.toLowerCase();
      delete newUsersObj[userKey];

      this.setState({
        appdata: { users: newUsersObj, userLists: newUserList },
        orderedList: newOrderedList,
        selectedIndex,
      }, () => {
        alert(`${user}'s account permanently deleted.`)
        setItem('appdata', this.state.appdata)
      })
    } else {
      console.log('not ready to delete yet')
      return;
    }
  }
  // <--------------- User Dropdown Logic

  // Add Feed Logic --------------------->
  clickAddFeedBtn = (e) => {
    const newFeed = this.state.addFeedInputField;
    if (!newFeed) return;
    if (!this.state.appdata.userLists[0]) {
      alert('No user selected yet.');
      this.setState({ addFeedInputField: '' });
      return;
    }
    const userKey = this.state.appdata.userLists[0].toLowerCase();
    const oldFeedList = this.state.appdata.users[userKey].feeds;

    if (oldFeedList.some(f => f.feedname.toLowerCase() === newFeed.trim().toLowerCase())) {
      alert('This feed already exists!');
      this.setState({ addFeedInputField: '' });
      return;
    } else {
      const newUsersObj = Object.assign({}, this.state.appdata.users);
      const newFeedObj = {
        feedname: newFeed,
        videos: [],
        lastUpdated: new Date(),
      };
      newUsersObj[userKey].feeds.unshift(newFeedObj);

      this.setState({
        users: newUsersObj,
        addFeedInputField: '',
      }, () => {
        setItem('appdata', this.state.appdata)
      });
    }
  }

  updateFeedInputField = (e) => {
    if (e.target.value.length > 30) {
      alert('The feed name is too long!')
      this.setState({ addFeedInputField: '' });
    } else {
      this.setState({ addFeedInputField: e.target.value });
    }
  }

  onFeedEnter = (e) => {
    if (e.key !== 'Enter') return;
    if (!this.state.addFeedInputField) return;
    this.clickAddFeedBtn();
  }
  // <--------------------- Add Feed Logic

  // Feed Dropdown Logic --------------------->
  showMatchingFeeds = (e) => {
    if (e.target.value.length > 25) {
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
    const userKey = this.state.appdata.userLists[0].toLowerCase();
    const oldFeedList = [...this.state.appdata.users[userKey].feeds];
    const clickedFeed = oldFeedList[index];
    oldFeedList.unshift(clickedFeed);
    const newFeedSet = new Set(oldFeedList);
    const newFeedList = Array.from(newFeedSet);
    const newUsersObj = Object.assign({}, this.state.appdata.users);
    newUsersObj[userKey].feeds = newFeedList;
    const newUserLists = [...this.state.appdata.userLists];
    const newObj = { userLists: newUserLists, users: newUsersObj };
    this.setState({ appdata: newObj }, () => {
      setItem('appdata', this.state.appdata)
    });
  }

  clickFeedX = (e) => {
    if (e.target.innerText !== 'x') return;
    const index = parseInt(e.target.getAttribute('index'));
    const userKey = this.state.appdata.userLists[0].toLowerCase();
    const feedList = this.state.appdata.users[userKey].feeds;
    const newFeedList = feedList.slice(0, index).concat(feedList.slice(index + 1));
    const newUsersObj = Object.assign({}, this.state.appdata.users);
    newUsersObj[userKey].feeds = newFeedList;
    const newUserLists = [...this.state.appdata.userLists];
    const newAppData = { users: newUsersObj, userLists: newUserLists }

    this.setState({ appdata: newAppData }, () => {
      setItem('appdata', this.state.appdata)
    });
  }
  // <--------------------- Feed Dropdown Logic

  componentDidMount = () => {
    getItem('appdata')
      .then((data) => {
        if (!data) {
          setItem('appdata', this.state.appdata)
        }
        else {
          // ordered list becomes a copy of userlist;
          this.setState({
            orderedList: data.userLists,
            appdata: data,
          })
        }
      })
  }

  render() {
    const { orderedList,
      appdata,
      addUserInputField,
      selectedIndex,
      userSrchStr,
      userSrchInputField,

      feedSrchInputField,
      feedSrchStr,
      addFeedInputField
    } = this.state;

    const currFeeds = appdata.userLists[0] ?
      appdata.users[appdata.userLists[0].toLowerCase()].feeds
      : [];

    return (
      <>
        <div className='editor-wrapper' onClick={this.props.toggle}>
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
              currUser={appdata.userLists[0] || []}
              orderedList={orderedList}
              selectedIndex={selectedIndex}
              showMatchingUsers={this.showMatchingUsers}
              searchStr={userSrchStr}
              userSrchInputField={userSrchInputField}
              clickX={this.clickX}
            />
          </div>
          <div className='feedbox'>
            <AddFeed
              addFeedInputField={addFeedInputField}
              updateFeedInputField={this.updateFeedInputField}
              clickAddBtn={this.clickAddFeedBtn}
              onFeedEnter={this.onFeedEnter}
            />
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </>
    );
  }
}

export default EditorApp;