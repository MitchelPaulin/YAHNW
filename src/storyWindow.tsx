import React, { Component } from 'react';
import CommentWindow from './commentWindow';
import Story from './story';
import { StoryType } from './storyType';
import './styles/storyWindow.css'

type Props = {
    storyMode: StoryType
}

type State = {
    selectedStory: number | null,
    selectedStoryText: string | null,
    storyIds: number[],
    storyCommentIds: number[]
}

class StoryWindow extends Component<Props, State> {
    ref: any;

    constructor(props: Props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            storyIds: [],
            storyCommentIds: [],
            selectedStory: null,
            selectedStoryText: null
        }
    }

    commentClickCallback = (kidsArray: number[], id: number, displayText: string) => {
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
    }

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

    render() {

        if (this.state.storyIds) {
            let stories = [];
            for (let storyId of this.state.storyIds) {
                stories.push(<Story
                    key={storyId}
                    id={storyId.toString()}
                    commentCallback={this.commentClickCallback}
                    selected={this.state.selectedStory === storyId}>
                </Story>)
            }
            return (
                <div className="flex">
                    <div className="box-left" ref={this.ref}>
                        {stories}
                    </div>
                    <div className='box-right'>
                        <CommentWindow kids={this.state.storyCommentIds} displayText={this.state.selectedStoryText || ''}></CommentWindow>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <p className='loading'>
                    Loading...
                </p>
            </div>
        );
    }
}

export default StoryWindow;