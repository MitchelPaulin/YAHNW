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
        this.state = {
            selectedButton: 'Top'
        };
    }

    storyButtonClicked(buttonClicked: StoryType) {
        this.props.storyModeChangedCallback(buttonClicked);
        this.setState({ selectedButton: buttonClicked });
    }

    render() {

        const styling = {
            backgroundColor: '#272727'
        }

        return (
            <div className='ribbon'>
                <img src={yahnw} className='logo' alt='logo'></img>
                <p>YAHNW</p>
                <div className='button-box'>
                    <button className='story-button'
                        style={this.state.selectedButton === 'Top' ? styling : {}}
                        onClick={() => this.storyButtonClicked('Top')}>
                        <b>Top</b>
                    </button>
                    <button className='story-button'
                        style={this.state.selectedButton === 'Best' ? styling : {}}
                        onClick={() => this.storyButtonClicked('Best')}>
                        <b>Best</b>
                    </button>
                    <button className='story-button'
                        style={this.state.selectedButton === 'New' ? styling : {}}
                        onClick={() => this.storyButtonClicked('New')}>
                        <b>New</b>
                    </button>
                </div>
            </div>
        )
    }
}

export default Ribbon;