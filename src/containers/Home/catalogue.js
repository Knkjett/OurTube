import React, { Component } from 'react';
import { getSearchResults, getVideoInfo, getItem, setItem } from '../../services/service'
import Feed from './feed'
import './catalogue.css';

class Catalogue extends Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            appdata:{}
        }
    }

    componentDidMount = () => {
        getItem('appdata')
        .then((data) => {
            this.setState({appdata: data, isLoading: false})
        })
    }

    render(){

        const copy = {...this.state}
        delete copy['isLoading']

        return (
            <div className="container" onClick={this.props.toggle}>
            {this.state.isLoading ? 
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div> : 
                    this.state.appdata.users[this.state.appdata.userList[0]].feeds.map((feed, i) => {
                        return <Feed key={i} keyVal={i} name={feed.feedname} state={copy} toggle={this.props.toggle} user={this.state.appdata.userList[0]} isLoading={feed.isLoading}/>
                    })}
            </div>
        )
    }
}

export default Catalogue;