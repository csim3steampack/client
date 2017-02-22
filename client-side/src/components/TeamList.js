import { Form, FormGroup, Label, Input } from 'reactstrap';
import React, { Component } from 'react';
import Team from './Team';

const propTypes = {
  teamData: React.PropTypes.array,
  handleClick: React.PropTypes.func,
};

const defaultProps = {
  teamData: [],
  handleClick: () => console.log('handleClick function is not a defined'),
};


class TeamList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    const teamDivDisplay = (teamData => teamData.map(team => (
      <Team
        teamData={team}
        key={team.id}
        handleClick={this.props.handleClick}
        location={this.state.location}
      />
  )));

    const searchForm = (
      <div className="home-search-div">
        <div className="search-div">
          <Label>Where</Label>
          <input
            className="place-input"
            type="text"
            name="search"
            placeholder="City, Playground"
            onChange={this.handleChange}
          />
        </div>
        <Form className="calendar-div">
          <FormGroup>
            <Label for="exampleDate">Date</Label>
            <Input
              type="date"
              name="date"
            />
          </FormGroup>
        </Form>
        <button className="button-div">Search</button>
      </div>
    );

    return (
      <div>
        {searchForm}
        {teamDivDisplay(this.props.teamData)}
      </div>
    );
  }
}

TeamList.propTypes = propTypes;
TeamList.defaultProps = defaultProps;

export default TeamList;
