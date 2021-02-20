import './styles/App.css';
import StoryWindow from './StoryWindow';

function App() {
  return (
    <div className="App">
      <div class="Ribbon">
        <a href="www.youtube.com" style={{ color: 'white', textDecoration: 'none' }}>
          <p>YAHNW</p>
        </a>
      </div>
      <StoryWindow selectedStory={null} />
    </div>
  );
}

export default App;
