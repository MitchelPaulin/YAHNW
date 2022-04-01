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
    dead: boolean | undefined,
    kids: number[]
}

type State = {
    kids: string[],
    comment: Comments | null,
    isHidden: boolean
}

const commentColours = [
    "#dfb976",
    "#c172d9",
    "#4fb1bc",
    "#97c26c",
    "#abb2c0",
    "#5caeef"
];

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

        fetch(`https://hacker-news.firebaseio.com/v0/item/${root}.json`)
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
        console.log(this.state?.comment?.dead);
        if (this.state.comment && !this.state.comment.dead && this.state.comment.text?.length) {

            //Comments are given in HTML, important that we sanitize the content before displaying it 
            let purified = DOMPurify.sanitize(this.state.comment.text);

            //Create the child comments of this comment
            let childComments = [];
            if (this.state.comment.kids) {
                for (let kid of this.state.comment.kids) {
                    childComments.push(<Comment key={kid} rootKid={kid} nesting={this.props.nesting + 1}></Comment>);
                }
            }

            let commentSeparatorColor = 'none';
            let leftPadding = '0';
            if (this.props.nesting > 0) {
                commentSeparatorColor = '2px inset ' + commentColours[this.props.nesting % commentColours.length];
                leftPadding = '1%';
            }

            const nextCommentSeparatorColor = '2px inset ' + commentColours[(this.props.nesting + 1) % commentColours.length];


            if (!this.state.isHidden) {
                return (
                    <div style={{ paddingLeft: leftPadding }}>
                        <div style={{ marginLeft: '4px', borderLeft: commentSeparatorColor }}>
                            <button className='comment-author' onClick={() => this.authorClicked()}>
                                <div className='triangle-box'>
                                    <div className='triangle-up-comment' />
                                </div>
                                {this.state.comment.by}
                                <p className='time'>{getHumanReadableTimeElapsed(this.state.comment.time)}</p>
                            </button>
                            <div style={{ paddingLeft: '1%' }}>
                                <div className='comment-box' style={{ borderLeft: nextCommentSeparatorColor }}
                                    dangerouslySetInnerHTML={{
                                        __html: purified
                                    }} />
                            </div>
                            {childComments}
                        </div>
                    </div>
                )
            }

            return (
                <div style={{ paddingLeft: leftPadding }}>
                    <div style={{ marginLeft: '4px', borderLeft: commentSeparatorColor }}>
                        <button className='comment-author' onClick={() => this.authorClicked()}>
                            <div className='triangle-box'>
                                <div className='triangle-down-comment' />
                            </div>
                            {this.state.comment.by}
                            <p className='time'>
                                {getHumanReadableTimeElapsed(this.state.comment.time)}
                            </p>
                        </button>
                    </div>
                </div>
            )
        }
        return <div></div>
    }
}

export default Comment;