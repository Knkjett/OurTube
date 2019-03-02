import React, { Component } from 'react';
import './suggestion.css';
import { Card, CardImg, CardTitle, CardText, CardImgOverlay } from 'reactstrap';
import { Link } from 'react-router-dom';

class Suggestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vidid: props.vidid,
      appdata: props.appdata,
      // towatchList = [],
    };
  }


  render() {
    console.log("appdata in suggestions: ", this.props.appdata)

    return (
      <>
        <Card vidid={this.state.vidid} onClick={this.props.handleClick} >
          {/* <Link to={'/video/'+this.state.vidid}></Link> */}
          <div vidid={this.state.vidid} className="video" onClick={this.props.handleClick}>
            <span vidid={this.state.vidid} idx={this.props.idx} className="watchLater" icon={'x'} onClick={this.props.addToWatchLater}> watchLater </span>

            {/* <CardImgOverlay vidid={this.state.vidid} icon={'sky'} onClick={this.props.handleClick} /> */}

            <CardImg vidid={this.state.vidid} src={this.props.thumbnail} alt="Card image cap" />

          </div>
          {/* <CardTitle vidid= {props.vidid}> {this.props.title} </CardTitle> */}
          {/* <CardText vidid= {props.vidid}> </CardText> */}
          {/* <CardText vidid= {props.vidid} > */}

          {/* <small vidid= {props.vidid} className="text-muted"></small> */}
          {/* </CardText > */}
          {/* </CardImgOverlay> */}
        </Card>

      </>
    )
  }

}

export default Suggestions;