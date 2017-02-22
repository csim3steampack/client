import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router';

const propTypes = {
  teamData: React.PropTypes.array,
  handleClick: React.PropTypes.func,
};

const defaultProps = {
  teamData: [],
  handleClick: () => console.log('handleClick function is not a defined'),
};

class Team extends Component {
  render() {
    const teamDisplay = (
      teamData => teamData.map(
        function teamdisplay(team) {
          const style = {
            backgroundImage: `url(${team.teamImgUrl})`,
            backgroundSize: 'cover',
            overflow: 'hidden',
          };

          const color = {
            color: 'darkgrey',
          };

          return (
            <Col md="3" key={team.id} >
              <div className="team-display" style={style}>
                <Link
                  to="/ground_display"
                  style={color}
                  className="teamview-link"
                  onClick={() => this.props.handleClick(team.team)}
                >
                  {team.team}
                </Link>
              </div>
            </Col>
          );
        },
  ));

    return (
      <Container>
        <Row>
          {teamDisplay(this.props.teamData)}
        </Row>
      </Container>
    );
  }
}

Team.propTypes = propTypes;
Team.defaultProps = defaultProps;

export default Team;
