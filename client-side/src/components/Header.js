import React, { Component } from 'react';
import { Link } from 'react-router';
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const propTypes = {
  isLoggedIn: React.PropTypes.bool,
  onLogout: React.PropTypes.func,
  isSucceed: React.PropTypes.bool,
};


class Header extends Component {
  render() {
    const logout = (
      <NavLink onClick={this.props.onLogout} tag={Link} to="/login">logout</NavLink>
    );

    const gameRegisterLink = <NavLink tag={Link} to="/game_register">Game Register</NavLink>;
    const gameRegisterEditLink = <NavLink tag={Link} to="/game_register/edit">Game Eidt</NavLink>;

    return (
      <div>
        <Container fluid>
          <Navbar color="faded" light toggleable>
            <NavbarBrand tag={Link} to="/">STEAMPACK</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {this.props.isSucceed ? gameRegisterEditLink : gameRegisterLink}
              </NavItem>
              <NavItem>
                {this.props.isLoggedIn ? logout : undefined}
              </NavItem>
            </Nav>
          </Navbar>
        </Container>
      </div>
    );
  }
}

Header.propTypes = propTypes;

export default Header;
