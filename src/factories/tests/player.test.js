import Player from "../player.js"

test("player name accessible", () => {
    let playerA = Player("A");

    expect(playerA.name).toBe("A")
})

test("toggle turn works", () => {
    let testPlayer = Player("test")
    expect(testPlayer.isTurn()).toBeFalsy()

    testPlayer.toggleTurn()
    expect(testPlayer.isTurn()).toBeTruthy()

})