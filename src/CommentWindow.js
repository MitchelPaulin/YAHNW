import React, { Component } from 'react';
import Comment from './Comment';
import './styles/comment.css';

class CommentWindow extends Component {

    render() {

        if (this.props.kids) {
            let comments = [];
            for (let kid of this.props.kids) {
                comments.push(<Comment rootKid={kid} nesting={0} shouldHide={false}></Comment>)
            }
            return (
                <div style={{paddingTop: '1%'}} class="comment">
                    {comments}
                </div>
            );
        }

        return (
            <div>Comments</div>
        )
    }

}

export default CommentWindow;