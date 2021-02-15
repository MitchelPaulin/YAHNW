import React, { Component } from 'react';
import CommentWindow from './CommentWindow';
import Story from './Story';
import './storyWindow.css'

class StoryWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            kids: null
        }
    }

    commentClickCallback = (kidsArray) => { this.setState({ kids: kidsArray }) };

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
                stories.push(<Story id={s} commentCallback={this.commentClickCallback}></Story>)
            }
            return (
                <div class="wrap">
                    <div class="StoryWindow box-left">
                        {stories}
                    </div>
                    <div class="box-right">
                        <CommentWindow kids={this.state.kids}></CommentWindow>
                    </div>
                </div>
            );
        }

        return <div>Loading...</div>;;
    }
}

export default StoryWindow;