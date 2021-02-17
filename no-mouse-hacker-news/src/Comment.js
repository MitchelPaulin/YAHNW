import React, { Component } from 'react';
import './comment.css';
import DOMPurify from 'dompurify';

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            kids: null,
            comment: null
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
            this.fetchComments(this.props.rootKid);
        }
    }

    render() {

        if (this.state.comment && !this.state.comment['deleted']) {

            //Comments are given in HTML, important that we sanitize the content before displaying it 
            let purified = DOMPurify.sanitize(this.state.comment['text']);

            return (
                <div class="comment">
                    <p style={{ color: 'orange' }}>{this.state.comment['by']}</p>
                    <div style={{ paddingBottom: '1%' }}
                        dangerouslySetInnerHTML={{
                            __html: purified
                        }}></div>
                </div>
            )
        }
        return <div></div>
    }
}

export default Comment;