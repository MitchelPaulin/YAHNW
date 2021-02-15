import React, { Component } from 'react';
import './story.css'

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function getDataFromUnixTimestamp(unixTimestamp){
    let time = new Date(unixTimestamp * 1000);
    return [months[time.getMonth()], time.getDate()].join('-');
}

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
            console.log(this.state.json)
            return (
                <div class="bottom">
                    <div style={{float: 'left', width: '80%'}}>
                        <a class="title" href={this.state.json['url']}>{this.state.json['title']}</a>
                        <p class="author">{this.state.json['by']}</p>
                        <p class="link">{this.state.json['url']}</p>
                    </div>
                    <div style={{float: 'right', width: '8%'}}>
                        <div class="block">
                            <p class="right-item inline">{this.state.json['score']}</p>
                            <div class="right-item triangle-up inline"></div>
                        </div>
                        <div class="block">
                            <p class="right-item inline">{this.state.json['kids'] ? this.state.json['kids'].length : 0}</p>
                            <div class="bubble bubble-bottom-left inline"></div>
                        </div>
                        <p class="right-item inline">{getDataFromUnixTimestamp(this.state.json['time'])}</p>
                    </div>
                    <div style={{clear:'both'}}></div>
                </div>
            )
        }
        return (
            <div></div>
        )
    }
}

export default Story;