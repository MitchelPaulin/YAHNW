import React, { Component } from 'react';
import './styles/story.css';
import { getHumanReadableTimeElapsed } from './common.js';
import bubble from './imgs/bubble.png';
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
                <div className="bottom" style={this.props.selected ? { borderLeft: '10px solid #3b2e2a' } : {}}>
                    <div style={{ float: 'left', width: '85%' }}>
                        <a className="title" href={this.state.json['url']}>
                            {this.state.json['title']}
                        </a>
                        <div style={{ display: 'flex' }}>
                            <p className="author">
                                {this.state.json['by']}
                            </p>
                            <p className="time-story">
                                {getHumanReadableTimeElapsed(this.state.json['time'])}
                            </p>
                        </div>
                        <a className="link" href={this.state.json['url']}>
                            {this.state.json['url'] && this.state.json['url'].length > 115 ? this.state.json['url'].substring(0, 112) + '...' : this.state.json['url'] }
                        </a>
                    </div>
                    <div style={{ float: 'right', width: '8%' }}>
                        <p className="inline">
                            {this.state.json['score']}
                        </p>
                        <div className="triangle-up inline" />
                        <div className="block" onClick={() => this.commentIconClicked()}>
                            <p className="inline">
                                {this.state.json['kids'] ? this.state.json['kids'].length : 0}
                            </p>
                            <img src={bubble} alt="speech bubble" style={{ width: "25%" }} />
                        </div>
                    </div>
                    <div style={{ clear: 'both' }} />
                </div>
            )
        }
        return (
            <div></div>
        )
    }
}

export default Story;