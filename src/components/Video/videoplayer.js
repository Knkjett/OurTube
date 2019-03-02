import React from 'react';
import { Row, Col } from 'reactstrap';

const VideoPlayer = (props) => {
    return (
        
        <>
          
            <iframe title='yt-video' type="text/html" width="740" height="440"
            src={`https://www.youtube.com/embed/${props.currentVid.vidID}?autoplay=1&fs=1&origin=http://localhost:3000`} frameBorder="0" allowFullScreen="allowfullscreen"></iframe>
         
         <Row> 
           <Col col-12>
           <h3> {props.currentVid.title} </h3>
           <table className=" border table table-borderless">
                    <thead>
                        <tr> 
                            
                            <th scope="col">ChannelTitle: {props.currentVid.channelTitle}</th>
                            <th scope="col">Duration: {props.currentVid.duration}</th>
                            <th scope="col"> Views: {props.currentVid.viewCount}</th>
                            {/* <th scope="col">Sp. Attack</th> */}
                            {/* <th scope="col">Sp. Defense</th> */}
                            {/* <th scope="col">Speed</th> */}
                        </tr>
                    </thead>
                </table>
           </Col>
         </Row>

         
        </>
        )
}


export default VideoPlayer;