import React from 'react';
import Moment from 'moment'
import './searchList.css';

//IMG Resolutions are 90x120,180x320 360x480,
const VideoCard = (props) => {
  const isHidden = props.hidden ? props.hidden : '';
  return (<>
    <div className={`row justify-content-center listViewVideoPad ${isHidden}`} onClick={props.cb} value={props.ele.vidID}>
      <img className='col-sm-4 col-xs-12 listViewThumbnail' src={props.ele.thumbnail} alt='thumbnail' value={props.ele.vidID}/>
      <div className='col-sm-8 col-xs-12' value={props.ele.vidID}>
        <div className='row listViewtitle' value={props.ele.vidID}>{props.ele.title}</div>
        <div className='row' value={props.ele.vidID}>
          <span className='listViewChannelInfo' value={props.ele.vidID}>{props.ele.channelTitle} • {Moment(props.ele.publishedAt).fromNow()}</span>
        </div>
        <div className='row listViewDesc' value={props.ele.vidID}>{props.ele.description}</div>
      </div>
    </div>
  </>)
}

const HiddenVid = (props) => {
  return <VideoCard {...props} hidden='hiddenVid' />
}

export {
  VideoCard,
  HiddenVid,
}