import React, { Component } from 'react';
import './suggestion.css';
import { Card, CardImg } from 'reactstrap';


class Suggestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vidid: props.vidid,
      appdata: props.appdata,
    };
  }


  render() {
    console.log("appdata in suggestions: ", this.props.appdata)

    return (
      <>
        <Card vidid={this.state.vidid} onClick={this.props.handleClick} >
    
          <div vidid={this.state.vidid} className="video" >
            <button vidid={this.state.vidid} idx={this.props.idx} className="watchLater" icon={'x'} watchLater={'later'} > watch Later </button>

            <CardImg vidid={this.state.vidid} src={this.props.thumbnail} alt="Card image cap" />

          </div>
        </Card>

      </>
    )
  }

}

export default Suggestions;