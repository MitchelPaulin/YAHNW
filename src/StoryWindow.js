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
            selectedStory: null,
            storyMode: this.props.storyMode
        }
    }

    commentClickCallback = (kidsArray, id) => {
        this.setState({ kids: kidsArray, selectedStory: id });
    }

    componentDidUpdate(prevProps) {
        if (this.props.storyMode !== prevProps.storyMode) {
            this.setState({ storyMode: this.props.storyMode });
            this.fetchStories();
        }
    }

    componentDidMount() {
        this.fetchStories();
    }

    fetchStories() {
        let url;
        if(this.state.storyMode === 'Top') {
            url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
        } else if (this.state.storyMode === 'Best') {
            url = 'https://hacker-news.firebaseio.com/v0/beststories.json';
        } else if (this.state.storyMode === 'New') {
            url = 'https://hacker-news.firebaseio.com/v0/newstories.json';
        } else {
            url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
        }

        fetch(url)
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