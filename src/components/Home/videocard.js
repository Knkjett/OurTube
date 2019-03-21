import React from 'react';
import './videocard.css';
import Moment from 'moment'

const VideoCard = (props) => {
  let vidName = props.info.title
  
  return (
  <div className="video col-xs-12 col-sm-6 col-md-6 col-lg-3" link={props.info.vidID} onClick={props.clickHandler}>
    <div className="videoContent" link={props.info.vidID}>
      <div className="thumbnail-box" link={props.info.vidID}>
        <img className="thumbnail" src={`https://img.youtube.com/vi/${props.info.vidID}/mqdefault.jpg`} alt={props.info.vidID} link={props.info.vidID}/>
      </div>
      <div>
        <div className="videoName" link={props.info.vidID}>{vidName}</div>
        <div className="channelName" link={props.info.vidID}>{props.info.channelTitle}</div>
        <div className="bottomInfo" link={props.info.vidID}>
          <div className="publishedAt" link={props.info.vidID}>{Moment(props.info.publishedAt).fromNow()}</div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default VideoCard