import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

const propTypes = {
  allDisplayTeam: React.PropTypes.object,
};

const defaultProps = {
  allDisplayTeam: {},
};

class Ground extends Component {
  render() {
    const {
      homeUsers,
      awayUsers,
    } = this.props.allDisplayTeam;
    const homeName = homeUsers ? homeUsers.map(homeUser => homeUser.username) : [];
    const awayName = awayUsers ? awayUsers.map(awayUser => awayUser.name) : [];
    return (
      <div>
        <Container fluid className="ground">
          <Row className="away-whole">
            <Col sm="3" />
            <Col sm="6" className="away-field">
              {awayName}
            </Col>
            <Col sm="3" />
          </Row>
          <Row className="home-whole">
            <Col sm="3" />
            <Col sm="6" className="home-field">
              {homeName}
            </Col>
            <Col sm="3" />
          </Row>
        </Container>
      </div>
    );
  }
}

Ground.propTypes = propTypes;
Ground.defaultProps = defaultProps;

export default Ground;
