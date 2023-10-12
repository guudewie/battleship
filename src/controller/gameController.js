import gameView from "../view/gameView";
import Gameboard from "../factories/gameboard";
import Ship from "../factories/ship";


// this module combines dom (gameView) and logic functions (factories)
const gameController = (function () {
    
    const _makeMoveLeftPlayer = (gameboardLeft, gameboardRight) => {
        
        gameView.setUpFieldListenerRight((field) => {

            // dont set up listener if field was already played
            if (!gameboardRight.isValidMove(field.dataset.row, field.dataset.column)) return

            // register attack and render updated gameboard
            gameboardRight.receiveAttack(field.dataset.row, field.dataset.column);
            gameView.clearRightGameboard();
            gameView.renderRightGameboard(gameboardRight);

            // return if game is over
            if (gameboardRight.gameboardLost() == true) return console.log("Player Right lost")

            // initiate next move
            gameboardRight.getLastHit() ?
            _makeMoveLeftPlayer(gameboardLeft, gameboardRight) :
            _makeMoveRightPlayer(gameboardLeft, gameboardRight);
        })
    }

    const _makeMoveRightPlayer = (gameboardLeft, gameboardRight) => {

        gameView.setUpFieldListenerLeft((field) => {

            // dont set up listener if field was already played
            if (!gameboardLeft.isValidMove(field.dataset.row, field.dataset.column)) return

            // register attack and render updated gameboard
            gameboardLeft.receiveAttack(field.dataset.row, field.dataset.column);
            gameView.clearLeftGameboard();
            gameView.renderLeftGameboard(gameboardLeft);

            // return if game is over
            if (gameboardLeft.gameboardLost() == true) return console.log("Player Left lost")

            // initiate next move
            gameboardLeft.getLastHit() ?
            _makeMoveRightPlayer(gameboardLeft, gameboardRight) :
            _makeMoveLeftPlayer(gameboardLeft, gameboardRight);
        })
    }

    // the functions makemoveplayer recursively call each other inside another untill the win condition stops the game
    const startMoves = (gameboardLeft, gameboardRight) => {
        _makeMoveLeftPlayer(gameboardLeft, gameboardRight)
    }


    return {
        startMoves
    }
})();

export default gameController;
