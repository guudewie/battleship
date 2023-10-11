import gameView from "../view/gameView";
import Gameboard from "../factories/gameboard";
import Ship from "../factories/ship";


// this module combines dom (gameView) and logic functions (factories)
const gameController = (function () {
    
    const makeMoveLeftPlayer = (gameboardRight) => {
        gameView.setUpFieldListenerRight((field) => {
            gameboardRight.receiveAttack(field.dataset.row, field.dataset.column);
            gameView.clearRightGameboard();
            gameView.renderRightGameboard();
        })
    }

    const makeMoveRightPlayer = (gameboardLeft) => {
        gameView.setUpFieldListenerLeft((field) => {
            gameboardLeft.receiveAttack(field.dataset.row, field.dataset.column);
            gameView.clearLeftGameboard();
            gameView.clearRightGameboard();
        })
    }

    return {
        makeMoveLeftPlayer,
        makeMoveRightPlayer
    }
})();

export default gameController;
