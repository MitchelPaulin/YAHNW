import React, { Component } from 'react';
import './styles/story.css';
import { getHumanReadableTimeElapsed } from './common.js';
import bubble from './imgs/bubble.png';
class Story extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storyJson: null
        };
    }

    componentDidMount() {

        let link = 'https://hacker-news.firebaseio.com/v0/item/';
        let tail = '.json';

        fetch(link + this.props.id + tail)
            .then((resp) => resp.json())
            .then(function (response) {
                this.setState({ storyJson: response });
            }.bind(this));
    }

    commentIconClicked() {
        this.props.commentCallback(this.state.storyJson['kids'], this.state.storyJson['id'], this.state.storyJson['text']);
    }

    render() {

        if (!this.state.storyJson) {
            return <div></div>;
        }

        if (this.props.isMobile) {
            return (
                <div className="story-container" style={this.props.selected ? { borderLeft: '10px solid #3b2e2a' } : {}}>
                    <div className="story-card">
                        <a className="title" href={this.state.storyJson['url']}>
                            {this.state.storyJson['title']}
                        </a>
                        <div className="flex">
                            <p className="author">
                                {this.state.storyJson['by']}
                            </p>
                            <p className="time-story">
                                {getHumanReadableTimeElapsed(this.state.storyJson['time'])}
                            </p>
                        </div>
                        <a className="link" href={this.state.storyJson['url']}>
                            {this.state.storyJson['url']}
                        </a>
                    </div>
                    <div className="points-box">
                        <div className="flex">
                            <p className="score">
                                {this.state.storyJson['score']}
                            </p>
                            <div className="triangle-up" />
                        </div>
                    </div>
                    <div style={{ clear: 'both' }} />
                </div>
            )
        } else {
            return (
                <div className="story-container" style={this.props.selected ? { borderLeft: '10px solid #3b2e2a' } : {}}>
                    <div style={{ float: 'left', width: '85%' }}>
                        <a className="title" href={this.state.storyJson['url']}>
                            {this.state.storyJson['title']}
                        </a>
                        <div className="flex">
                            <p className="author">
                                {this.state.storyJson['by']}
                            </p>
                            <p className="time-story">
                                {getHumanReadableTimeElapsed(this.state.storyJson['time'])}
                            </p>
                        </div>
                        <a className="link" href={this.state.storyJson['url']}>
                            {this.state.storyJson['url']}
                        </a>
                    </div>
                    <div className="comments-and-points-box">
                        <div className="flex">
                            <p className="score">
                                {this.state.storyJson['score']}
                            </p>
                            <div className="triangle-up" />
                        </div>
                        <button className="flex comment-button" onClick={() => this.commentIconClicked()}>
                            <p className="comment-count">
                                {this.state.storyJson['kids'] ? this.state.storyJson['kids'].length : 0}
                            </p>
                            <img src={bubble} alt="speech bubble" className="speech-bubble" />
                        </button>
                    </div>
                    <div style={{ clear: 'both' }} />
                </div>
            )
        }


    }
}

export default Story;