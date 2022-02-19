import { Component } from 'react';
import { StoryType } from './storyType';
import StoryWindow from './storyWindow';
import Ribbon from './ribbon';
import './styles/app.css';

type Props = {};
type State = {
  storyMode: StoryType
}

class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      storyMode: 'Top'
    }
  }

  storyModeChanged = (s: StoryType) => {
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
