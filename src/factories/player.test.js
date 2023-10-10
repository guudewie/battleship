const { experiments } = require("webpack");
const { Gameboard } = require("./gameboard");
const { Player } = require("./player")

test("player name accessible", () => {
    let playerA = Player("A");

    expect(playerA.name).toBe("A")
})

test("enemy gameboard gets hit and miss", () => {
    let playerA = Player("A");
    let enemyGameboard = Gameboard()
    enemyGameboard.placeShip(1, [[1,1]])

    playerA.attackEnemyGameboard(enemyGameboard, [0,0])
    playerA.attackEnemyGameboard(enemyGameboard, [1,1])

    expect(enemyGameboard.fields[0][0].miss).toBeTruthy()
    expect(enemyGameboard.fields[1][1].hit).toBeTruthy()

})