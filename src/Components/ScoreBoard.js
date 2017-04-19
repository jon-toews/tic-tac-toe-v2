import React from 'react';
import '../App.css';



export default class ScoreBoard extends React.Component {
  render() {
    const xScore = this.props.scores[0];
    const oScore = this.props.scores[1];
    
    let message = this.props.xTurn ? "X's turn":"O's turn";

    // const result = helpers.isTerminal(this.props.squares);
    const result = this.props.result;
    if (result) {
      if (result.winner === "Draw")
        message = "It's a draw!";
      else
        message = result.winner + " wins!";
    }

    return (
      <div className="scoreboard">
        <span className="status">{message}</span>
        <ul className="scores">
          <li>X's score:  <span>{xScore}</span></li>
          <li>O's score:  <span>{oScore}</span></li>
        </ul>
      </div>
    )
  }
}