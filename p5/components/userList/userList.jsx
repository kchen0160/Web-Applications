import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
}
from '@mui/material';
import './userList.css';
import {HashRouter as Router, Link} from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData.js';

/**
 * Define UserList, a React component of project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users : [], };
  }

  componentDidMount() {
    fetchModel('/user/list')
        .then((response) => {
          let users = response.data;
          this.setState({ users : users });
        })
        .catch((e) => {
          console.log(e);
        });
  }

  // eslint-disable-next-line class-methods-use-this
  userName(user) {
    return user.first_name + " " + user.last_name;
  }

  listUser() {
    return (
        this.state.users.map((user) => (
            <ListItem divider={true} key={user._id}>
              <Link to={"/users/" + user._id}>
                <ListItemText primary={this.userName(user)} />
              </Link>
            </ListItem>
          )
        )
    );
  }

  render() {
    return (
        <Router>
          <List component="nav">
            {this.listUser()}
          </List>
        </Router>
    );
  }
}
export default UserList;