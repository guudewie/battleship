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