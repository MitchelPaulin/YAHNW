import './styles/App.css';
import StoryWindow from './StoryWindow';
import Ribbon from './Ribbon';

function App() {
  return (
    <div className="App">
      <Ribbon></Ribbon>
      <StoryWindow selectedStory={null} />
    </div>
  );
}

export default App;
