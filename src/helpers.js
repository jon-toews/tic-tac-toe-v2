// AI logic
const AI = {
    minimax: function() {
        console.log('minimaxing');
    },
    potentialState: function(state, pos) {
        // copy and alter board with AI's mark
        const squares = state.board.slice();
        squares[pos] = state.xTurn ? 'X': 'O';
        // create new future state object
        return Object.assign({}, state, {board: squares, xTurn: !state.xTurn});
    }
}

// game helper functions
const helpers = {
    getEmptySquares: function(board) {
        const empty = board.map((item, index) => {
            if (item == null) 
                return index;
        }).filter(item => item !== undefined);

        return empty;
    },
    isTerminal: function(squares) {
        // winning combos
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        // check for winner
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return {
                    winner:squares[a],
                    squares:lines[i]
                }
            }
        }
        // check for draw
        if (this.getEmptySquares(squares).length === 0) {
            return {winner:"Draw"};
        }
        // game ongoing
        return null;
    }
}

export {AI, helpers}; 
