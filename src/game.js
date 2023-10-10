import Gameboard from "./factories/gameboard"
import Player from "./factories/player"

export default Game = (() => {

    let playerA = Player("A")
    let playerB = Player("B")

    let gameboardA = Gameboard()
    gameboardA.placeShip(1, [0,0])

    let gameboardB = Gameboard()
    gameboardA.placeShip(1, [9,9])

    while (gameboardA.gameboardLost() && gameboardB.gameboardLost()) {
        
        let playerAInput = alert("Coordinates to Attack (format [x,y]):")
        playerA.attackEnemyGameboard(gameboardB, playerAInput)

        let playerBInput = alert("Coordinates to Attack (format [x,y]):")
        playerB.attackEnemyGameboard(gameboardA, playerBInput)
    }

    if (gameboardA.gameboardLost()) return "Player A lost"
    if (gameboardB.gameboardLost()) return "Player B lost"
} )();