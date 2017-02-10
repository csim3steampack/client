import { Form, FormGroup, Label, Input } from 'reactstrap';
import React, { Component } from 'react';
import Team from './Team';


class TeamList extends Component {
  render() {
    const teamDivDisplay = ((teamData) => {
      return teamData.map((team, i) => {
        return (<Team teamView={team} key={i} />);
      });
    });

    const searchForm = (
      <div className="home-search-div">
        <div className="search-div">
          <label>Where</label>
          <input
            className="place-input"
            type="text"
            name="search"
            placeholder="City, Playground"
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
        {teamDivDisplay(this.props.teamName)}
      </div>
    );
  }
}

TeamList.propTypes = {
  teamName: React.PropTypes.any,
};

TeamList.defaultProps = {
  teamName: ['minho team', 'team A', 'team B', 'team C', 'team D'],
};

export default TeamList;
