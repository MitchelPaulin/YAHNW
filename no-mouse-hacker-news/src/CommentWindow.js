import React, { Component } from 'react';
import Comment from './Comment';

class CommentWindow extends Component {

    render(){

        if(this.props.kids){
            let comments = [];
            for(let kid of this.props.kids){
                comments.push(<Comment rootKid={kid}></Comment>)
            }
            return(
                <div>
                    {comments}
                </div>
            );
        }

        return(
            <div>Comments</div>
        )
    }

}

export default CommentWindow;