import React from 'react';
import './States.css';


/**
 * Define States, a React component of Project 4, Problem 2. The model
 * data for this view (the state names) is available at
 * window.models.states.
 */
class States extends React.Component {
    constructor(props) {
        super(props);
        console.log('window.models.states', window.models.states);
        this.state = {
            input: '',
            filteredStates: window.models.states(),
        };
    }

    handleInputChange = (event) => {
        const input = event.target.value.toLowerCase();
        let filteredStates;

        if (input === '') {
            // empty input then show all states
            filteredStates = window.models.states();
        } else {
            filteredStates = window.models.states().filter((state) => {
            return state.toLowerCase().includes(input);
        });

        // sort
        filteredStates = filteredStates.sort((a, b) => {
            const indexA = a.toLowerCase().indexOf(input);
            const indexB = b.toLowerCase().indexOf(input);
            return indexA - indexB;
        });
      }

        this.setState({ input, filteredStates });
    };
    render() {
        const { input, filteredStates } = this.state;

        return (
            <div className="state-update">
                <input type="text" value={input} onChange={this.handleInputChange} placeholder="Enter substring..."/>
                <ul>
                    {filteredStates.length > 0 ? (
                        filteredStates.map((state, index) => (<li key={index}>{state}</li>))
                    ) : (
                        <li>No matching states found</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default States;