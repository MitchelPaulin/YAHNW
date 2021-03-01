import React, { Component } from 'react';
import './styles/story.css';
import { getHumanReadableTimeElapsed } from './common.js';
import bubble from './imgs/bubble.svg';
class Story extends Component {

    constructor(props) {
        super(props);
        this.state = {
            json: null
        };
    }

    componentDidMount() {

        let link = 'https://hacker-news.firebaseio.com/v0/item/';
        let tail = '.json';

        fetch(link + this.props.id + tail)
            .then((resp) => resp.json())
            .then(function (response) {
                this.setState({ json: response });
            }.bind(this));
    }

    commentIconClicked() {
        this.props.commentCallback(this.state.json['kids'], this.state.json['id']);
    }

    render() {
        if (this.state.json) {
            return (
                <div class="bottom" style={this.props.selected ? { borderLeft: '7px solid #fab162' } : {}}>
                    <div style={{ float: 'left', width: '85%' }}>
                        <a class="title" href={this.state.json['url']}>{this.state.json['title']}</a>
                        <div style={{ display: 'flex' }}>
                            <p class="author">{this.state.json['by']}</p>
                            <p class="time-story">{getHumanReadableTimeElapsed(this.state.json['time'])}</p>
                        </div>
                        <a class="link" href={this.state.json['url']}>{this.state.json['url']}</a>
                    </div>
                    <div style={{ float: 'right', width: '8%' }}>
                        <p class="inline">{this.state.json['score']}</p>
                        <div class="triangle-up inline"></div>
                        <div class="block" onClick={() => this.commentIconClicked()}>
                            <p class="inline">{this.state.json['kids'] ? this.state.json['kids'].length : 0}</p>
                            <img src={bubble} alt="speech bubble" style={{ width: "25%"}}></img>
                        </div>
                    </div>
                    <div style={{ clear: 'both' }}></div>
                </div>
            )
        }
        return (
            <div></div>
        )
    }
}

export default Story;