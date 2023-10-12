import Gameboard from "./factories/gameboard"
import Player from "./factories/player"
import gameView from "./view/gameView"
import gameController from "./controller/gameController"

export function Game () {

    let playerL = Player("L")
    let playerR = Player("R")

    const gameboardL = Gameboard()
    gameboardL.placeShip(3, [[0,0], [0,1], [0,2]])
    gameboardL.placeShip(2, [[3,4], [2,4]])
    gameView.renderLeftGameboard(gameboardL)

    const gameboardR = Gameboard()
    gameboardR.placeShip(4, [[8,8], [8,7], [8,6], [8,5]])
    gameboardR.placeShip(2, [[2,2], [3,2]])
    gameView.renderRightGameboard(gameboardR)

    gameController.startMoves(gameboardL, gameboardR)
    
};