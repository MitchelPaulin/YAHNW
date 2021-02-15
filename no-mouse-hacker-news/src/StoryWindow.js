import React, { Component } from 'react';
import Story from './Story';
import './storyWindow.css'

class StoryWindow extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then((resp) => resp.json())
        .then(function(response) {
            this.setState({data: response});
        }.bind(this));
    }

    render() {
        if (this.state.data) {
            let stories = [];
            for (let s of this.state.data){
                stories.push(<Story id={s}></Story>)
            }
            return(
            <div class="wrap">
                <div class="StoryWindow box-right">{stories}</div>
                <div class="box-left"><p>Comments</p></div>
            </div>
            );
        }
      
        return <div>Loading...</div>;;
    }
}

export default StoryWindow;