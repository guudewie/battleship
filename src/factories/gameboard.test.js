const { Gameboard } = require("./gameboard")

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