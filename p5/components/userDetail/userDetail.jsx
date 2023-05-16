import React from 'react';
// eslint-disable-next-line import/no-unresolved
import './UserDetail.css';
import {HashRouter as Router, Link} from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData.js';
// eslint-disable-next-line import/no-unresolved
import TopBar from '../TopBar/TopBar';

/**
 * Define UserDetail, a React component of project #5
 */
class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user : {}, };
    }

    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        let userId = this.props.match.params.userId;
        fetchModel(`/user/${userId}`)
            .then((response) => {
                let user = response.data;
                this.setState({ user : user });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const govtName = this.state.user.first_name + " " + this.state.user.last_name;
        return (
            <Router>
                <TopBar pageTitle={`User Details for ${govtName}`} />
                <div className="userDetail">
                    <Link to={"/photos/" + this.state.user._id}>
                        <button type="button">Photos</button>
                    </Link>

                    <div>
                        <span className="name">{govtName}</span>
                    </div>
                    <br />
                    <div className="location">
                        <span>Location: </span>
                        <span>{this.state.user.location}</span>
                    </div>
                    <br />
                    <div className="job">
                        <span>Occupation: </span>
                        <span>{this.state.user.occupation}</span>
                    </div>
                    <br />
                    <div className="desc">
                        <span>Description: </span>
                        <span>{this.state.user.description}</span>
                    </div>
                </div>

            </Router>
        );
    }
}

export default UserDetail;

// This should be the UserDetail view of the PhotoShare app. Since
// it is invoked from React Router the params from the route will be
// in property match. So this should show details of user:
// {this.props.match.params.userId}. You can fetch the model for the
//     user from window.models.userModel(userId).