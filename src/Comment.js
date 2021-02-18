import React, { Component } from 'react';
import './styles/comment.css';
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

            //Create the child comments of this comment
            let childrenComments = []
            if(this.state.comment['kids']){
                for(let kid of this.state.comment['kids']){
                    childrenComments.push(<Comment rootKid={kid} nesting={this.props.nesting + 1}></Comment>);
                }
            }

            return (
                <div style={{ paddingLeft: this.props.nesting * 15 }}>
                    <p style={{ color: 'orange' }}>{this.state.comment['by']}</p>
                    <div style={{ borderLeft: "1px solid grey" }}>
                        <div style={{ paddingBottom: '1%', paddingLeft: '1%' }}
                            dangerouslySetInnerHTML={{
                                __html: purified
                        }}></div>
                    </div>
                    {childrenComments}
                </div>
            )
        }
        return <div></div>
    }
}

export default Comment;