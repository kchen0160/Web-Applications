import React from 'react';
import {
    List,
    ListItem,
} from '@material-ui/core';
import {HashRouter as Router, Link} from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import './UserPhotos.css';
import fetchModel from '../../lib/fetchModelData.js';
// eslint-disable-next-line import/no-unresolved
import TopBar from '../TopBar/TopBar';


/**
 * Define UserPhotos, a React component of project #5
 */
class UserPhotos extends React.Component {
    constructor(props) {
        super(props);
        this.state = { photos : [], };
    }


    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        let userId = this.props.match.params.userId;
        fetchModel(`/photosOfUser/${userId}`)
            .then((response) => {
                let pics = response.data;
                this.setState({photos: pics});
            })
            .catch((e) => {
                console.log(e);
            });
    }

    // eslint-disable-next-line class-methods-use-this
    photoCommentItems(comment) {
        let userId = comment.user._id;

        return (
            <p>
                <Link to={"/users/" + userId}>
                <span>{comment.user.first_name + " " + comment.user.last_name + ": "}</span>
                </Link>
                <span>{comment.comment}</span>
                <span> (At: {comment.date_time})</span>
            </p>
        );
    }

    photoComments(photo) {
        let comments = photo.comments;

        if (!comments)
            {return (
                <div></div>
            );}

        return (
            <List component="div">
                {comments.map((comment) => (
                    <ListItem divider={false} key={comment._id}>
                    {this.photoCommentItems(comment)}
                    </ListItem>
                  )
                )}
            </List>
        );
    }

    render() {
        const userId = this.props.match.params.userId;

        fetchModel(`/user/${userId}`)
            .then((response) => {
                const user = response.data;
                this.setState({ user });
            })
            .catch((e) => {
                console.log(e);
            });

        fetchModel(`/photosOfUser/${userId}`)
            .then((response) => {
                const photos = response.data;
                this.setState({ photos });
            })
            .catch((e) => {
                console.log(e);
            });

        // eslint-disable-next-line no-unused-vars
        const { user, photos } = this.state;

        return (
            <Router>
                {user && (
                    <TopBar pageTitle={`User Photos for ${user.first_name} ${user.last_name}`} />
                )}
                <div className="photoButton">
                    <Link to={"/users/" + this.props.match.params.userId}>
                        <button type="button">User</button>
                    </Link>
                <List component="div">
                    {this.state.photos.map((photo) => (
                        <ListItem divider={false} key={photo._id}>
                            <div>
                                <img src= {"images/" + photo.file_name}/>
                                <div>
                                    {photo.date_time}
                                    {this.photoComments(photo)}
                                </div>
                            </div>
                        </ListItem>
                      )
                    )}
                </List>
                </div>
            </Router>
        );
    }
}

export default UserPhotos;

// This should be the UserPhotos view of the PhotoShare app. Since
// it is invoked from React Router the params from the route will be
// in property match. So this should show details of user:
// {this.props.match.params.userId}. You can fetch the model for the user from
// window.models.photoOfUserModel(userId):