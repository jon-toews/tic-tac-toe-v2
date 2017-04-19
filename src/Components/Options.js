import React from 'react';
import '../App.css';
import {AI, helpers} from '../helpers.js';

export default class Options extends React.Component {
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
        <span>Game piece:</span>
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
      <div className="option">AI difficulty:&nbsp;&nbsp;
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