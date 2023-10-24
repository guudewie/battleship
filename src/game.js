import Gameboard from "./factories/gameboard"
import gameView from "./view/gameView"
import gameController from "./controller/gameController"
import Layout from "./factories/layout"

export function Game () {

    // initialize gameboard L
    const gameboardL = Gameboard()
    gameView.setPlayerName(Layout.applyLayout(gameboardL))
    gameView.renderLeftGameboard(gameboardL)

    // initialize gameboard R
    const gameboardR = Gameboard()
    Layout.applyLayout(gameboardR)
    gameView.renderRightGameboard(gameboardR)

    // initialize shuffle button listener and logic
    gameController.shuffleLayout()

    // initialize start button listener and logic
    gameController.startGame(gameboardR)
};