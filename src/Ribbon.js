import React, { Component } from 'react';
import './styles/ribbon.css'

class Ribbon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedButton: 'Top'
        }
    }

    storyButtonClicked(buttonClicked) {
        this.props.storyModeChangedCallback(buttonClicked);
        this.setState({ selectedButton: buttonClicked });
    }

    render() {
        return (
            <div className="ribbon">
                <a href="https://github.com/MitchelPaulin/YAHNW" className="site-title">
                    YAHNW
                </a>
                <div className="button-box">
                    <button className="story-button" onClick={() => this.storyButtonClicked('Top')}>
                        {this.state.selectedButton === 'Top' ? <b>Top</b> : <p>Top</p>}
                    </button>
                    <button className="story-button" onClick={() => this.storyButtonClicked('Best')}>
                        {this.state.selectedButton === 'Best' ? <b>Best</b> : <p>Best</p>}
                    </button>
                    <button className="story-button" onClick={() => this.storyButtonClicked('New')}>
                        {this.state.selectedButton === 'New' ? <b>New</b> : <p>New</p>}
                    </button>
                </div>
            </div>
        )
    }
}

export default Ribbon;