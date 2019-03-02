import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import "./comments.css"


class Comments extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);

    this.state = { 
      collapse: true,
      collapse2: true,
     };
  }

  toggle() {
    this.setState({ 
      collapse: !this.state.collapse,
    });
  }

  toggle2() {
    this.setState({ 
      collapse2: !this.state.collapse2,
    });
  }

  render() {
    return ( <>
      <div className="wrapper">
    
        <Button className="btn" color="secondary" size="lg" onClick={this.toggle} style={{ marginBottom: '0rem' }} block> Description </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              {this.props.currVidDescription}
            </CardBody>
          </Card>
        </Collapse>
      </div>
      <div>
      <Button color="secondary" size="lg" onClick={this.toggle2} style={{ marginBottom: '0rem' }} block> Tags </Button>
      <Collapse isOpen={this.state.collapse2}>
        <Card>
          <CardBody>
            <h4>{this.props.currVidTags.map(e => { return e + " "})} </h4>
          </CardBody>
        </Card>
      </Collapse>
    </div>
    </>
    );
  }
}

export default Comments