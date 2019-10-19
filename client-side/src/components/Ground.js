import React, { Component } from 'react';
import { Container, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';

const propTypes = {
  allDisplayTeam: React.PropTypes.object,
};

const defaultProps = {
  allDisplayTeam: {},
};

class Ground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      member: '',
    };
    this.toggle = this.toggle.bind(this);
    this.onMemberModal = this.onMemberModal.bind(this);
  }

  onMemberModal(member) {
    this.setState({
      modal: !this.state.modal,
      member,
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
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
    const homeDF1 = homeUsers.find(homeUser => homeUser.position === 'DF');
    const homeDF2 = homeUsers.find(homeUser => (homeUser.position === 'DF') && (homeDF1.username !== homeUser.username));
    const homeSubs = homeUsers.filter((homeUser) => {
      return ![
        homeGK,
        homeFW,
        homeMF,
        homeDF1,
        homeDF2,
      ].includes(homeUser);
    });
    const homeSubMembers = (
      members => members.map(member =>
        <div className="player-sub" key={member.id}>
          <div
            className="homesub-player"
            style={{ backgroundImage: `url(${member.userImgUrl})` }}
            onClick={() => this.onMemberModal(homeFW ? member.username : false)}
          />
          <div className="sub-player-section">{homeFW ? member.username : false}</div>
        </div>,
      )
    );


    /* AWAY TEAM SECTION */
    const awayGK = awayUsers.find(awayUser => awayUser.position === 'GK');
    const awayFW = awayUsers.find(awayUser => awayUser.position === 'FW');
    const awayMF = awayUsers.find(awayUser => awayUser.position === 'MF');
    const awayDF1 = awayUsers.find(awayUser => awayUser.position === 'DF');
    const awayDF2 = awayUsers.find(awayUser => (awayUser.position === 'DF') && (awayDF1.username !== awayUser.username));
    const awaySubs = awayUsers.filter((awayUser) => {
      return ![
        awayGK,
        awayFW,
        awayMF,
        awayDF1,
        awayDF2,
      ].includes(awayUser);
    });
    const awaySubMembers = (
      members => members.map(member =>
        <div className="player-sub" key={member.id}>
          <div
            className="awaysub-player"
            style={{ backgroundImage: `url(${member.userImgUrl})` }}
            onClick={() => this.onMemberModal(awayFW ? member.username : false)}
          />
          <div className="sub-player-section">{awayFW ? member.username : false}</div>
        </div>,
      )
    );

    const totalMembers = [
      homeGK, homeFW, homeDF1, homeDF2, homeMF, ...homeSubs, awayGK, awayFW, awayDF1, awayDF2, awayMF, ...awaySubs,
    ];

  /* AWAY TEAM DETAILED INFO */
    const awayTeamName = awayFW ? awayFW.team : false;
    const awayGKImage = awayGK ? awayGK.userImgUrl : '';
    const awayGKUsername = awayGK ? awayGK.username : false;
    const awayDF1Imgge = awayDF1 ? awayDF1.userImgUrl : '';
    const awayDF1Username = awayDF1 ? awayDF1.username : false;
    const awayDF2Imgge = awayDF2 ? awayDF2.userImgUrl : '';
    const awayDF2Username = awayDF2 ? awayDF2.username : false;
    const awayMFImage = awayMF ? awayMF.userImgUrl : '';
    const awayMFUsername = awayMF ? awayMF.username : false;
    const awayFWImage = awayFW ? awayFW.userImgUrl : '';
    const awayFWUsername = awayFW ? awayFW.username : false;


    /* HOME TEAM DETAILED INFO */
    const homeTeamName = homeFW ? homeFW.team : false;
    const homeGKImage = homeGK ? homeGK.userImgUrl : '';
    const homeGKUsername = homeGK ? homeGK.username : false;
    const homeDF1Imgge = homeDF1 ? homeDF1.userImgUrl : '';
    const homeDF1Username = homeDF1 ? homeDF1.username : false;
    const homeDF2Imgge = homeDF2 ? homeDF2.userImgUrl : '';
    const homeDF2Username = homeDF2 ? homeDF2.username : false;
    const homeMFImage = homeMF ? homeMF.userImgUrl : '';
    const homeMFUsername = homeMF ? homeMF.username : false;
    const homeFWImage = homeFW ? homeFW.userImgUrl : '';
    const homeFWUsername = homeFW ? homeFW.username : false;

    /* MODAL SECTION */
    const playerModal = (
      (member) => {
        const modalFilter = totalMembers.find(
          modalUser => modalUser ? modalUser.username === member : false
        );
        if (member) {
          return (
            <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-body">
              <ModalHeader toggle={this.toggle} className="modal-head">
                선수 상세정보
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col md="6">
                    <div
                      style={{ backgroundImage: `url(${modalFilter.userImgUrl})` }}
                      className="modal-image"
                    />
                  </Col>
                  <Col md="6">
                    <div className="modal-title">선수 이름</div>
                    <div className="modal-info">{modalFilter.username}</div>

                    <div className="modal-title">키</div>
                    <div className="modal-info">{modalFilter.height}cm</div>

                    <div className="modal-title">포지션</div>
                    <div className="modal-info">
                      {modalFilter.position === 'FW' ? '공격수' : false}
                      {modalFilter.position === 'MF' ? '미드필더' : false}
                      {modalFilter.position === 'DF' ? '수비수' : false}
                      {modalFilter.position === 'GK' ? '골키퍼' : false}
                    </div>

                    <div className="modal-title">주 사용발</div>
                    <div className="modal-info">
                      {modalFilter.foot === 'right' ? '오른발' : false}
                      {modalFilter.foot === 'left' ? '왼발' : false}
                      {modalFilter.foot === 'both' ? '양발 사용' : false}
                    </div>
                  </Col>
                </Row>
              </ModalBody>
            </Modal>
          );
        }
      }

    );


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
                      onClick={() => this.onMemberModal(awayGKUsername)}
                    />
                    <div className="player-section">{awayGKUsername}</div>
                  </div>

                  <div className="player2">
                    <div
                      className="away-player"
                      style={{ backgroundImage: `url(${awayDF1Imgge})` }}
                      onClick={() => this.onMemberModal(awayDF1Username)}
                    />
                    <div className="player-section">
                      {awayDF1Username}
                    </div>
                  </div>

                  <div className="player3">
                    <div
                      className="away-player"
                      style={{ backgroundImage: `url(${awayDF2Imgge})` }}
                      onClick={() => this.onMemberModal(awayDF2Username)}
                    />
                    <div className="player-section">
                      {awayDF2Username}
                    </div>
                  </div>

                  <div className="player4">
                    <div
                      className="away-player"
                      style={{ backgroundImage: `url(${awayMFImage})` }}
                      onClick={() => this.onMemberModal(awayMFUsername)}
                    />
                    <div className="player-section">{awayMFUsername}</div>
                  </div>

                  <div className="player5">
                    <div
                      className="away-player"
                      style={{ backgroundImage: `url(${awayFWImage})` }}
                      onClick={() => this.onMemberModal(awayFWUsername)}
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
                      onClick={() => this.onMemberModal(homeGKUsername)}
                    />
                    <div className="player-section">{homeGKUsername}</div>
                  </div>

                  <div className="player2">
                    <div
                      className="home-player"
                      style={{ backgroundImage: `url(${homeDF1Imgge})` }}
                      onClick={() => this.onMemberModal(homeDF1Username)}
                    />
                    <div className="player-section">
                      {homeDF1Username}
                    </div>
                  </div>

                  <div className="player3">
                    <div
                      className="home-player"
                      style={{ backgroundImage: `url(${homeDF2Imgge})` }}
                      onClick={() => this.onMemberModal(homeDF2Username)}
                    />
                    <div className="player-section">
                      {homeDF2Username}
                    </div>
                  </div>

                  <div className="player4">
                    <div
                      className="home-player"
                      style={{ backgroundImage: `url(${homeMFImage})` }}
                      onClick={() => this.onMemberModal(homeMFUsername)}
                    />
                    <div className="player-section">{homeMFUsername}</div>
                  </div>

                  <div className="player5">
                    <div
                      className="home-player"
                      style={{ backgroundImage: `url(${homeFWImage})` }}
                      onClick={() => this.onMemberModal(homeFWUsername)}
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
        {playerModal(this.state.member)}
      </div>
    );
  }
}

Ground.propTypes = propTypes;
Ground.defaultProps = defaultProps;

export default Ground;
