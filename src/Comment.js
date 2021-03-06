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
                    childComments.push(<Comment rootKid={kid} nesting={this.props.nesting + 1}></Comment>);
                }
            }

            if (!this.state.isHidden) {
                return (
                    <div style={{ paddingLeft: (this.props.nesting === 0 ? '0%' : '2%') }}>
                        <div style={{ borderLeft: (this.props.nesting === 0 ? 'none' : '1px solid grey') }}>
                            <button class="comment-author" onClick={() => this.authorClicked()}>
                                <div class="inline" style={{ paddingLeft: '1%' }}>
                                    <div class="triangle-up-comment"></div>
                                </div>
                                {this.state.comment['by']}
                                <p class="time">{getHumanReadableTimeElapsed(this.state.comment['time'])}</p>
                            </button>
                            <div>
                                <div style={{ paddingBottom: '1%', paddingLeft: '3%' }}
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
                        <button class="comment-author" onClick={() => this.authorClicked()}>
                            <div class="inline" style={{ paddingLeft: '1%' }}>
                                <div class="triangle-down-comment"></div>
                            </div>
                            {this.state.comment['by']}
                            <p class="time">
                                {getHumanReadableTimeElapsed(this.state.comment['time'])}
                            </p>
                        </button>
                    </div>
                )
            }
        }
        return <div></div>
    }
}

export default Comment;