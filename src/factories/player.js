export default Player = (name) => {

    const attackEnemyGameboard = (enemyGameboard, coordinateArray) => {
        let xCoord = coordinateArray[0];
        let yCoord = coordinateArray[1];
        enemyGameboard.receiveAttack(xCoord, yCoord)
    }

    return {
        name,
        attackEnemyGameboard
    }
}