import React, { Component } from 'react';

class CommentWindow extends Component {

    render(){

        console.log(this.props.kids);

        if(this.props.kids){
            let comments = [];
            for(let kid of this.props.kids){
                comments.push(<p>{kid}</p>)
            }
            return(
                <div>
                    {comments}
                </div>
            );
        }

        return(
            <p>suh</p>
        )
    }

}

export default CommentWindow;