import React from 'react';
import { Row, Col } from 'reactstrap';

const VideoPlayer = (props) => {

    // const published = props.currentVid.publishedAt;
    // const toPublish = published.split(".")
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
                            
                            <th scope="col">ChannelTitle:</th>
                            <th scope="col">Published At:</th>
                            <th scope="col"> Views: </th>

                        </tr>
                        <tr>

                        <th scope="col"><h5>{props.currentVid.channelTitle}</h5></th>
                        <th scope="col"><h5> {props.currentVid.publishedAt}</h5></th>
                        <th scope="col"><h5> {props.currentVid.viewCount}</h5></th>

                        </tr>
                    </thead>
                </table>
           </Col>
         </Row>

         
        </>
        )
}


export default VideoPlayer;