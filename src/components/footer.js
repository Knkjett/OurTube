import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class Footer extends Component{
  toHome = () =>{
    this.props.history.push(`/`)
  }
  toEditor = () =>{
    this.props.history.push(`/editor`)
  }
  render() {
    return (<>
      <footer className='page-footer font-small pt-4' style={{ backgroundColor: '#6900F9' }} onClick = {this.props.close} >
        <div className='container-fluid text-center text-md-left'>
          <div className='row'>
            <div className='col-lg-5 col-xs-12 mt-md-0 mt-3' style={{color: '#ffffff'}}>
              <h5 className='text-uppercase'>BingeWatch</h5>
              <p>Team Project to create React App utilizing YouTube API for search. Mimic Youtube features to display content such as Home/Feed view, Search feature, Video Page and additional extra features.</p>
            </div>
            <div className='col-lg-5'></div>
            <hr className='clearfix w-100 d-md-none pb-3' />
            <div className='col-lg-2 col-xs-12 mb-md-0 mb-3'>
              <h5 className='text-uppercase' style={{ textDecoration: 'none', color: '#ffffff'}}> Links</h5>
              <ul className='list-unstyled'>
                <li>
                <i className="fas fa-home"></i>
                <span onClick={this.toHome} style={{ textDecoration: 'none', color: '#ffffff', cursor:'pointer'}}> Home</span>
                </li>
                <li>
                <i className="fas fa-user-edit"></i>
                <span onClick={this.toEditor} style={{ textDecoration: 'none', color: '#ffffff', cursor:'pointer' }}> Editor</span>
                 </li>
                <li>
                <i className="fas fa-code-branch"></i>
                  <a href='https://github.com/Knkjett/OurTube/blob/master/README.md' style={{ textDecoration: 'none', color: '#ffffff' }}> About Us</a>
                </li>
                <li>
                <i className="fab fa-github"></i>
                  <a href='https://github.com/Knkjett/OurTube' style={{ textDecoration: 'none', color: '#ffffff' }}> GitHub</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright text-center py-3" style={{ backgroundColor: '#4500a5', color: '#ffffff' }}>
          <br />
          <br />
          BingeWatch
          <br />
          <br />
          <br />
        </div>
      </footer>
    </>)
  }

}

export default withRouter(Footer);