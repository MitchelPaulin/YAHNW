import { Component } from 'react';
import './styles/story.css';
import { getHumanReadableTimeElapsed } from './common';

type Props = {
    selected: boolean,
    id: string,
    commentCallback: (a: number[], b: number, c: string) => void
}

type State = {
    storyJson: {
        kids: number[],
        id: number,
        text: string,
        url: string,
        by: string,
        title: string,
        time: number,
        score: number
    } | null;
}

class Story extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            storyJson: null
        };
    }

    componentDidMount() {

        fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.id}.json`)
            .then((resp) => resp.json())
            .then((response) => {
                this.setState({ storyJson: response });
            });
    }

    commentIconClicked() {
        if (this.state.storyJson) {
            this.props.commentCallback(this.state.storyJson.kids, this.state.storyJson.id, this.state.storyJson.text);
        }
    }

    /*
        Remove the http(s)://www. from links to make them easier to read
    */
    minimizeUrl(url: string) {
        if (url) {
            return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
        }
        return '';
    }

    getFaviconUrl(url: string) {
        if (url === undefined || url === null) {
            return '';
        }
        url = this.minimizeUrl(url);
        const base = url.split('/')[0];
        return `https://www.google.com/s2/favicons?domain=${base}/`;
    }


    render() {

        if (!this.state.storyJson) {
            return <div></div>;
        }

        const styling = {
            backgroundColor: this.props.selected ? 'var(--background-color-highlight)' : '',
        }

        return (
            <div className='story-container' style={styling}>
                <div className='main-window'>
                    <a className='title' href={this.state.storyJson.url}>
                        <p>{this.state.storyJson.title}</p>
                    </a>
                    <div className='flex'>
                        <p className='author'>
                            {this.state.storyJson.by}
                        </p>
                        <p className='time-story'>
                            {getHumanReadableTimeElapsed(this.state.storyJson.time)}
                        </p>
                    </div>
                    <div className='link-box'>
                        <img
                            src={this.getFaviconUrl(this.state.storyJson.url)}
                            alt='site favicon'
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.hidden = true;
                            }}
                        />
                        <a className='link' href={this.state.storyJson.url}>
                            {this.minimizeUrl(this.state.storyJson.url)}
                        </a>
                    </div>
                </div>
                <div className='comments-and-points-box'>
                    <div className='flex-child'>
                        <p className='score'>
                            {this.state.storyJson.score}
                        </p>
                        <div className='triangle-up' />
                    </div>
                    <div className='flex-child'>
                        <button className='comment-button' onClick={() => this.commentIconClicked()}>
                            <div className='button-body'>
                                <p className='comment-count'>
                                    {this.state.storyJson.kids ? this.state.storyJson.kids.length : 0}
                                </p>
                                <img alt='speech bubble' className='speech-bubble' />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        )


    }
}

export default Story;