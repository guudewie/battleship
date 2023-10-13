const Computer = (() => {

    let hitStorage = [];
    let nextHitQueue = [];

    const getHitStorage = () => {
        return hitStorage
    }

    const getNextHit = () => {
        return nextHitQueue
    }

    const _saveHitToStorage = (gameboard, x, y) => {

        let field = gameboard.fields[x][y]

        if (field.ship == null) return
        
        hitStorage.push([ x, y ])

        if (x-1 >= 0 && x+1 <= 9) {
            nextHitQueue.push([ x-1 , y ])
            nextHitQueue.push([ x+1 , y ])
        }
        if (y-1 >= 0 && y+1 <= 9) {
            nextHitQueue.push([ x , y-1 ])
            nextHitQueue.push([ x , y+1 ])
        }
    }

    const getRandomMove = (gameboard) => {

        // get "smart" move
        if (getNextHit().length > 0) {
            return getNextHit().pop()
        }

        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);

        _saveHitToStorage(gameboard, x, y)

        return [x,y]
    }

    return {
        getRandomMove
    }
})();

export default Computer;