import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter, Route, Link
} from 'react-router-dom';
import './styles/main.css';

import Example from './components/example/Example';
import Header from './components/header/Header';
import States from './components/states/States';

class P5 extends React.Component {
    constructor(props) {
    super(props);
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <nav>
                        <ul>
                            <li><Link to="/example">Example</Link></li>
                            <li><Link to="/states">States</Link></li>
                        </ul>
                    </nav>
                    <Route path="/example" component={Example} />
                    <Route path="/states" component={States} />
                </div>
            </HashRouter>
        );
    }
}

ReactDOM.render(
    <div>
        <Header />
        <P5 />
    </div>,
    document.getElementById('reactapp'),
);
