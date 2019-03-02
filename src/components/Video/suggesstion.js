import React from 'react';
import './suggestion.css';
import { Card, CardImg, CardTitle, CardText, CardImgOverlay } from 'reactstrap';


const Suggestions = (props) => {

  return (
    <> 
      <Card vidid={props.vidid} onClick={props.handleClick} inverse >
        <CardImg vidid={props.vidid} width="100%" src={props.thumbnail} alt="Card image cap" />
        <CardImgOverlay vidid={props.vidid}>
          {/* <CardTitle vidid= {props.vidid}> {props.title} </CardTitle> */}
          {/* <CardText vidid= {props.vidid}> </CardText> */}
          {/* <CardText vidid= {props.vidid} > */}

          {/* <small vidid= {props.vidid} className="text-muted"></small> */}
          {/* </CardText > */}
        </CardImgOverlay>
      </Card>
    </>
  )
}

export default Suggestions;