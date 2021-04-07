import React, { Component } from 'react';
import CommentWindow from './CommentWindow';
import Story from './Story';
import './styles/storyWindow.css'

class StoryWindow extends Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            data: null,
            kids: null,
            selectedStory: null,
            isMobile: this.isMobileView()
        }
    }

    commentClickCallback = (kidsArray, id) => {
        this.setState({ kids: kidsArray, selectedStory: id });
    }

    componentDidUpdate(prevProps) {
        if (this.props.storyMode !== prevProps.storyMode) {
            this.fetchStories();
            this.ref.current.scrollTo(0, 0); // scroll to top of page
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
                this.setState({ data: response });
            }.bind(this));
    }

    isMobileView() {
        return window.innerWidth <= 1000;
    }

    render() {

        if (this.state.data) {
            let stories = [];
            for (let s of this.state.data) {
                stories.push(<Story key={s} id={s} commentCallback={this.commentClickCallback} isMobile={this.state.isMobile} selected={this.state.selectedStory === s && !this.state.isMobile}></Story>)
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
                            <CommentWindow kids={this.state.kids}></CommentWindow>
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