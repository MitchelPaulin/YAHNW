import React, { Component } from 'react';
import './styles/comment.css';
import DOMPurify from 'dompurify';
import { getHumanReadableTimeElapsed } from './common.js';

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            kids: null,
            comment: null,
            isHidden: false
        }
    }

    fetchComments(root) {
        let head = 'https://hacker-news.firebaseio.com/v0/item/';
        let tail = '.json'

        fetch(head + root + tail)
            .then((resp) => resp.json())
            .then(function (response) {
                this.setState({ comment: response });
            }.bind(this));
    }

    componentDidMount() {
        this.fetchComments(this.props.rootKid);
    }

    componentDidUpdate(prevProps) {
        if (this.props.rootKid !== prevProps.rootKid) {
            this.setState({ isHidden: false });
            this.fetchComments(this.props.rootKid);
        }
    }

    authorClicked() {
        this.setState({ isHidden: !this.state.isHidden });
    }

    render() {

        if (this.state.comment && !this.state.comment['deleted']) {

            //Comments are given in HTML, important that we sanitize the content before displaying it 
            let purified = DOMPurify.sanitize(this.state.comment['text']);

            //Create the child comments of this comment
            let childComments = [];
            if (this.state.comment['kids']) {
                for (let kid of this.state.comment['kids']) {
                    childComments.push(<Comment key={kid} rootKid={kid} nesting={this.props.nesting + 1}></Comment>);
                }
            }

            if (!this.state.isHidden) {
                return (
                    <div style={{ paddingLeft: (this.props.nesting === 0 ? '0%' : '2%') }}>
                        <div style={{ marginLeft: '4px', borderLeft: (this.props.nesting === 0 ? 'none' : '2px solid #a5a09f') }}>
                            <button className="comment-author" onClick={() => this.authorClicked()}>
                                <div className="triangle-box">
                                    <div className="triangle-up-comment"></div>
                                </div>
                                {this.state.comment['by']}
                                <p className="time">{getHumanReadableTimeElapsed(this.state.comment['time'])}</p>
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
                        <div style={{ marginLeft: '4px', borderLeft: (this.props.nesting === 0 ? 'none' : '2px solid #a5a09f') }}>
                            <button className="comment-author" onClick={() => this.authorClicked()}>
                                <div className="triangle-box">
                                    <div className="triangle-down-comment"></div>
                                </div>
                                {this.state.comment['by']}
                                <p className="time">
                                    {getHumanReadableTimeElapsed(this.state.comment['time'])}
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