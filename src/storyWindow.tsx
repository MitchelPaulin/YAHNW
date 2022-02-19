import React, { Component } from 'react';
import CommentWindow from './commentWindow';
import Story from './story';
import { StoryType } from './storyType';
import './styles/storyWindow.css'

type Props = {
    storyMode: StoryType
}

type State = {
    isMobile: boolean,
    selectedStory: string,
    selectedStoryText: string,
    storyIds: any[],
    storyCommentIds: any[]
}

class StoryWindow extends Component<Props, State> {
    ref: any;

    constructor(props: Props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            storyIds: [],
            storyCommentIds: [],
            selectedStory: '',
            selectedStoryText: '',
            isMobile: this.isMobileView()
        }
    }

    commentClickCallback = (kidsArray: any[], id: string, displayText: string) => {
        this.setState({ storyCommentIds: kidsArray, selectedStory: id, selectedStoryText: displayText });
    }

    componentDidUpdate(prevProps: Props) {
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
        let url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
        if (this.props.storyMode === 'Best') {
            url = 'https://hacker-news.firebaseio.com/v0/beststories.json';
        } else if (this.props.storyMode === 'New') {
            url = 'https://hacker-news.firebaseio.com/v0/newstories.json';
        }

        fetch(url)
            .then((resp) => resp.json())
            .then((response) => {
                this.setState({ storyIds: response });
            });
    }

    isMobileView() {
        return window.innerWidth <= 1000;
    }

    render() {

        if (this.state.storyIds) {
            let stories = [];
            for (let storyId of this.state.storyIds) {
                stories.push(<Story
                    key={storyId}
                    id={storyId}
                    commentCallback={this.commentClickCallback}
                    isMobile={this.state.isMobile}
                    selected={this.state.selectedStory === storyId && !this.state.isMobile}>
                </Story>)
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