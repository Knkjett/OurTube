import React from 'react';
import './videocard.css';
import Moment from 'moment'

const VideoCard = (props) => {
  let vidName = props.info.title

    return (
    <div className="video col-xs-12 col-sm-6 col-md-6 col-lg-3" link={props.info.vidID} onClick={props.toggle}>
    <div className="videoContent" link={props.info.vidID}>
      <div className="thumbnail-box" link={props.info.vidID}>
        <img className="thumbnail" src={`https://img.youtube.com/vi/${props.info.vidID}/mqdefault.jpg`} />
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

/*

vidID: 'Rmx1JGTX1yw',  // <-- alphanumerical video id
                  title: 'Funniest CATS EVER - Die LAUGING NOW!',
                  duration: '', // <--- length of the video in hh:mm:ss
                  channelTitle: 'Tiger FunnyWorks', // <-- channel video originated from 
                  description: 'Cats are the best pets and animals! Cats and kittens are so funny, they make us laugh and happy! They never fail to amuse us! This is the most impossible TRY ...', // <--- description of the video
                  viewCount: '',  //<--- how many times it was watched
                  publishedAt: '2018-07-26T11:00:05.000Z', // <--- date video was put on youtube}],
                 

*/

export default VideoCard