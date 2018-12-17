import React, { Component } from 'react';
import './App.css';
import Scoreboard from "./Scoreboard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      blackScore: 0,
      whiteScore: 0,
      blacksTurn: true,
      endGame: false,
      winner: ''
    }
  }

  getNewTable() {
    let x = new Array(8);
    for(let i = 0; i < x.length; i++) {
      x[i] = new Array(8);
      x[i].fill(0);
    }
    x[3][3] = 1;
    x[4][4] = 1;
    x[3][4] = 2;
    x[4][3] = 2;
    return x;
  }

  restartGame() {
    this.setState({items: this.getNewTable(),
      blackScore: 0,
      whiteScore: 0,
      blacksTurn: true,
      endGame: false,
      winner: ''});
  }

  componentWillMount() {
    this.setState({items: this.getNewTable()})
  }

  componentDidMount() {
    this.getScore();
  }

  getScore() {
    let blackScore = 0;
    let whiteScore = 0;
    for(let i = 0; i < this.state.items.length; i++) {
      for(let j = 0; j < this.state.items.length; j++) {
        if (this.state.items[i][j] === 1) whiteScore++;
        else if (this.state.items[i][j] === 2) blackScore++;
      }
    }
    let winner = blackScore === whiteScore ? "Draw!" : (blackScore > whiteScore ? "Black wins!" : "White wins!");
    this.setState({blackScore: blackScore, whiteScore: whiteScore, winner: winner});
  }

  clickedPad(e) {
    if (e.target.id) {
      let i = e.target.id.charAt(0);
      let j = e.target.id.charAt(1);
      let items = this.state.items;
      if (this.checkMove(i, j) && items[i][j] === 0) {
        if (this.state.blacksTurn) items[i][j] = 2;
        else items[i][j] = 1;
        this.replaceTokens(i, j);
        this.setState({items: items, blacksTurn: !this.state.blacksTurn});
        this.getScore();
      }
      this.checkEndGame();
    }
  }
  checkMove(y, x) {
    let m = (this.state.blacksTurn ? 1 : 2);
    let n = (this.state.blacksTurn ? 2 : 1);
    if (y === '0')
      return (this.checkBottomRight(y, x, m, n) || this.checkBottom(y, x, m, n) || this.checkBottomLeft(y, x, m, n) ||
        this.checkLeft(y, x, m, n) || this.checkRight(y, x, m, n) );
    else if (y === '7')
      return (this.checkTop(y, x, m, n) || this.checkTopLeft(y, x, m, n) || this.checkTopRight(y, x, m, n) ||
        this.checkLeft(y, x, m, n) || this.checkRight(y, x, m, n));
    else
      return (this.checkTop(y, x, m, n) || this.checkTopLeft(y, x, m, n) || this.checkTopRight(y, x, m, n) ||
        this.checkBottomRight(y, x, m, n) || this.checkBottom(y, x, m, n) || this.checkBottomLeft(y, x, m, n) ||
        this.checkLeft(y, x, m, n) || this.checkRight(y, x, m, n));
  }
  checkTop(y, x, m, n) {
    if (this.state.items[y - 1][x] === m) {
      for(let i = 0; i < y; i++) {
        if (this.state.items[i][x] === n) return true;
      }
    }
    return false;
  }
  checkLeft(y, x, m, n) {
    if (this.state.items[y][x - 1] === m) {
      for(let i = 0; i < x; i++) {
        if (this.state.items[y][i] === n) return true;
      }
    }
    return false;
  }
  checkRight(y, x, m, n) {
    if (this.state.items[y][x-0+1] === m) {
      for(let i = 7; i > x; i--) {
        if (this.state.items[y][i] === n) return true;
      }
    }
    return false;
  }
  checkBottom(y, x, m, n) {
    if (this.state.items[y-0+1][x] === m) {
      for(let i = 7; i > y; i--) {
        if (this.state.items[i][x] === n) return true;
      }
    }
    return false;
  }
  checkTopLeft(y, x, m, n) {
    if (this.state.items[y - 1][x - 1] === m) {
      for(let i = 1; i < 7; i++) {
        if(y - i < 0 || x - i < 0) break;
        if (this.state.items[y - i][x - i] === n) return true;
      }
    }
    return false;
  }
  checkTopRight(y, x, m, n) {
    if (this.state.items[y - 1][x-0+1] === m) {
      for(let i = 1; i < 7; i++) {
        if(y - i < 0 || x-0+i > 7) break;
        if (this.state.items[y - i][x-0+i] === n) return true;
      }
    }
    return false;
  }
  checkBottomRight(y, x, m, n) {
    if (this.state.items[y-0+1][x-0+1] === m) {
      for(let i = 1; i < 7; i++) {
        if(y-0+i > 7 || x-0+i > 7) break;
        if (this.state.items[y-0+i][x-0+i] === n) return true;
      }
    }
    return false;
  }
  checkBottomLeft(y, x, m, n) {
    if (this.state.items[y-0+1][x - 1] === m) {
      for(let i = 1; i < 7; i++) {
        if(y-0+i > 7 || x - i < 0) break;
        if (this.state.items[y-0+i][x - i] === n) return true;
      }
    }
    return false;
  }

  replaceTokens(y, x) {
    let m = (this.state.blacksTurn ? 1 : 2);
    let n = (this.state.blacksTurn ? 2 : 1);
    let items = this.state.items;
    if(y !== '0'){
      if (this.checkTop(y, x, m, n)) {
        let found = false;
        for (let i = 0; i < y; i++) {
          if (items[i][x] === n) found = true;
          if (found) items[i][x] = n;
        }
      }
    }
    if(y !== '7'){
      if (this.checkBottom(y, x, m, n)) {
        let found = false;
        for (let i = 7; i > y; i--) {
          if (items[i][x] === n) found = true;
          if (found) items[i][x] = n;
        }
      }
    }
    if(x !== '0'){
      if (this.checkLeft(y, x, m, n)) {
        let found = false;
        for (let i = 0; i < x; i++) {
          if (items[y][i] === n) found = true;
          if (found) items[y][i] = n;
        }
      }
    }
    if(x !== '7'){
      if (this.checkRight(y, x, m, n)) {
        let found = false;
        for (let i = 7; i > x; i--) {
          if (items[y][i] === n) found = true;
          if (found) items[y][i] = n;
        }
      }
    }
    if(x !== '0' && y !== '0'){
      let times = 0;
      let yy = y - 0;
      let xx = x - 0;
      while(yy !== 0 && xx !== 0){
        times++;
        yy--;
        xx--;
      }
      if (this.checkTopLeft(y, x, m, n)) {
        let found = false;
        for (let i = times; i > 0; i--) {
          if (items[yy][xx] === n) found = true;
          if (found) items[yy][xx] = n;
          yy++;
          xx++;
        }
      }
    }
    if(x !== '7' && y !== '0'){
      let times = 0;
      let yy = y - 0;
      let xx = x - 0;
      while(yy !== 0 && xx !== 7){
        times++;
        yy--;
        xx++;
      }
      if (this.checkTopRight(y, x, m, n)) {
        let found = false;
        for (let i = times; i > 0; i--) {
          if (items[yy][xx] === n) found = true;
          if (found) items[yy][xx] = n;
          yy++;
          xx--;
        }
      }
    }
    if(x !== '7' && y !== '7'){
      let times = 0;
      let yy = y - 0;
      let xx = x - 0;
      while(yy !== 7 && xx !== 7){
        times++;
        yy++;
        xx++;
      }
      if (this.checkBottomRight(y, x, m, n)) {
        let found = false;
        for (let i = times; i > 0; i--) {
          if (items[yy][xx] === n) found = true;
          if (found) items[yy][xx] = n;
          yy--;
          xx--;
        }
      }
    }
    if(x !== '0' && y !== '7'){
      let times = 0;
      let yy = y - 0;
      let xx = x - 0;
      while(yy !== 7 && xx !== 0){
        times++;
        yy++;
        xx--;
      }
      if (this.checkBottomLeft(y, x, m, n)) {
        let found = false;
        for (let i = times; i > 0; i--) {
          if (items[yy][xx] === n) found = true;
          if (found) items[yy][xx] = n;
          yy--;
          xx++;
        }
      }
    }
    this.setState({items: items});
  }

  checkEndGame(){
    let end = true;
    this.state.items.forEach(row => {
      row.forEach(item => {
        if(item === 0) end = false;
      })
    });
    if(end) this.setState({endGame: true});
  }
  render() {
    return (
      <div className="App">
        <div className={"scoreText"}>Score</div>
        <Scoreboard whiteScore={this.state.whiteScore} blackScore={this.state.blackScore}/>
        <div className="App-container">
          {this.state.items.map((column, columnIndex) => {
            return (
              column.map((item, rowIndex) => {
                return (
                  <div id={columnIndex + "" + rowIndex} className="grid-item"
                       onClick={(event) => this.clickedPad(event)}
                  >
                    <span className={item === 0 ? null : (item === 1 ? "white" : "black")}/>
                  </div>
                )
              })
            )
          })}
        </div>
        {this.state.endGame ? <div>
            <div className={"turnText"}>{this.state.winner}</div>
            <div>
              <button onClick={() => this.restartGame()}>Restart game</button>
            </div>
          </div>
          :
          <div className={"turnText"}>{this.state.blacksTurn ? "Black " : "White "} player's turn</div>}
      </div>
    );
  }
}

export default App;
