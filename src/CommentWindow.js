import React, { Component } from 'react';
import Comment from './Comment';
import './styles/comment.css';

class CommentWindow extends Component {

    render() {

        if (this.props.kids) {
            let comments = [];
            for (let kid of this.props.kids) {
                comments.push(<Comment key={kid} rootKid={kid} nesting={0} shouldHide={false}></Comment>)
            }
            return (
                <div className="comment-window">
                    {comments}
                </div>
            );
        }

        return (
            <div>
                <p className="click-comment-message">Click on a speech bubble</p>
            </div>
        )
    }

}

export default CommentWindow;