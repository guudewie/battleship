const { Gameboard } = require("./gameboard")
const { Ship } = require("./ship")

test("field factory has correct attributes", () => {
    let testGameboard = Gameboard();
    let testField = {
        ship : null,
        hit : null,
        miss : null
    }
    expect(testGameboard.fields[0][0]).toEqual(testField)
    expect(testGameboard.fields[0][0].ship).toBe(null)
    expect(testGameboard.fields[0][0].hit).toBe(null)
    expect(testGameboard.fields[0][0].miss).toBe(null)
})

test("gameboard places ship", () => {
    let testGameboard = Gameboard();
    testGameboard.placeShip(4, [[0,0], [0,1], [0,2], [0,3]]);

    expect(testGameboard.fields[0][0].ship).not.toBe(null)
    expect(testGameboard.fields[0][1].ship).not.toBe(null)
    expect(testGameboard.fields[0][2].ship).not.toBe(null)
    expect(testGameboard.fields[0][3].ship).not.toBe(null)

    expect(testGameboard.fields[0][0].ship.length).toBe(4)
})

test("ship receives attacks", () => {
    let testGameboard = Gameboard();
    testGameboard.placeShip(4, [[0,0], [0,1], [0,2], [0,3]]);
    testGameboard.receiveAttack(0,0)

    expect(testGameboard.fields[0][0].hit).toBe(true)
    expect(testGameboard.fields[0][0].ship.getHits()).toBe(1)

    testGameboard.receiveAttack(0,1)

    expect(testGameboard.fields[0][1].hit).toBe(true)
    expect(testGameboard.fields[0][0].ship.getHits()).toBe(2)

})

test("gameboard receives miss", () => {
    let testGameboard = Gameboard();
    testGameboard.placeShip(4, [[0,0], [0,1], [0,2], [0,3]]);
    testGameboard.receiveAttack(1,1)

    expect(testGameboard.fields[1][1].miss).toBe(true)
    expect(testGameboard.fields[1][1].hit).toBe(null)
})

test("gameboard lost", () => {
    let testGameboard = Gameboard();
    testGameboard.placeShip(4, [[0,0], [0,1], [0,2], [0,3]]);
    testGameboard.receiveAttack(0,0);
    testGameboard.receiveAttack(0,1);
    testGameboard.receiveAttack(0,2);

    expect(testGameboard.gameboardLost()).toBeFalsy()

    testGameboard.receiveAttack(0,3);

    expect(testGameboard.gameboardLost()).toBeTruthy()
})