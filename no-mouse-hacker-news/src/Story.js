import React, { Component } from 'react';
import './story.css'

class Story extends Component {
    constructor(props){
        super(props);
        this.state = {id: null, json: null};
    }

    componentDidMount() {

        let link = 'https://hacker-news.firebaseio.com/v0/item/';
        let tail = '.json';

        fetch(link + this.props.id + tail)
        .then((resp) => resp.json())
        .then(function(response) {
            this.setState({json: response});
        }.bind(this));
    }

    render() {
        if(this.state.json){
            return (
                <div>
                    <h5>{this.state.json['title']}</h5>
                    <p>{this.state.json['url']}</p>
                    <hr></hr>
                </div>
            )
        }
        return (
            <div></div>
        )
    }
}

export default Story;