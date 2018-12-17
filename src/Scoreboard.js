import React, { Component } from 'react';
import './App.css';

class Scoreboard extends Component {
  render() {
    return (
      <div className={"score"}>
        <div style={{marginRight: '20px'}} className={"scoreItem"}>Black: {this.props.blackScore}</div>
        <div className={"scoreItem"}>White: {this.props.whiteScore}</div>
      </div>
    )
  }
}

export default Scoreboard;
