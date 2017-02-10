import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';


class Ground extends Component {
  render() {
    return (
      <div>
        <Container fluid className="ground">
          <Row className="away-whole">
            <Col sm="3" />
            <Col sm="6" className="away-field">
              <div className="player">{this.props.homeName[0].name}</div>
              <div className="player">{this.props.homeName[1].name}</div>
              <div className="player">{this.props.homeName[2].name}</div>
              <div className="player">{this.props.homeName[3].name}</div>
              <div className="player">{this.props.homeName[4].name}</div>
            </Col>
            <Col sm="3">
              <div className="player">{this.props.homeName[5].name}</div>
              <div className="player">{this.props.homeName[6].name}</div>
              <div className="player">{this.props.homeName[7].name}</div>
              <div className="player">{this.props.homeName[8].name}</div>
              <div className="player">{this.props.homeName[9].name}</div>
            </Col>
          </Row>
          <Row className="home-whole">
            <Col sm="3">
              <div className="player">{this.props.awayName[5].name}</div>
              <div className="player">{this.props.awayName[6].name}</div>
              <div className="player">{this.props.awayName[7].name}</div>
              <div className="player">{this.props.awayName[8].name}</div>
              <div className="player">{this.props.awayName[9].name}</div>
            </Col>
            <Col sm="6" className="home-field">
              <div className="player">{this.props.awayName[0].name}</div>
              <div className="player">{this.props.awayName[1].name}</div>
              <div className="player">{this.props.awayName[2].name}</div>
              <div className="player">{this.props.awayName[3].name}</div>
              <div className="player">{this.props.awayName[4].name}</div>
            </Col>
            <Col sm="3" />
          </Row>
        </Container>
      </div>
    );
  }
}

Ground.propTypes = {
  homeName: React.PropTypes.any,
  awayName: React.PropTypes.any,
};

export default Ground;
