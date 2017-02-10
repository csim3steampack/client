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
              <div className="player">{this.props.homeName[0]}</div>
              <div className="player">{this.props.homeName[1]}</div>
              <div className="player">{this.props.homeName[2]}</div>
              <div className="player">{this.props.homeName[3]}</div>
              <div className="player">{this.props.homeName[4]}</div>
            </Col>
            <Col sm="3">
              <div className="player">{this.props.homeName[5]}</div>
              <div className="player">{this.props.homeName[6]}</div>
              <div className="player">{this.props.homeName[7]}</div>
              <div className="player">{this.props.homeName[8]}</div>
              <div className="player">{this.props.homeName[9]}</div>
            </Col>
          </Row>
          <Row className="home-whole">
            <Col sm="3">
              <div className="player">{this.props.awayName[0]}</div>
              <div className="player">{this.props.awayName[1]}</div>
              <div className="player">{this.props.awayName[2]}</div>
              <div className="player">{this.props.awayName[3]}</div>
              <div className="player">{this.props.awayName[4]}</div>
            </Col>
            <Col sm="6" className="home-field">
              <div className="player">{this.props.awayName[5]}</div>
              <div className="player">{this.props.awayName[6]}</div>
              <div className="player">{this.props.awayName[7]}</div>
              <div className="player">{this.props.awayName[8]}</div>
              <div className="player">{this.props.awayName[9]}</div>
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
