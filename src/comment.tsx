import { Component } from 'react';
import './styles/comment.css';
import DOMPurify from 'dompurify';
import { getHumanReadableTimeElapsed } from './common';

type Props = {
    rootKid: number,
    nesting: number
}

type Comments = {
    by: string,
    id: number,
    text: string,
    time: number,
    deleted: boolean,
    kids: number[]
}

type State = {
    kids: string[],
    comment: Comments | null,
    isHidden: boolean
}

class Comment extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            kids: [],
            comment: null,
            isHidden: false
        }
    }

    fetchComments(root: string) {
        let head = 'https://hacker-news.firebaseio.com/v0/item/';
        let tail = '.json'

        fetch(head + root + tail)
            .then((resp) => {
                return resp.json();
            })
            .then((response) => {
                this.setState({ comment: response });
            });
    }

    componentDidMount() {
        this.fetchComments(this.props.rootKid.toString());
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.rootKid !== prevProps.rootKid) {
            this.setState({ isHidden: false });
            this.fetchComments(this.props.rootKid.toString());
        }
    }

    authorClicked() {
        this.setState({ isHidden: !this.state.isHidden });
    }

    render() {

        if (this.state.comment && !this.state.comment.deleted) {

            //Comments are given in HTML, important that we sanitize the content before displaying it 
            let purified = DOMPurify.sanitize(this.state.comment.text);

            //Create the child comments of this comment
            let childComments = [];
            if (this.state.comment.kids) {
                for (let kid of this.state.comment.kids) {
                    childComments.push(<Comment key={kid} rootKid={kid} nesting={this.props.nesting + 1}></Comment>);
                }
            }

            if (!this.state.isHidden) {
                return (
                    <div style={{ paddingLeft: (this.props.nesting === 0 ? '0%' : '2%') }}>
                        <div style={{ marginLeft: '4px', borderLeft: (this.props.nesting === 0 ? 'none' : '2px solid grey') }}>
                            <button className="comment-author" onClick={() => this.authorClicked()}>
                                <div className="triangle-box">
                                    <div className="triangle-up-comment" />
                                </div>
                                {this.state.comment.by}
                                <p className="time">{getHumanReadableTimeElapsed(this.state.comment.time)}</p>
                            </button>
                            <div style={{ paddingLeft: '2%' }}>
                                <div className="comment-box"
                                    dangerouslySetInnerHTML={{
                                        __html: purified
                                    }} />
                            </div>
                            {childComments}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div style={{ paddingLeft: (this.props.nesting === 0 ? '0%' : '2%') }}>
                        <div style={{ marginLeft: '4px', borderLeft: (this.props.nesting === 0 ? 'none' : '2px solid grey') }}>
                            <button className="comment-author" onClick={() => this.authorClicked()}>
                                <div className="triangle-box">
                                    <div className="triangle-down-comment" />
                                </div>
                                {this.state.comment.by}
                                <p className="time">
                                    {getHumanReadableTimeElapsed(this.state.comment.time)}
                                </p>
                            </button>
                        </div>
                    </div>
                )
            }
        }
        return <div></div>
    }
}

export default Comment;