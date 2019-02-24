import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import VideoApp from './routes/videoApp';
import HomeApp from './routes/homeApp';
import SearchApp from './routes/searchApp';
import EditorApp from './routes/editorApp';

const Err = () => {
  return <h1>404</h1>
}

class App extends Component {
  
  render() {

    /*
    NAV STATE
      currentUser: 'guest', // Unused take from recentUsers
      recentUsers: ['guest', 'mo', 'taq'],
    */

    return (
    <>
      <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand">Navbar</a>
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
      <HashRouter>
        <Switch>
          <Route path='/' exact component={HomeApp} />
          <Route path='/editor' exact component={EditorApp} />
          <Route path='/search' exact component={SearchApp} />
          <Route path='/video/:id' exact component={VideoApp} />
          <Route component={Err} />
        </Switch>
      </HashRouter>
    </>)
  }
}

export default App;
