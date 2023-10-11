import Gameboard from "./factories/gameboard"
import Player from "./factories/player"

export function Game () {

    let playerA = Player("A")
    let playerB = Player("B")

    let gameboardA = Gameboard()
    gameboardA.placeShip(1, [[0,0]])

    let gameboardB = Gameboard()
    gameboardB.placeShip(1, [[9,9]])

    while (true) {
        let playerAX = prompt("PLAYER A X-COORDINATE: ")
        let playerAY = prompt("PLAYER A Y-COORDINATE: ")
        playerA.attackEnemyGameboard(gameboardB, [playerAX, playerAY])
        if (gameboardB.gameboardLost() == true) return "Player B lost"

        let playerBX = prompt("PLAYER B X-COORDINATE: ")
        let playerBY = prompt("PLAYER B Y-COORDINATE: ")
        playerB.attackEnemyGameboard(gameboardA, [playerBX, playerBY])
        if (gameboardA.gameboardLost() == true) return "Player A lost"
    }
};



// TODO

// render DOM gameboards
//      with visualizing hit/miss/water

// receive user input
