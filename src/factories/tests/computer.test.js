import Computer from "../computer";

test("x and y between 0 and 10", () => {
    let testComputer = Computer();

    expect(testComputer.getRandomMove()[1]).toBeLessThan(10)
    expect(testComputer.getRandomMove()[1]).toBeLessThan(10)
    expect(testComputer.getRandomMove()[1]).toBeLessThan(10)

    expect(testComputer.getRandomMove()[0]).toBeLessThan(10)
    expect(testComputer.getRandomMove()[0]).toBeLessThan(10)
    expect(testComputer.getRandomMove()[0]).toBeLessThan(10)
})