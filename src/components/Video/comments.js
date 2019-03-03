import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import "./comments.css"


class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      collapse: true,
      collapse2: false,
      collapse3: false,
     };
  }

  toggle= () => {
    this.setState({ 
      collapse: !this.state.collapse,
    });
  }

  toggle2 = () => {
    this.setState({ 
      collapse2: !this.state.collapse2,
    });
  }

  toggle3= () => {
    this.setState({ 
      collapse3: !this.state.collapse3,
    });
  }

  render() {
    console.log("to watch later: ",this.props.toWatchLaterList)
    return ( <>
      <div className="wrapper">
    
        <Button className="btn" color="info" size="lg" onClick={this.toggle} style={{ marginBottom: '0rem' }} block> Description </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              {this.props.currVidDescription}
            </CardBody>
          </Card>
        </Collapse>
      </div>
      <div>
      <Button color="info" size="lg" onClick={this.toggle2} style={{ marginBottom: '1rem' }} block> Tags </Button>
      <Collapse isOpen={this.state.collapse2}>
        <Card>
          <CardBody>
            <h4>{this.props.currVidTags.map(e => { return e + " "})} </h4>
          </CardBody>
        </Card>
      </Collapse>
    </div>
    <div>
      <Button color="info" size="lg" onClick={this.toggle3} style={{ marginBottom: '1rem' }} block> Watch Later </Button>
      <Collapse isOpen={this.state.collapse3}>
        <Card>
          <CardBody >
            
            {this.props.toWatchLaterList.map((e,i) => { return <img className="toWatchLaterr" key={i} imgidx={i} src={`${e.thumbnail}`} onClick={this.props.handleListOfWatchLater}/>})}
        
          </CardBody>
        </Card>
      </Collapse>
    </div>
    
    </>
    );
  }
}

export default Comments