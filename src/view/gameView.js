

// render gameboard (gameboard.fields, visible = true)

const gameView = (function () {

    const gameboardLeft = document.getElementById("gameboardOne");
    const gameboardRight = document.getElementById("gameboardTwo")

    const renderGameboard = (gameboard, gameboardElement, visible = true) => {

        // iterate through all fields of a gameboard
        for (const row in gameboard.fields) {
            for (const field in gameboard.fields[row]) {
                
                // create cell dom element
                let cell = document.createElement("div")

                // add field class and appropriate field state styling
                cell.classList.add("field", _hitMissShip(gameboard.fields[row][field]))
                if (!visible) cell.classList.add("invisible")

                // add data row and column attribute
                cell.dataset.row = row;
                cell.dataset.column = field

                // append field to gameboard
                gameboardElement.appendChild(cell)
            }
        }
    }

    const clearGameboard = (gameboardElement) => {
        // lookup first child and delete last child for performance reasons
        while (gameboardElement.firstChild) {
            gameboardElement.removeChild(gameboardElement.lastChild)
        }
    }

    const setUpFieldListener = (gameboardElement, callback) => {

        let childDivs = gameboardElement.querySelectorAll(".field")

        for (let i = 0; i < childDivs.length; i++) {
            const element = childDivs[i];
            element.addEventListener("click", () => callback(element))
        }
    }

    const setUpShuffleListener = (callback) => {
        let shuffle = document.getElementById("shuffle")
        shuffle.addEventListener("click", () => callback())
    }

    const muteShuffle = () => {
        let shuffle = document.getElementById("shuffle")
        shuffle.classList.remove("button")
        shuffle.classList.add("mute")
    }

    const unMuteShuffle = () => {
        let shuffle = document.getElementById("shuffle")
        shuffle.classList.add("button")
        shuffle.classList.remove("mute")
    }

    const muteStart = () => {
        let start = document.getElementById("start")
        start.classList.remove("button")
        start.classList.add("mute")
    }

    const unMuteStart = () => {
        let start = document.getElementById("start")
        start.classList.add("button")
        start.classList.remove("mute")
    }

    const muteGameboard = () => {
        gameboardLeft.classList.add("fieldMute")
        gameboardRight.classList.add("fieldMute")
    }

    const unMuteGameboard = () => {
        gameboardLeft.classList.remove("fieldMute")
        gameboardRight.classList.remove("fieldMute")
    }

    const setStartListener = (callback) => {
        let start = document.getElementById("start")
        start.addEventListener("click", () => callback())
    }

    const startToRestart = (callback) => {
        let start = document.getElementById("start")
        start.innerHTML = "restart"
        start.addEventListener("click", () => callback())
    }

    const restartToStart = (callback) => {
        let start = document.getElementById("start")
        start.innerHTML = "start"
        start.addEventListener("click", () => callback())
    }

    const setMessage = (type) => {
        let box = document.querySelector(".announcement")

        switch (type) {
            case "init":
                box.innerHTML = "Shuffle Layout, then press start!"
                break;
            case "LeftStart":
                box.innerHTML = "Player Left attacks first!"
                break;
            case "LeftWon":
                box.innerHTML = "Player Left Won!"
                break;
            case "RightWon":
                box.innerHTML = "Player Right Won!"
                break;
            default:
                box.innerHTML = ""
                break;
        }
    }

    const _hitMissShip = (field) => {

        if (field.ship !== null && field.hit !== null) return "hitShip"  // ship that has been hit
        if (field.ship !== null && field.hit == null) return "ship"  // ship not hit yet
        if (field.miss) return "miss" // water but already hit: miss
        return "water" // just water
    }

    const setPlayerName = (name) => {
        let playerNameDOM = document.getElementById("playerName");
        playerNameDOM.innerHTML = name;
    }

    return {
        renderLeftGameboard (gameboard) {
            renderGameboard(gameboard, gameboardLeft)
        },

        renderRightGameboard (gameboard) {
            renderGameboard(gameboard, gameboardRight, false)
        },

        setUpFieldListenerLeft (callback) {
            setUpFieldListener(gameboardLeft, callback)
        },

        setUpFieldListenerRight (callback) {
            setUpFieldListener(gameboardRight, callback)
        },

        clearLeftGameboard () {
            clearGameboard (gameboardLeft)
        },

        clearRightGameboard () {
            clearGameboard (gameboardRight)
        },

        setPlayerName,
        setUpShuffleListener,
        setStartListener,
        startToRestart,
        unMuteShuffle,
        muteShuffle,
        unMuteStart,
        muteStart,
        unMuteGameboard,
        muteGameboard,
        restartToStart,
        setMessage
    }

})();

export default gameView;