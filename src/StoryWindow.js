import React, { Component } from 'react';
import CommentWindow from './CommentWindow';
import Story from './Story';
import './styles/storyWindow.css'

class StoryWindow extends Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            storyIds: null,
            storyCommentIds: null,
            selectedStory: null,
            selectedStoryText: null,
            isMobile: this.isMobileView()
        }
    }

    commentClickCallback = (kidsArray, id, displayText) => {
        this.setState({ storyCommentIds: kidsArray, selectedStory: id, selectedStoryText: displayText });
    }

    componentDidUpdate(prevProps) {
        if (this.props.storyMode !== prevProps.storyMode) {
            this.fetchStories();
            this.scrollToTopOfPage();
        }
    }

    componentDidMount() {
        this.fetchStories();
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        if (this.state.isMobile !== this.isMobileView()) {
            this.setState({ isMobile: !this.state.isMobile })
        }
    };

    scrollToTopOfPage() {
        this.ref.current.scrollTo(0, 0);
    }

    fetchStories() {
        let url;
        if (this.props.storyMode === 'Top') {
            url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
        } else if (this.props.storyMode === 'Best') {
            url = 'https://hacker-news.firebaseio.com/v0/beststories.json';
        } else if (this.props.storyMode === 'New') {
            url = 'https://hacker-news.firebaseio.com/v0/newstories.json';
        } else {
            url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
        }

        fetch(url)
            .then((resp) => resp.json())
            .then(function (response) {
                this.setState({ storyIds: response });
            }.bind(this));
    }

    isMobileView() {
        return window.innerWidth <= 1000;
    }

    render() {

        if (this.state.storyIds) {
            let stories = [];
            for (let storyId of this.state.storyIds) {
                stories.push(<Story key={storyId} id={storyId} commentCallback={this.commentClickCallback} isMobile={this.state.isMobile} selected={this.state.selectedStory === storyId && !this.state.isMobile}></Story>)
            }
            if (this.isMobileView()) {
                return (
                    <div className="wrap">
                        <div className="story-window box-full" ref={this.ref}>
                            {stories}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="wrap">
                        <div className="story-window box-left" ref={this.ref}>
                            {stories}
                        </div>
                        <div className="box-right">
                            <CommentWindow kids={this.state.storyCommentIds} displayText={this.state.selectedStoryText}></CommentWindow>
                        </div>
                    </div>
                );
            }

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