import React, { Component } from 'react';
import { Container, Row, Col, Popover, PopoverTitle, PopoverContent } from 'reactstrap';

const propTypes = {
  allDisplayTeam: React.PropTypes.object,
};

const defaultProps = {
  allDisplayTeam: {},
};

class Ground extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  render() {
    const homeUsers = this.props.allDisplayTeam.homeUsers;
    const awayUsers = this.props.allDisplayTeam.awayUsers;
    console.log(homeUsers, awayUsers);
    if (!homeUsers) {
      return <div />;
    }

    if (!awayUsers) {
      return <div />;
    }

    /* HOME TEAM SECTION */
    const homeGK = homeUsers.find(homeUser => homeUser.position === 'GK');
    const homeFW = homeUsers.find(homeUser => homeUser.position === 'FW');
    const homeMF = homeUsers.find(homeUser => homeUser.position === 'MF');
    const homeDFs = homeUsers.reduce((result, homeUser) => {
      if (homeUser.position === 'DF' && result.length < 2) {
        result.push(homeUser);
      }
      return result;
    }, []);
    const homeSubs = homeUsers.filter((homeUser) => {
      return ![
        homeGK,
        homeFW,
        homeMF,
        ...homeDFs,
      ].includes(homeUser);
    });
    const homeSubMembers = (
      members => members.map(member =>
        <div className="player-sub">
          <div
            className="homesub-player"
            style={{ backgroundImage: `url(${member.userImgUrl})` }}
          />
          <div className="sub-player-section">{homeFW ? member.username : false}</div>
        </div>,
      )
    );


    /* AWAY TEAM SECTION */
    const awayGK = awayUsers.find(awayUser => awayUser.position === 'GK');
    const awayFW = awayUsers.find(awayUser => awayUser.position === 'FW');
    const awayMF = awayUsers.find(awayUser => awayUser.position === 'MF');
    const awayDFs = awayUsers.reduce((result, awayUser) => {
      if (awayUser.position === 'DF' && result.length < 2) {
        result.push(awayUser);
      }
      return result;
    }, []);
    const awaySubs = awayUsers.filter((awayUser) => {
      return ![
        awayGK,
        awayFW,
        awayMF,
        ...awayDFs,
      ].includes(awayUser);
    });
    const awaySubMembers = (
      members => members.map(member =>
        <div className="player-sub">
          <div
            className="awaysub-player"
            style={{ backgroundImage: `url(${member.userImgUrl})` }}
          />
          <div className="sub-player-section">{awayFW ? member.username : false}</div>
        </div>,
      )
    );


/* AWAY TEAM POPOVER SECTION */
  const awayPlayer1 = (
    <Popover
      placement="bottom"
      isOpen={this.state.popoverOpen}
      target="homeGK"
      toggle={this.toggle}
    >
      <PopoverTitle>Hometeam GK</PopoverTitle>
      <PopoverContent>Hello</PopoverContent>
    </Popover>
  );


  /* AWAY TEAM DETAILED INFO */
    const awayTeamName = awayGK ? awayGK.team : false;
    const awayGKImage = awayGK ? awayGK.userImgUrl : '';
    const awayGKUsername = awayGK ? awayGK.username : false;
    const awayDFs0Imgge = awayDFs[0] ? awayDFs[0].userImgUrl : '';
    const awayDFs0Username = awayDFs && awayDFs[0] ? awayDFs[0].username : false;
    const awayDFs1Imgge = awayDFs[1] ? awayDFs[1].userImgUrl : '';
    const awayDFs1Username = awayDFs && awayDFs[1] ? awayDFs[1].username : false;
    const awayMFImage = awayMF ? awayMF.userImgUrl : '';
    const awayMFUsername = awayMF ? awayMF.username : false;
    const awayFWImage = awayFW ? awayFW.userImgUrl : '';
    const awayFWUsername = awayFW ? awayFW.username : false;


