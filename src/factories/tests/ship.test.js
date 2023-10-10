import Ship from "../ship.js"

test("return length and hits", () => {
    const testShip = Ship(4)
    expect(testShip.length).toBe(4)
    expect(testShip.getHits()).toBe(0)
})

test("register hit", () => {
    const testShip = Ship(4)
    testShip.hit()
    testShip.hit()
    expect(testShip.getHits()).toBe(2)
})

test("ship is sunk", () => {
    const testShip = Ship(2);
    testShip.hit()
    testShip.hit()
    expect(testShip.isSunk()).toBe(true)
})

test("Error for too many hits", () => {
    const testShip = Ship(2);
    testShip.hit()
    testShip.hit()
    expect(() => testShip.hit()).toThrow()
})

