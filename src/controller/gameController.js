import gameView from "../view/gameView";
import Computer from "../factories/computer";
import Layout from "../factories/layout";
import Gameboard from "../factories/gameboard";
import { Game } from "../game";


// this module combines dom (gameView) and logic functions (factories)
const gameController = (function () {

    const _timeOut = 700;
    
    // real player
    const _makeMoveLeftPlayer = (gameboardLeft, gameboardRight) => {
        
        gameView.setUpFieldListenerRight((field) => {

            //set ui message box empty
            gameView.setMessage()

            // dont set up listener if field was already played
            if (!gameboardRight.isValidMove(field.dataset.row, field.dataset.column)) return

            // register attack and render updated gameboard
            gameboardRight.receiveAttack(field.dataset.row, field.dataset.column);
            gameView.clearRightGameboard();
            gameView.renderRightGameboard(gameboardRight);

            // return if game is over
            if (gameboardRight.gameboardLost() == true) {
                gameView.setMessage("LeftWon")
                gameView.muteGameboard() // make gameboard not playable
            }

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
        if (gameboardLeft.gameboardLost() == true) {
            gameView.setMessage("RightWon")
            gameView.muteGameboard() // make gameboard not playable
        }

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

            // clear previous boat layout
            gameView.clearLeftGameboard()

            // create new Gameboard object with random boat layout
            const newGameboardL = Gameboard()
            const playerName = Layout.applyLayout(newGameboardL)
            gameView.setPlayerName(playerName) // set respective name in UI
            gameView.renderLeftGameboard(newGameboardL)

            // save latest gameboard to storage
            currentGameboardL = newGameboardL;

            gameView.unMuteStart() // make start button available again
            gameView.unMuteGameboard() // make gameboard playable available again
        })
    }

    const startGame = (gameboardR) => {

        gameView.setStartListener(() => {

            gameView.unMuteStart()

            //set ui message, that left attacs first
            gameView.setMessage("LeftStart")

            // initialize game with shuffled gameboard
            let newGameboardL = getCurrentGameboardL();
            gameController.startMoves(newGameboardL, gameboardR)

            // deactivate shuffle button
            gameView.muteShuffle()

            gameView.startToRestart(() => {
                gameView.muteStart()
                gameView.clearLeftGameboard()
                gameView.clearRightGameboard()
                gameView.unMuteShuffle()
                gameView.restartToStart(() => startGame())
                Game()
            })

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
