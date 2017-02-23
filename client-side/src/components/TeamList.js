import { Label, Input, Container, Row, Col } from 'reactstrap';
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
      search: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleSearch() {
    console.log("hi");
  }

  render() {
    const searchForm = (
      <Container>
        <Row>
          <Col md="1" />
          <Col md="10" className="home-search-div">
            <Row>
              <Col md="5" className="search-div">
                <Label className="search-label">경기장소 선택</Label>
                <Input
                  className="place-input"
                  type="text"
                  name="search"
                  placeholder="경기장소(ex. 영등포구)"
                  onChange={this.handleChange}
                />
              </Col>
              <Col md="5">
                <Label className="search-label">경기날짜 선택</Label>
                <Input
                  type="date"
                  name="date"
                  className="place-input"
                />
              </Col>
              <Col md="2">
                <button className="teamlist-button" onClick={this.handleSearch}>검색</button>
              </Col>
            </Row>
          </Col>
          <Col md="1" />
        </Row>
      </Container>
    );

    return (
      <div>
        {searchForm}
        <Team
          handleClick={this.props.handleClick}
          teamData={this.props.teamData}
          onSearch={this.state.search}
        />
      </div>
    );
  }
}

TeamList.propTypes = propTypes;
TeamList.defaultProps = defaultProps;

export default TeamList;
