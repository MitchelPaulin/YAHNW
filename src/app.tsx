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
    const params = new URLSearchParams(window.location.search);
    const param = params.get('storyType') ?? 'Top';
    const selectedStoryType: StoryType = StoryType[param as keyof typeof StoryType];
    this.state = {
      storyMode: selectedStoryType
    }
  }

  storyModeChanged = (s: StoryType) => {
    const url = new URL(window.location.href);
    url.searchParams.set('storyType', StoryType[s]);
    window.history.pushState(null, '', url.toString());

    this.setState({ storyMode: s });
  }

  render() {
    return (
      <div className='App'>
        <Ribbon storyModeChangedCallback={this.storyModeChanged}></Ribbon>
        <StoryWindow storyMode={this.state.storyMode}></StoryWindow>
      </div>
    );
  }
}

export default App;
