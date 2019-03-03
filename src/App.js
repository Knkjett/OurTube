import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Navbar from './components/Navbar/navbar'
import VideoApp from './routes/videoApp';
import HomeApp from './routes/homeApp';
import SearchApp from './routes/searchApp';
import EditorApp from './routes/editorApp';
import Err from './routes/err';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
    }
  }

  toggle = (e) => {
    console.log(e.target)
    if(e.target.getAttribute('ismenu')){
      this.setState({menuOpen: !this.state.menuOpen})
    }
    else{
      if(e.target.getAttribute('ismenuitem')) return;
      else if(this.state.menuOpen) this.setState({menuOpen: false}) 
    }
  }

  componentDidMount() {
    console.log(this.state.menuOpen)
  }

  render() {

    return (
    <div className="max" onClick={this.toggle}>
      <Navbar display={this.state.menuOpen} toggle={this.toggleMenu}/>
      <HashRouter>
        <Switch>
          <Route path='/' exact component={HomeApp} toggle={this.toggleMenu}/>
          <Route path='/editor' exact component={EditorApp} toggle={this.toggleMenu}/>
          <Route path='/search/:search' exact toggle={this.toggleMenu} render={()=> <SearchApp isSearch={true} />}/>
          <Route path='/history' exact toggle={this.toggleMenu} render={()=> <SearchApp isSearch={false} />}/>
          <Route path='/video/:id' exact toggle={this.toggleMenu} component={VideoApp} />
          <Route component={Err} />
        </Switch>
      </HashRouter>
    </div>)
  }
}

export default App;
