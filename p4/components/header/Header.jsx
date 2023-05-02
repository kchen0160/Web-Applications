import React from 'react';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "header-update">
          <h1>Sup, my project is coolio!</h1>
          <h2>yupperoni</h2>
          <p>by: kev</p>
      </div>
    );
  }
}

export default Header;