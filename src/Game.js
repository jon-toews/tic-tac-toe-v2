import React from 'react';
import './App.css';
import {AI, helpers} from './helpers.js';


export default class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      board: Array(9).fill(null),
      xTurn: true,
      xIsPlayer : true,
      scores : [0,0],
      started: false,
    }
  }
  componentDidUpdate() {
    // make AI action if it is not player's turn and game is started
    if (this.state.xIsPlayer !==  this.state.xTurn && this.state.started) {
      console.log('ai action');
      
      setTimeout(() => this.AIaction(), 500);
    }
  }

  AIaction() {
    const board = this.state.board.slice();
    const emptySquares = helpers.getEmptySquares(board);
    const AImove = emptySquares[Math.floor(Math.random() * emptySquares.length)];

    board[AImove] = this.state.xIsPlayer ? "O": "X"; 
    

    this.setState({
      board:board,
      xTurn:!this.state.xTurn
    })



  }
  gameStart() {
    console.log('starting game');
    this.setState({
      started: true,
    })
  }
  gameReset() {
    this.setState({
      started: false,
      board: Array(9).fill(null),
      scores: [0,0],
      xTurn: true,
    })
  }

  handleOptionChange(opt) {
    this.setState({
      xIsPlayer: opt === "X" ? true:false,
    })
    
  }
  handleClick(i) {
    // exit function if not human player's turn
    if (this.state.xIsPlayer !== this.state.xTurn) return;

    const squares = this.state.board.slice();
    squares[i] = this.state.xTurn ? "X": "O";

    this.setState({
      board: squares,
      xTurn: !this.state.xTurn
    })
  }
  
  render() {
    return (
      <div className="game">
        <Title />
        <div className="container">
          <Options 
            mark={this.state.xIsPlayer}
            started={this.state.started}
            difficulty="hard" 
            onClick={(opt) => this.handleOptionChange(opt)}
          />
          <GameStart 
            onStart={() => this.gameStart()}
            onReset={() => this.gameReset()}
            started={this.state.started}
          />
          <Board 
            squares={this.state.board}
            started={this.state.started}
            onClick={(i) => this.handleClick(i)}
          />
          <ScoreBoard 
            scores={this.state.scores} 
            started={this.state.started}
            xTurn={this.state.xTurn}
          />
        </div>
      </div>
    )
  }
}
class Board extends React.Component {
  render() {
    const squares = this.props.squares.map((square, i) => (
     <div key={i} className="square"onClick={() => this.props.onClick(i)}>
        {square}
     </div>
    ));
    if (!this.props.started) return null;
    return (
      <div className="board">
        {squares}
      </div>
    )
  }
}

class ScoreBoard extends React.Component {
  render() {
    const xScore = this.props.scores[0];
    const oScore = this.props.scores[1];
    
    const message = this.props.xTurn ? "X's turn":"O's turn";

    // render nothing if game not started
    if (!this.props.started) return null;

    return (
      <div className="scoreboard">
        <span className="status">{message}</span>
        <ul>
          <li>X's score: {xScore}</li>
          <li>O's score: {oScore}</li>
        </ul>
      </div>
    )
  }
}

const Title = () => (
  <div className="title">
    <div className="container">
      <img className="logo" alt="react logo"
          src="https://raw.githubusercontent.com/jon-toews/tic-tac-toe/styling/public/favicon.ico" /><span className="name">Tic Tac Toe</span>
    </div>
  </div> 
)

class Options extends React.Component {
  render() {
    // hide options if game is started
    if (this.props.started) return null;
    
    return (
      <div className="options">
        <GamePiece mark={this.props.mark} onClick={(opt) => this.props.onClick(opt)} />
      </div>
    )
  }
}



class GamePiece extends React.Component {
  render() {
    return (
      <div className="game-piece">
        <span>Choose your game piece</span>
        <div className="btn-group">
          <button 
            className={"btn " + (this.props.mark ? "btn-primary": "btn-secondary")}
            onClick={() => this.props.onClick("X")}
          >
            X's
          </button>
          <button
            className={"btn " + (!this.props.mark? "btn-primary": "btn-secondary")}
            onClick={() => this.props.onClick("O")}
          >
            O's
          </button>
        </div>
      </div> 
    )
  }
}

class GameStart extends React.Component {
  render() {
    let button = null;
    if (this.props.started) {
      button = <button onClick={() => this.props.onReset()} className="start btn btn-warning">Restart</button>
    } else {
      button = <button onClick={() => this.props.onStart()} className="reset btn btn-success">Play</button>
    }
    
    return (<div className="game-start">{button}</div>)
  }
}

// class Difficulty extends React.Component {
//   render() {
//     return (
//       <div>AI difficulty: 
//         <div className="game-difficulty btn-group">
//           <button className={"btn " + (this.props.difficulty==="easy"?"btn-primary":"btn-secondary")}>Easy</button>
//           <button className={"btn " + (this.props.difficulty==="medium"?"btn-primary":"btn-secondary")}>Medium</button>
//           <button className={"btn " + (this.props.difficulty==="hard"?"btn-primary":"btn-secondary")}>Hard</button>
//         </div>
//       </div>
//     )
//   }
// }

// class Square extends React.Component {
//   render() {
//     return (
//       <div className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </div>
//     )  
//   }
// }
