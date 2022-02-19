import { Component } from 'react';
import './styles/story.css';
import { getHumanReadableTimeElapsed } from './common';
import bubble from './imgs/bubble.png';

type Props = {
    selected: boolean,
    id: string,
    isMobile: boolean,
    commentCallback: (a: any[], b: string, c: string) => void
}

type State = {
    storyJson: any
}

class Story extends Component<Props, State> {

    constructor(props: Props) {
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
            .then((response) => {
                this.setState({ storyJson: response });
            });
    }

    commentIconClicked() {
        this.props.commentCallback(this.state.storyJson['kids'], this.state.storyJson['id'], this.state.storyJson['text']);
    }

    /*
        Remove the http(s)://www. from links to make them easier to read
    */
    minimizeUrl(url: string) {
        if (url) {
            return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
        }
        return '';
    }

    render() {

        if (!this.state.storyJson) {
            return <div></div>;
        }

        const styling = {
            backgroundColor: this.props.selected ? '#272727' : '',
        }

        if (this.props.isMobile) {
            return (
                <div className="story-container" style={styling}>
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
                            {this.minimizeUrl(this.state.storyJson['url'])}
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
                <div className="story-container" style={styling}>
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
                            {this.minimizeUrl(this.state.storyJson['url'])}
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