import gameView from "../view/gameView";
import Computer from "../factories/computer";
import Layout from "../factories/layout";
import Gameboard from "../factories/gameboard";


// this module combines dom (gameView) and logic functions (factories)
const gameController = (function () {

    const _timeOut = 700;
    
    // real player
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
            setTimeout(() => _makeMoveRightPlayer(gameboardLeft, gameboardRight), _timeOut);
        })
    }

    // computer player
    const _makeMoveRightPlayer = (gameboardLeft, gameboardRight) => {

        let computerChoice = Computer.getRandomMove(gameboardLeft);

        while (!gameboardLeft.isValidMove(computerChoice[0], computerChoice[1])) {
            computerChoice = Computer.getRandomMove(gameboardLeft);
        }

        // register attack and render updated gameboard
        gameboardLeft.receiveAttack(computerChoice[0], computerChoice[1]);
        gameView.clearLeftGameboard();
        gameView.renderLeftGameboard(gameboardLeft);

        // return if game is over
        if (gameboardLeft.gameboardLost() == true) return console.log("Player Left lost")

        // initiate next move
        gameboardLeft.getLastHit() ?
        setTimeout(() => _makeMoveRightPlayer(gameboardLeft, gameboardRight), _timeOut):
        _makeMoveLeftPlayer(gameboardLeft, gameboardRight);
        
    }

    // the functions makemoveplayer recursively call each other inside another untill the win condition stops the game
    const startMoves = (gameboardLeft, gameboardRight) => {
        _makeMoveLeftPlayer(gameboardLeft, gameboardRight)
    }

    const shuffleLayout = () => {
        gameView.setUpShuffleListener(() => {

            gameView.clearLeftGameboard()

            const newGameboardL = Gameboard()

            const playerName = Layout.applyLayout(newGameboardL)
            
            gameView.setPlayerName(playerName)

            gameView.renderLeftGameboard(newGameboardL)

            currentGameboardL = newGameboardL;
        })
    }

    const startGame = (gameboardR) => {

        gameView.setStartListener(() => {

            let newGameboardL = getCurrentGameboardL();

            gameController.startMoves(newGameboardL, gameboardR)
        })
    }

    let currentGameboardL;

    const getCurrentGameboardL = () => {
        return currentGameboardL
    }



    return {
        startMoves,
        shuffleLayout,
        getCurrentGameboardL,
        startGame
    }
})();

export default gameController;
