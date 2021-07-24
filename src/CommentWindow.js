import React, { Component } from 'react';
import Comment from './Comment';
import DOMPurify from 'dompurify';
import './styles/comment.css';
import bubble from './imgs/bubble.png';

class CommentWindow extends Component {

    render() {

        if (this.props.kids) {
            let comments = [];
            for (let kid of this.props.kids) {
                comments.push(<Comment key={kid} rootKid={kid} nesting={0} shouldHide={false}></Comment>)
            }
            if (this.props.displayText === undefined) {
                return (
                    <div className="comment-window">
                        {comments}
                    </div>
                );
            } else {
                let purified = DOMPurify.sanitize(this.props.displayText);

                return (
                    <div>
                        <div className="comment-text-box"
                            dangerouslySetInnerHTML={{
                                __html: purified
                            }} />
                        <div className="comment-window">
                            {comments}
                        </div>
                    </div>
                );
            }

        }

        return (
            <div>
                <p className="click-comment-message">Click on a</p>
                <img src={bubble} alt="speech bubble" style={{ width: '3%' }} />
            </div>
        )
    }

}

export default CommentWindow;