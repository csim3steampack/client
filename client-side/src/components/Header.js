import React, { Component } from 'react';
import { Link } from 'react-router';
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const propTypes = {
  isLoggedIn: React.PropTypes.bool,
  onLogout: React.PropTypes.func,
};

class Header extends Component {
  render() {
    const logout = (
      <NavLink onClick={this.props.onLogout} tag={Link} to="/login">logout</NavLink>
    );

    return (
      <div>
        <Container fluid>
          <Navbar color="faded" light toggleable>
            <NavbarBrand tag={Link} to="/">STEAMPACK</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/game_register">Game Register</NavLink>
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
