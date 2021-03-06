import React, { Component } from 'react';
import CommentWindow from './CommentWindow';
import Story from './Story';
import './styles/storyWindow.css'

class StoryWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            kids: null,
            selectedStory: null
        }
    }

    commentClickCallback = (kidsArray, id) => {
        this.setState({ kids: kidsArray, selectedStory: id });
    }

    componentDidMount() {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
            .then((resp) => resp.json())
            .then(function (response) {
                this.setState({ data: response });
            }.bind(this));
    }

    render() {

        if (this.state.data) {
            let stories = [];
            for (let s of this.state.data) {
                stories.push(<Story key={s} id={s} commentCallback={this.commentClickCallback} selected={this.state.selectedStory === s}></Story>)
            }
            return (
                <div className="wrap">
                    <div className="story-window box-left">
                        {stories}
                    </div>
                    <div className="box-right">
                        <CommentWindow kids={this.state.kids}></CommentWindow>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <p className="loading">
                    Loading...
                </p>
            </div>
        );
    }
}

export default StoryWindow;