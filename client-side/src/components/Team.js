import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router';

class Team extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col >
            <div className="team-select">
              <Link to="/ground_display">{this.props.teamView}</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

Team.propTypes = {
  teamView: React.PropTypes.string,
};

export default Team;