    /* HOME TEAM DETAILED INFO */
    const homeTeamName = homeGK ? homeGK.team : false;
    const homeGKImage = homeGK ? homeGK.userImgUrl : '';
    const homeGKUsername = homeGK ? homeGK.username : false;
    const homeDFs0Imgge = homeDFs[0] ? homeDFs[0].userImgUrl : '';
    const homeDFs0Username = homeDFs && homeDFs[0] ? homeDFs[0].username : false;
    const homeDFs1Imgge = homeDFs[1] ? homeDFs[1].userImgUrl : '';
    const homeDFs1Username = homeDFs && homeDFs[1] ? homeDFs[1].username : false;
    const homeMFImage = homeMF ? homeMF.userImgUrl : '';
    const homeMFUsername = homeMF ? homeMF.username : false;
    const homeFWImage = homeFW ? homeFW.userImgUrl : '';
    const homeFWUsername = homeFW ? homeFW.username : false;


    return (
      <div>
        <Container fluid className="ground">
          <Row>
            <Col sm="6" className="away-field">
              <h5 className="ground-title">{awayTeamName} (원정팀)</h5>
              <Row>
                <Col sm="1" />
                <Col sm="7" className="ground-field">
                  <div className="player1">
                    <div
                      className="goalkeepr"
                      style={{ backgroundImage: `url(${awayGKImage})` }}
                      id="homeGK" onClick={this.toggle}
                    />
                    <div className="player-section">{awayGKUsername}</div>
                  </div>

                  <div className="player2">
                    <div
                      className="away-player"
                      style={{ backgroundImage: `url(${awayDFs0Imgge})` }}
                    />
                    <div className="player-section">
                      {awayDFs0Username}
                    </div>
                  </div>

                  <div className="player3">
                    <div
                      className="away-player"
                      style={{ backgroundImage: `url(${awayDFs1Imgge})` }}
                    />
                    <div className="player-section">
                      {awayDFs1Username}
                    </div>
                  </div>

                  <div className="player4">
                    <div
                      className="away-player"
                      style={{ backgroundImage: `url(${awayMFImage})` }}
                    />
                    <div className="player-section">{awayMFUsername}</div>
                  </div>

                  <div className="player5">
                    <div
                      className="away-player"
                      style={{ backgroundImage: `url(${awayFWImage})` }}
                    />
                    <div className="player-section">{awayFWUsername}</div>
                  </div>
                </Col>
                <Col sm="4" className="submember-div">
                  {awaySubMembers(awaySubs)}
                </Col>
              </Row>
            </Col>

            <Col sm="6">
              <h5 className="ground-title">{homeTeamName} (홈팀)</h5>
              <Row>
                <Col sm="1" />
                <Col sm="7" className="ground-field">
                  <div className="player1">
                    <div
                      className="goalkeepr"
                      style={{ backgroundImage: `url(${homeGKImage})` }}
                    />
                    <div className="player-section">{homeGKUsername}</div>
                  </div>

                  <div className="player2">
                    <div
                      className="home-player"
                      style={{ backgroundImage: `url(${homeDFs0Imgge})` }}
                    />
                    <div className="player-section">
                      {homeDFs0Username}
                    </div>
                  </div>

                  <div className="player3">
                    <div
                      className="home-player"
                      style={{ backgroundImage: `url(${homeDFs1Imgge})` }}
                    />
                    <div className="player-section">
                      {homeDFs1Username}
                    </div>
                  </div>

                  <div className="player4">
                    <div
                      className="home-player"
                      style={{ backgroundImage: `url(${homeMFImage})` }}
                    />
                    <div className="player-section">{homeMFUsername}</div>
                  </div>

                  <div className="player5">
                    <div
                      className="home-player"
                      style={{ backgroundImage: `url(${homeFWImage})` }}
                    />
                    <div className="player-section">{homeFWUsername}</div>
                  </div>
                </Col>
                <Col sm="4" className="submember-div">
                  {homeSubMembers(homeSubs)}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        {awayPlayer1}
      </div>
    );
  }
}

Ground.propTypes = propTypes;
Ground.defaultProps = defaultProps;

export default Ground;
