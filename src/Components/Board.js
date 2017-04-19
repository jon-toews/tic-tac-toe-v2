import React from 'react';
import '../App.css';
import {AI, helpers} from '../helpers.js';


export default class Board extends React.Component {
  render() {
    const playerTurn = this.props.xTurn === this.props.xIsPlayer;
    const result = this.props.result;

    const squares = this.props.squares.map((square, i) => {
      // define css classes for each square
      let classes = "square";
      // make square non-clickable
      if(square || !playerTurn) {
        classes +=" non-clickable";
      }
      // shows placeholder mark on hover
      if(this.props.xTurn)
        classes += " x-sqr"
      else
        classes += " o-sqr"
      // highlight winning squares if game is over
      if(result) {
        if(result.squares.indexOf(i) !== -1){
          classes += " winning-sqr"
        }
      }
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