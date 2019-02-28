import React from 'react';
import { Row, Col } from 'reactstrap';

const VideoPlayer = (props) => {
    return (
        
        <>
          
            <iframe title='yt-video' type="text/html" width="740" height="440"
            src={`https://www.youtube.com/embed/${props.vidID}?autoplay=1&fs=1&origin=http://localhost:3000`} frameBorder="0"></iframe>
         
         <Row> 
           <Col col-12>
           
            <h3> Title </h3>
            <h4> Description </h4>
            <h5> Stats </h5>
           </Col>
         </Row>

         
        </>
        )
}


export default VideoPlayer;