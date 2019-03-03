import React from 'react';
import VideoPlayer from '../components/Video/videoplayer';
import Footer from '../components/footer'

const Err = () => {
  return (<>
    <div className='container'>
      <div className='row'>
        <h2>404 Page not found. Sorry for the inconvenience.</h2>
        </div>
      <div className ='row'>
        <h3>Oops, there seems to be an error!</h3>
      </div>
      <div className='row'>
        < VideoPlayer vidID={'7dYKEMSMV3w'} /> 
      </div>
    </div>
    <br />
    <br />
    <Footer />
  </>)
}


export default Err;