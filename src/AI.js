import helpers from './helpers'

// AI logic
const AI = {
    move: function(state) {
        const emptySquares = helpers.getEmptySquares(state.squares);
        
        // return random square on EASY mode
        if (state.difficulty === "easy") {
            const random = Math.floor(Math.random() * emptySquares.length);
            return emptySquares[random];
        }
        
        // pick random square for first turn
        if (emptySquares.length === 9) {
            return Math.floor(Math.random()*9);
        }
        // use minimax algorithm to find best next possible move
        const possibleScores = emptySquares.map(pos => {
            const nextState = AI.potentialState(state, pos);
            // minimax value of potential state
            const minimaxVal = AI.minimax(nextState);
            return {score:minimaxVal, pos:pos}
        })
         // sort minimax values in descending order
        const sortedScores = possibleScores.sort((a,b) => (b.score - a.score))
        
        // loop for debugging only
        for (let i = 0; i < sortedScores.length; i++) {
            console.log(sortedScores[i].pos, sortedScores[i].score);
        }

        // AI occasionally makes a mistake on MEDIUM
        if (state.difficulty === "medium") {
            if (sortedScores.length > 1) {
                // occasionally return second best move
                let index = (Math.random() * 4) > 3 ? 1:0;
                return sortedScores[index].pos;
            }
        } 

        // return best move
        return sortedScores[0].pos;
    },

    minimax: function(state) {
        // check if game has a winner
        if (helpers.isTerminal(state.squares)) {
            return this.score(state);
        }
        // check if it is AI's turn.  We want to maximize score for AI, minimize for player
        var isAIturn = state.xTurn !== state.xIsPlayer;
        
        // initialize current state score to impossibly high or low value
        // used in comparison with future states
        // i.e. all AI scores will be higher than -1000, all player scores less than 1000
        var stateScore;
        stateScore = isAIturn ? -1000: 1000;

        // get empty squares and use to generate all possible next states
        var emptySquares = helpers.getEmptySquares(state.squares);
        var possibleStates = emptySquares.map(pos => {
            return this.potentialState(state, pos);
        });
        // loop through possible next states
        possibleStates.forEach(nextState => {
            // minimax score of next state
            var nextScore = this.minimax(nextState);
            // set stateScore to highest possible score if AI's turn
            if(isAIturn) {
                if(nextScore > stateScore) {
                stateScore = nextScore;
                }
            }
            // set stateScore to lowest possible score if player's turn
            else {
                if(nextScore < stateScore) {
                stateScore = nextScore;
                }
            }
        });
        return stateScore;
    },

    score: function(state) {
        const result = helpers.isTerminal(state.squares);
        // game is ongoing
        if (!result) return 0;
        
        // game is finished
        // maximizing for AI player - human player winning is a negative score
        if (result.winner === 'X') {
            return state.xIsPlayer ? -10: 10;
        } else if (result.winner === 'O') {
            return state.xIsPlayer ? 10: -10;
        } else {
            return 0;
        }
    },

    potentialState: function(state, pos) {
        // copy and alter squares with AI's mark
        const squares = state.squares.slice();
        squares[pos] = state.xTurn ? 'X': 'O';
        // create new state object
        return Object.assign({}, state, {squares: squares, xTurn: !state.xTurn});
    }
}

export default AI;
