import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router';

const propTypes = {
  teamData: React.PropTypes.array,
  handleClick: React.PropTypes.func,
  onSearch: React.PropTypes.any,
  onDate: React.PropTypes.any,
};

const defaultProps = {
  teamData: [],
  handleClick: () => console.log('handleClick function is not a defined'),
  onSearch: undefined,
  onDate: undefined,
};

class Team extends Component {
  render() {

    const teamDisplay = (
      teamData => teamData.map((team) => {
        const style = {
          backgroundImage: `url(${team.teamImgUrl})`,
          backgroundSize: 'cover',
          overflow: 'hidden',
        };

        const color = {
          color: 'darkgrey',
        };

        if (
          (!this.props.onSearch && !this.props.onDate) ||
            team.place.indexOf(this.props.onSearch) !== -1 ||
            team.playdate === this.props.onDate
          ) {
          return (
            <Col md="3" key={team.id} >
              <Link
                to="/ground_display"
                style={color}
                className="teamview-link"
                onClick={() => this.props.handleClick(team.team)}
              >
                <div className="team-display" style={style} />
              </Link>
              <div className="team-name">{team.team}</div>
            </Col>
          );
        }
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
