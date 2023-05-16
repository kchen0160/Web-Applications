import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core';
import './TopBar.css';
import fetchModel from '../../lib/fetchModelData.js';

/**
 * Define TopBar, a React component of project #5
 */
class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { version: '' };
    }

    componentDidMount() {
        fetchModel('/test/info')
            .then((response) => {
                let version = response.data.__v;
                this.setState({ version: version });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const pageTitle = this.props.pageTitle;

        return (
            <AppBar className="topbar-appBar" position="absolute">
                <Toolbar className="topbar-toolbar">
                    <Typography variant="h5" color="inherit">
                        Kevin Chen
                    </Typography>
                    <Typography variant="h5" color="inherit" className="topbar-detail">
                        {pageTitle}
                    </Typography>
                    <Typography variant="h5" color="inherit" className="topbar-version">
                        (version {this.state.version})
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default TopBar;