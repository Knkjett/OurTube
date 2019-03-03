import React from 'react';
import VideoPlayer from '../components/Video/videoplayer';

const Err = () => {
  return (<>
    <div className='container'>
      <div className='row'>
        <h2>Oops, there seems to be an error!</h2>
        <h3>Sorry for the inconvenience</h3>
      </div>
      <div className='row'>
        {/* 7dYKEMSMV3w */}
        < VideoPlayer vidID={'7dYKEMSMV3w'} /> 
      </div>
    </div>
  </>)
}


export default Footer;