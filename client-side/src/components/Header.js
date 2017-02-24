import React, { Component } from 'react';
import { Link } from 'react-router';
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const propTypes = {
  onLogout: React.PropTypes.func,
  isSucceed: React.PropTypes.bool,
};

const defaultProps = {
  onLogout: () => console.log('onLogout is not a defined'),
  isSucceed: false,
};


class Header extends Component {
  render() {
    return (
      <div>
        <Container fluid>
          <Navbar light toggleable className="header-div">
            <NavbarBrand tag={Link} to="/">STEAMPACK</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/profile">프로필</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/game_register">{this.props.isSucceed ? '경기관리' : '경기등록'}</NavLink>
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
Header.defaultProps = defaultProps;

export default Header;
