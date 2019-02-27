import React from 'react';
import Moment from 'moment'
import {Redirect} from 'react-router-dom';
import './searchList.css';

const toVideo = (e) => {
  console.log(e);
  return <Redirect to={`/video/${e}`} push/>
}

//IMG Resolutions are 90x120,180x320 360x480,
const VideoCard = (props) => {
  const isHidden = props.hidden ? props.hidden : '';
  return (<>
    <div className={'row videoPad ' + `${isHidden}`} onClick={()=>toVideo(props.ele.vidID)}>
      <img className='col-lg-5 col-sm-12 thumbnail' src={props.ele.thumbnail} alt='thumbnail' />
      <div className='col-lg-7 col-sm-12'>
        <div className='row title'>{props.ele.title}</div>
        <div className='row '>
          <span className='channelInfo'>{props.ele.channelTitle} • {Moment(props.ele.publishedAt).fromNow()}</span>
        </div>
        <div className='row desc'>{props.ele.description}</div>
        <div className='row'>{props.ele.vidID}</div>
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