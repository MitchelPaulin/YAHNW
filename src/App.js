import React, { Component } from 'react';
import StoryWindow from './StoryWindow';
import Ribbon from './Ribbon';
import './styles/app.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      storyMode: 'Top'
    }
  }

  storyModeChanged = (s) => {
    this.setState({ storyMode: s });
  }

  render() {
    return (
      <div className="App">
        <Ribbon storyModeChangedCallback={this.storyModeChanged}></Ribbon>
        <StoryWindow storyMode={this.state.storyMode}></StoryWindow>
      </div>
    );
  }
}

export default App;
