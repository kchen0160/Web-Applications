import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';

import Header from "./components/header/Header";
import Example from './components/example/Example';
import States from './components/states/States';

class P4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentView: 'Example'
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick() {
        if (this.state.currentView === 'Example') {
            this.setState({ currentView: 'States' });
        } else {
            this.setState({ currentView: 'Example' });
        }
    }

    render() {
        const { currentView } = this.state;
        return (
            <div>
                <button onClick={this.handleButtonClick}>
                    Switch to {currentView === 'Example' ? 'States' : 'Example'}
                </button>
                {currentView === 'Example' ? <Example /> : <States />}
            </div>
        );
    }
}

ReactDOM.render(
    <div>
        <Header />
        <P4 />
    </div>,
    document.getElementById('reactapp'),
);