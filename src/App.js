import './styles/App.css';
import StoryWindow from './StoryWindow';

function App() {
  return (
    <div className="App">
      <div class="Ribbon">
        <p>Welcome to ./HackerNews.sh</p>
      </div>
      <StoryWindow selectedStory={null} />
    </div>
  );
}

export default App;