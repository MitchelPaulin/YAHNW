import { Component } from 'react';
import { StoryType } from './storyType';
import './styles/ribbon.css'
import yahnw from './imgs/yahnw.png';

type Props = {
    storyModeChangedCallback: (s: StoryType) => void
}

type State = {
    selectedButton: StoryType
}

class Ribbon extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        const params = new URLSearchParams(window.location.search);
        const param = params.get('storyType') ?? 'Top';
        const selectedStoryType: StoryType = StoryType[param as keyof typeof StoryType];
        this.state = {
            selectedButton: selectedStoryType
        };
    }

    storyButtonClicked(buttonClicked: StoryType) {
        this.props.storyModeChangedCallback(buttonClicked);
        this.setState({ selectedButton: buttonClicked });
    }

    render() {

        const selectedStyling = {
            backgroundColor: 'var(--background-color-highlight)'
        }

        return (
            <div className='ribbon'>
                <img src={yahnw} className='logo' alt='logo'></img>
                <p>YAHNW</p>
                <div className='button-box'>
                    <button className='story-button'
                        style={this.state.selectedButton === StoryType.Top ? selectedStyling : {}}
                        onClick={() => this.storyButtonClicked(StoryType.Top)}>
                        <b>Top</b>
                    </button>
                    <button className='story-button'
                        style={this.state.selectedButton === StoryType.Best ? selectedStyling : {}}
                        onClick={() => this.storyButtonClicked(StoryType.Best)}>
                        <b>Best</b>
                    </button>
                    <button className='story-button'
                        style={this.state.selectedButton === StoryType.New ? selectedStyling : {}}
                        onClick={() => this.storyButtonClicked(StoryType.New)}>
                        <b>New</b>
                    </button>
                </div>
            </div>
        )
    }
}

export default Ribbon;