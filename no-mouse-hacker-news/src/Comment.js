import React, { Component } from 'react';
import './comment.css';

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

    decodeEntities(input) {
        var y = document.createElement('textarea');
        y.innerHTML = input;
        return y.value;
    }

    componentDidUpdate(prevProps) {
        if (this.props.rootKid !== prevProps.rootKid) {
            this.fetchComments(this.props.rootKid);
        }
    }

    render() {

        if (this.state.comment) {
            return (
                <div class="comment">
                    <div>{this.decodeEntities(this.state.comment['text'])}</div>
                </div>
            )
        }
        return <div></div>
    }
}

export default Comment;