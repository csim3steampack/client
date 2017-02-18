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
    const gameRegisterLink = <NavLink tag={Link} to="/game_register">경기등록</NavLink>;
    const gameRegisterEditLink = <NavLink tag={Link} to="/game_register/edit">경기수정</NavLink>;

    return (
      <div>
        <Container fluid>
          <Navbar color="faded" light toggleable>
            <NavbarBrand tag={Link} to="/">STEAMPACK</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/profile">프로필</NavLink>
              </NavItem>
              <NavItem>
                {this.props.isSucceed ? gameRegisterEditLink : gameRegisterLink}
              </NavItem>
              <NavItem>
                <NavLink onClick={this.props.onLogout} tag={Link} to="/login">로그아웃</NavLink>
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
