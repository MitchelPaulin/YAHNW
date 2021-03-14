import React, { Component } from 'react';
import './styles/ribbon.css'

class Ribbon extends Component {

    render() {
        return (
            <div className="ribbon">
                <a href="https://github.com/MitchelPaulin/YAHNW" className="site-title">
                    YAHNW
                </a>
                <div className="button-box">
                    <button class="story-button">
                        Best
                    </button>
                    <button class="story-button">
                        Top
                    </button>
                    <button class="story-button">
                        New
                    </button>
                </div>
            </div>
        )
    }
}

export default Ribbon;