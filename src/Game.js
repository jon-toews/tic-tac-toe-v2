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
      difficulty: 'easy',
    }
  }
  componentDidUpdate() {
    // make AI action if it is not player's turn and game is started
    if (this.state.xIsPlayer !==  this.state.xTurn && this.state.started) {
      console.log('ai action');
      
      setTimeout(() => this.AIaction(), 500);
    }
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
  gameEnd() {
    console.log('game end');
  }

  handleOptionChange(opt) {
    // game piece change
    if (opt.type === "piece") {
      this.setState({
        xIsPlayer: opt.value === "X" ? true:false,
      })
    } 
    // difficulty change
    else if (opt.type === "diff") {
      this.setState({
        difficulty: opt.value
      })
    }
  }

  AIaction() {
    const squares = this.state.board.slice();
    // check if game is over
    if (helpers.isTerminal(squares)) {
      this.gameEnd();
      return;
    }

    const emptySquares = helpers.getEmptySquares(squares);
    // pick random move
    const AImove = emptySquares[Math.floor(Math.random() * emptySquares.length)];

    const nextState = AI.potentialState(this.state, 0);
    console.log(this.state);
    console.log(nextState);

    squares[AImove] = this.state.xIsPlayer ? "O": "X"; 
    
    this.setState({
      board:squares,
      xTurn:!this.state.xTurn
    })
  }

  handleClick(i) {
    // exit if not human player's turn
    if (this.state.xIsPlayer !== this.state.xTurn) return;
    const squares = this.state.board.slice();
    // check if squared already played
    if (squares[i]) return;
    
    if (helpers.isTerminal(squares)) {
      this.gameEnd();
      return;
    }
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
            difficulty={this.state.difficulty} 
            onClick={(opt) => this.handleOptionChange(opt)}
          />
          <GameStart 
            onStart={() => this.gameStart()}
            onReset={() => this.gameReset()}
            started={this.state.started}
          />
          {this.state.started &&
            <div>
              <Board
                xTurn={this.state.xTurn}
                xIsPlayer={this.state.xIsPlayer}
                squares={this.state.board}
                onClick={(i) => this.handleClick(i)}
              />
              <ScoreBoard 
                squares={this.state.board}
                scores={this.state.scores} 
                xTurn={this.state.xTurn}
              />
            </div>
          }
          
        </div>
      </div>
    )
  }
}
class Board extends React.Component {
  render() {
    const playerTurn = this.props.xTurn === this.props.xIsPlayer;
    const squares = this.props.squares.map((square, i) => {
      // define css classes for each square
      let classes = "square";
      if(square || !playerTurn) {
        classes +=" non-clickable";
      }
      if(this.props.xTurn)
        classes += " x-sqr"
      else
        classes += " o-sqr"

      return (
        <div key={i} className={classes} onClick={() => this.props.onClick(i)}>
          {square}<span></span>
        </div>
      )
    });
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
 
    let message = this.props.xTurn ? "X's turn":"O's turn";

    const result = helpers.isTerminal(this.props.squares);
    
    if (result) {
      if (result.winner === "Draw")
        message = "It's a draw!";
      else
        message = result.winner + " wins!";
    }

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
        <Difficulty difficulty={this.props.difficulty} onClick={(opt) => this.props.onClick(opt)} />
      </div>
    )
  }
}

class GamePiece extends React.Component {
  render() {
    return (
      <div className="option">
        <span>Choose your game piece</span>
        <div className="btn-group">
          <button 
            className={"btn " + (this.props.mark ? "btn-primary": "btn-secondary")}
            onClick={() => this.props.onClick({type:'piece', value:'X'})}
          >
            X's
          </button>
          <button
            className={"btn " + (!this.props.mark? "btn-primary": "btn-secondary")}
            onClick={() => this.props.onClick({type:'piece', value:'O'})}
          >
            O's
          </button>
        </div>
      </div> 
    )
  }
}

class Difficulty extends React.Component {
  render() {
    return (
      <div className="option">AI difficulty: 
        <div className="game-difficulty btn-group">
          <button 
            className={"btn " + (this.props.difficulty==="easy"?"btn-primary":"btn-secondary")}
            onClick={() => this.props.onClick({type:'diff', value:'easy'})}
          >
            Easy
          </button>
          <button 
            className={"btn " + (this.props.difficulty==="medium"?"btn-primary":"btn-secondary")}
            onClick={() => this.props.onClick({type:'diff', value:'medium'})}
          >
            Medium
          </button>
          <button 
            className={"btn " + (this.props.difficulty==="hard"?"btn-primary":"btn-secondary")}
            onClick={() => this.props.onClick({type:'diff', value:'hard'})}
          >
            Hard
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