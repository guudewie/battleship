import Gameboard from "./factories/gameboard"
import gameView from "./view/gameView"
import gameController from "./controller/gameController"
import Layout from "./factories/layout"

export function Game () {


    

    const gameboardL = Gameboard()
    console.log(Layout.applyLayout(gameboardL))
    gameView.renderLeftGameboard(gameboardL)

    const gameboardR = Gameboard()
    gameboardR.placeShip(4, [[8,8], [8,7], [8,6], [8,5]])
    gameboardR.placeShip(2, [[2,2], [3,2]])
    gameView.renderRightGameboard(gameboardR)

    gameController.startMoves(gameboardL, gameboardR)
};