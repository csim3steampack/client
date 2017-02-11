import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router';

const propTypes = {
  teamData: React.PropTypes.any,
  handleClick: React.PropTypes.func,
};

class Team extends Component {
  render() {
    // const teamFilter = (
    //   if (this.props.location === this.props.teamData.location) {
    //
    //   }
    // );

    return (
      <Container>
        <Row>
          <Col >
            <div className="team-select">
              <Link
                to="/ground_display"
                onClick={() => this.props.handleClick(this.props.teamData.team)}
              >
                {this.props.teamData.team}
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

Team.propTypes = propTypes;

export default Team;
