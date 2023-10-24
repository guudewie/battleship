/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller/gameController.js":
/*!******************************************!*\
  !*** ./src/controller/gameController.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _view_gameView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/gameView */ "./src/view/gameView.js");
/* harmony import */ var _factories_computer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factories/computer */ "./src/factories/computer.js");
/* harmony import */ var _factories_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../factories/layout */ "./src/factories/layout.js");
/* harmony import */ var _factories_gameboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../factories/gameboard */ "./src/factories/gameboard.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../game */ "./src/game.js");







// this module combines dom (gameView) and logic functions (factories)
const gameController = (function () {

    const _timeOut = 0;
    
    // real player
    const _makeMoveLeftPlayer = (gameboardLeft, gameboardRight) => {
        
        _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].setUpFieldListenerRight((field) => {

            //set ui message box empty
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].setMessage()

            // dont set up listener if field was already played
            if (!gameboardRight.isValidMove(field.dataset.row, field.dataset.column)) return

            // register attack and render updated gameboard
            gameboardRight.receiveAttack(field.dataset.row, field.dataset.column);
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].clearRightGameboard();
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].renderRightGameboard(gameboardRight);

            // return if game is over
            if (gameboardRight.gameboardLost() == true) {
                _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].setMessage("LeftWon")
                _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].muteGameboard() // make gameboard not playable
            }

            // initiate next move
            gameboardRight.getLastHit() ?
            _makeMoveLeftPlayer(gameboardLeft, gameboardRight) :
            setTimeout(() => _makeMoveRightPlayer(gameboardLeft, gameboardRight), _timeOut);
        })
    }

    // computer player
    const _makeMoveRightPlayer = (gameboardLeft, gameboardRight) => {

        let computerChoice = _factories_computer__WEBPACK_IMPORTED_MODULE_1__["default"].getRandomMove(gameboardLeft);

        while (!gameboardLeft.isValidMove(computerChoice[0], computerChoice[1])) {
            computerChoice = _factories_computer__WEBPACK_IMPORTED_MODULE_1__["default"].getRandomMove(gameboardLeft);
        }

        // register attack and render updated gameboard
        gameboardLeft.receiveAttack(computerChoice[0], computerChoice[1]);
        _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].clearLeftGameboard();
        _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].renderLeftGameboard(gameboardLeft);

        // return if game is over
        if (gameboardLeft.gameboardLost() == true) {
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].setMessage("RightWon")
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].muteGameboard() // make gameboard not playable
        }

        // initiate next move
        gameboardLeft.getLastHit() ?
        setTimeout(() => _makeMoveRightPlayer(gameboardLeft, gameboardRight), _timeOut):
        _makeMoveLeftPlayer(gameboardLeft, gameboardRight);
        
    }

    // the functions makemoveplayer recursively call each other inside another untill the win condition stops the game
    const startMoves = (gameboardLeft, gameboardRight) => {
        _makeMoveLeftPlayer(gameboardLeft, gameboardRight)
    }

    const shuffleLayout = () => {
        _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].setUpShuffleListener(() => {

            // clear previous boat layout
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].clearLeftGameboard()

            // create new Gameboard object with random boat layout
            const newGameboardL = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_3__["default"])()
            const playerName = _factories_layout__WEBPACK_IMPORTED_MODULE_2__["default"].applyLayout(newGameboardL)
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].setPlayerName(playerName) // set respective name in UI
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].renderLeftGameboard(newGameboardL)

            // save latest gameboard to storage
            currentGameboardL = newGameboardL;

            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].unMuteStart() // make start button available again
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].unMuteGameboard() // make gameboard playable available again
        })
    }

    const startGame = (gameboardR) => {

        _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].setStartListener(() => {

            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].unMuteStart()

            //set ui message, that left attacs first
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].setMessage("LeftStart")

            // initialize game with shuffled gameboard
            let newGameboardL = getCurrentGameboardL();
            gameController.startMoves(newGameboardL, gameboardR)

            // deactivate shuffle button
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].muteShuffle()

            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].startToRestart(() => {
                _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].muteStart()
                _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].clearLeftGameboard()
                _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].clearRightGameboard()
                _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].unMuteShuffle()
                _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].restartToStart(() => startGame())
                ;(0,_game__WEBPACK_IMPORTED_MODULE_4__.Game)()
            })

        })
    }

    let currentGameboardL;

    const getCurrentGameboardL = () => {
        return currentGameboardL
    }



    return {
        startMoves,
        shuffleLayout,
        getCurrentGameboardL,
        startGame
    }
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameController);


/***/ }),

/***/ "./src/factories/computer.js":
/*!***********************************!*\
  !*** ./src/factories/computer.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Computer);

/***/ }),

/***/ "./src/factories/gameboard.js":
/*!************************************!*\
  !*** ./src/factories/gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/factories/ship.js");


const Gameboard = () => {

    const Field = {
        ship : null,
        hit : null,
        miss : null
    }

    let lastOneWasHit = false;

    const getLastHit = () => {
        return lastOneWasHit
    }

    // create gameboard grid with Field object in each field
    const _createFieldObject = (dim = 10) => {
        let grid = [];
        for (let x = 0; x <= dim - 1; x++) {
            grid.push([])
            for (let y = 0; y <= dim - 1; y++) {
                grid[x].push({...Field})
            }
        }
        return grid
    }

    // initialize grid
    const fields = _createFieldObject();

    const placeShip = (shipLength, coords) => {

        const newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(shipLength)

        for (let coordPair in coords) {
            let xCoord = coords[coordPair][0]
            let yCoord = coords[coordPair][1]
            fields[xCoord][yCoord].ship = newShip;
        }
    }

    const receiveAttack = (x, y) => {

        let attackedField = fields[x][y];

        if (attackedField.ship !== null) {
            attackedField.ship.hit();
            attackedField.hit = true;
            lastOneWasHit = true;
        } else {
            attackedField.miss = true;
            lastOneWasHit = false;
        }
    }

    const gameboardLost = () => {
        for (const row in fields) {
            for (const field in fields[row]) {
                if (fields[row][field].ship !== null && fields[row][field].hit === null) {
                    return false;
                }
            }
        }
        return true;
    }

    const isValidMove = (x, y) => {
        let field = fields[x][y];
        if (field.hit || field.miss) return false

        return true
    }

    return {
        fields,
        placeShip,
        receiveAttack,
        gameboardLost,
        isValidMove,
        getLastHit
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);   

/***/ }),

/***/ "./src/factories/layout.js":
/*!*********************************!*\
  !*** ./src/factories/layout.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Layout = (function () {
    
    const boatLayouts = {
          "The Submarine": [
            [5, [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5]]],
            [4, [[9, 1], [9, 2], [9, 3], [9, 4]]],
            [3, [[2, 4], [3, 4], [4, 4]]],
            [2, [[6, 7], [7, 7]]],
            [2, [[1, 7], [0, 7]]],
          ],
          "The Pirate": [
            [5, [[2, 6], [3, 6], [4, 6], [5, 6], [6, 6]]],
            [4, [[1, 8], [2, 8], [3, 8], [4, 8]]],
            [3, [[6, 9], [7, 9], [8, 9]]],
            [2, [[9, 0], [8, 0]]],
            [2, [[1, 1], [1, 2]]],
          ],
          "The Duck": [
            [5, [[1, 3], [2, 3], [3, 3], [4, 3], [5, 3]]],
            [4, [[8, 1], [8, 2], [8, 3], [8, 4]]],
            [3, [[6, 5], [6, 6], [6, 7]]],
            [2, [[9, 9], [8, 9]]],
            [2, [[3, 7], [4, 7]]]
          ],
          "The Spaceship": [
            [5, [[2, 7], [3, 7], [4, 7], [5, 7], [6, 7]]],
            [4, [[8, 4], [8, 5], [8, 6], [8, 7]]],
            [3, [[0, 0], [1, 0], [2, 0]]],
            [2, [[7, 1], [7, 2]]],
            [2, [[9, 2], [9, 3]]]
          ],
          "The Rubber Boat": [
            [5, [[3, 1], [4, 1], [5, 1], [6, 1], [7, 1]]],
            [4, [[0, 3], [0, 4], [0, 5], [0, 6]]],
            [3, [[2, 3], [2, 4], [2, 5]]],
            [2, [[5, 6], [6, 6]]],
            [2, [[9, 8], [9, 9]]]
          ],
          "The Yacht": [
            [5, [[9, 7], [8, 7], [7, 7], [6, 7], [5, 7]]],
            [4, [[1, 5], [1, 6], [1, 7], [1, 8]]],
            [3, [[3, 4], [4, 4], [5, 4]]],
            [2, [[4, 9], [5, 9]]],
            [2, [[7, 2], [8, 2]]]
          ],
          "The Galleon": [
            [5, [[6, 1], [6, 2], [6, 3], [6, 4], [6, 5]]],
            [4, [[9, 3], [9, 4], [9, 5], [9, 6]]],
            [3, [[2, 6], [3, 6], [4, 6]]],
            [2, [[8, 9], [9, 9]]],
            [2, [[0, 0], [1, 0]]]
          ]
      };
    
    const _getRandomLayout = () => {
        let name = Object.keys(boatLayouts)[Math.floor(Math.random() * 7)];
        let layout = boatLayouts[name];

        return {
            name : name,
            layout : layout
        }
    }

    const applyLayout = (gameboard) => {

        let randomChoice = _getRandomLayout();
        let funnyName = randomChoice.name;
        let layout = randomChoice.layout;
        for (let i = 0; i < layout.length; i++) {
            let ship = layout[i];
            
            gameboard.placeShip(ship[0], ship[1])
        }

        return funnyName
    }
    
    return {
        applyLayout
    }


})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/factories/ship.js":
/*!*******************************!*\
  !*** ./src/factories/ship.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Ship = ( units ) => {

    const length = units;

    let hits = 0;

    const getHits = () => hits

    const hit = () => {
        if (isSunk()) {
            throw new Error("Ship already sunk")
        } else {
            hits++
        }
    }

    const isSunk = () => getHits() == length ? true : false
 
    return {
        length,
        hit,
        getHits,
        isSunk
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Game: () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _factories_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/gameboard */ "./src/factories/gameboard.js");
/* harmony import */ var _view_gameView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/gameView */ "./src/view/gameView.js");
/* harmony import */ var _controller_gameController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller/gameController */ "./src/controller/gameController.js");
/* harmony import */ var _factories_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factories/layout */ "./src/factories/layout.js");





function Game () {

    _view_gameView__WEBPACK_IMPORTED_MODULE_1__["default"].setMessage("init")

    // initialize gameboard L
    const gameboardL = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])()
    _view_gameView__WEBPACK_IMPORTED_MODULE_1__["default"].setPlayerName(_factories_layout__WEBPACK_IMPORTED_MODULE_3__["default"].applyLayout(gameboardL))
    _view_gameView__WEBPACK_IMPORTED_MODULE_1__["default"].renderLeftGameboard(gameboardL)

    // initialize gameboard R
    const gameboardR = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])()
    _factories_layout__WEBPACK_IMPORTED_MODULE_3__["default"].applyLayout(gameboardR)
    _view_gameView__WEBPACK_IMPORTED_MODULE_1__["default"].renderRightGameboard(gameboardR)

    // initialize shuffle button listener and logic
    _controller_gameController__WEBPACK_IMPORTED_MODULE_2__["default"].shuffleLayout()

    // initialize start button listener and logic
    _controller_gameController__WEBPACK_IMPORTED_MODULE_2__["default"].startGame(gameboardR)
};

/***/ }),

/***/ "./src/view/gameView.js":
/*!******************************!*\
  !*** ./src/view/gameView.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameView);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");


(0,_game__WEBPACK_IMPORTED_MODULE_0__.Game)()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSx3QkFBd0Isc0JBQXNCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVELGlFQUFlLFFBQVE7Ozs7OztVQ3JMdkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ042Qjs7QUFFN0IsMkNBQUksRSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29udHJvbGxlci9nYW1lQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jb21wdXRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvbGF5b3V0LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlldy9nYW1lVmlldy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2FtZVZpZXcgZnJvbSBcIi4uL3ZpZXcvZ2FtZVZpZXdcIjtcbmltcG9ydCBDb21wdXRlciBmcm9tIFwiLi4vZmFjdG9yaWVzL2NvbXB1dGVyXCI7XG5pbXBvcnQgTGF5b3V0IGZyb20gXCIuLi9mYWN0b3JpZXMvbGF5b3V0XCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuLi9mYWN0b3JpZXMvZ2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4uL2dhbWVcIjtcblxuXG4vLyB0aGlzIG1vZHVsZSBjb21iaW5lcyBkb20gKGdhbWVWaWV3KSBhbmQgbG9naWMgZnVuY3Rpb25zIChmYWN0b3JpZXMpXG5jb25zdCBnYW1lQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBfdGltZU91dCA9IDA7XG4gICAgXG4gICAgLy8gcmVhbCBwbGF5ZXJcbiAgICBjb25zdCBfbWFrZU1vdmVMZWZ0UGxheWVyID0gKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KSA9PiB7XG4gICAgICAgIFxuICAgICAgICBnYW1lVmlldy5zZXRVcEZpZWxkTGlzdGVuZXJSaWdodCgoZmllbGQpID0+IHtcblxuICAgICAgICAgICAgLy9zZXQgdWkgbWVzc2FnZSBib3ggZW1wdHlcbiAgICAgICAgICAgIGdhbWVWaWV3LnNldE1lc3NhZ2UoKVxuXG4gICAgICAgICAgICAvLyBkb250IHNldCB1cCBsaXN0ZW5lciBpZiBmaWVsZCB3YXMgYWxyZWFkeSBwbGF5ZWRcbiAgICAgICAgICAgIGlmICghZ2FtZWJvYXJkUmlnaHQuaXNWYWxpZE1vdmUoZmllbGQuZGF0YXNldC5yb3csIGZpZWxkLmRhdGFzZXQuY29sdW1uKSkgcmV0dXJuXG5cbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIGF0dGFjayBhbmQgcmVuZGVyIHVwZGF0ZWQgZ2FtZWJvYXJkXG4gICAgICAgICAgICBnYW1lYm9hcmRSaWdodC5yZWNlaXZlQXR0YWNrKGZpZWxkLmRhdGFzZXQucm93LCBmaWVsZC5kYXRhc2V0LmNvbHVtbik7XG4gICAgICAgICAgICBnYW1lVmlldy5jbGVhclJpZ2h0R2FtZWJvYXJkKCk7XG4gICAgICAgICAgICBnYW1lVmlldy5yZW5kZXJSaWdodEdhbWVib2FyZChnYW1lYm9hcmRSaWdodCk7XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBpZiBnYW1lIGlzIG92ZXJcbiAgICAgICAgICAgIGlmIChnYW1lYm9hcmRSaWdodC5nYW1lYm9hcmRMb3N0KCkgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGdhbWVWaWV3LnNldE1lc3NhZ2UoXCJMZWZ0V29uXCIpXG4gICAgICAgICAgICAgICAgZ2FtZVZpZXcubXV0ZUdhbWVib2FyZCgpIC8vIG1ha2UgZ2FtZWJvYXJkIG5vdCBwbGF5YWJsZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpbml0aWF0ZSBuZXh0IG1vdmVcbiAgICAgICAgICAgIGdhbWVib2FyZFJpZ2h0LmdldExhc3RIaXQoKSA/XG4gICAgICAgICAgICBfbWFrZU1vdmVMZWZ0UGxheWVyKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KSA6XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IF9tYWtlTW92ZVJpZ2h0UGxheWVyKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KSwgX3RpbWVPdXQpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vIGNvbXB1dGVyIHBsYXllclxuICAgIGNvbnN0IF9tYWtlTW92ZVJpZ2h0UGxheWVyID0gKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KSA9PiB7XG5cbiAgICAgICAgbGV0IGNvbXB1dGVyQ2hvaWNlID0gQ29tcHV0ZXIuZ2V0UmFuZG9tTW92ZShnYW1lYm9hcmRMZWZ0KTtcblxuICAgICAgICB3aGlsZSAoIWdhbWVib2FyZExlZnQuaXNWYWxpZE1vdmUoY29tcHV0ZXJDaG9pY2VbMF0sIGNvbXB1dGVyQ2hvaWNlWzFdKSkge1xuICAgICAgICAgICAgY29tcHV0ZXJDaG9pY2UgPSBDb21wdXRlci5nZXRSYW5kb21Nb3ZlKGdhbWVib2FyZExlZnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVnaXN0ZXIgYXR0YWNrIGFuZCByZW5kZXIgdXBkYXRlZCBnYW1lYm9hcmRcbiAgICAgICAgZ2FtZWJvYXJkTGVmdC5yZWNlaXZlQXR0YWNrKGNvbXB1dGVyQ2hvaWNlWzBdLCBjb21wdXRlckNob2ljZVsxXSk7XG4gICAgICAgIGdhbWVWaWV3LmNsZWFyTGVmdEdhbWVib2FyZCgpO1xuICAgICAgICBnYW1lVmlldy5yZW5kZXJMZWZ0R2FtZWJvYXJkKGdhbWVib2FyZExlZnQpO1xuXG4gICAgICAgIC8vIHJldHVybiBpZiBnYW1lIGlzIG92ZXJcbiAgICAgICAgaWYgKGdhbWVib2FyZExlZnQuZ2FtZWJvYXJkTG9zdCgpID09IHRydWUpIHtcbiAgICAgICAgICAgIGdhbWVWaWV3LnNldE1lc3NhZ2UoXCJSaWdodFdvblwiKVxuICAgICAgICAgICAgZ2FtZVZpZXcubXV0ZUdhbWVib2FyZCgpIC8vIG1ha2UgZ2FtZWJvYXJkIG5vdCBwbGF5YWJsZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaW5pdGlhdGUgbmV4dCBtb3ZlXG4gICAgICAgIGdhbWVib2FyZExlZnQuZ2V0TGFzdEhpdCgpID9cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBfbWFrZU1vdmVSaWdodFBsYXllcihnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodCksIF90aW1lT3V0KTpcbiAgICAgICAgX21ha2VNb3ZlTGVmdFBsYXllcihnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodCk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vIHRoZSBmdW5jdGlvbnMgbWFrZW1vdmVwbGF5ZXIgcmVjdXJzaXZlbHkgY2FsbCBlYWNoIG90aGVyIGluc2lkZSBhbm90aGVyIHVudGlsbCB0aGUgd2luIGNvbmRpdGlvbiBzdG9wcyB0aGUgZ2FtZVxuICAgIGNvbnN0IHN0YXJ0TW92ZXMgPSAoZ2FtZWJvYXJkTGVmdCwgZ2FtZWJvYXJkUmlnaHQpID0+IHtcbiAgICAgICAgX21ha2VNb3ZlTGVmdFBsYXllcihnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodClcbiAgICB9XG5cbiAgICBjb25zdCBzaHVmZmxlTGF5b3V0ID0gKCkgPT4ge1xuICAgICAgICBnYW1lVmlldy5zZXRVcFNodWZmbGVMaXN0ZW5lcigoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIGNsZWFyIHByZXZpb3VzIGJvYXQgbGF5b3V0XG4gICAgICAgICAgICBnYW1lVmlldy5jbGVhckxlZnRHYW1lYm9hcmQoKVxuXG4gICAgICAgICAgICAvLyBjcmVhdGUgbmV3IEdhbWVib2FyZCBvYmplY3Qgd2l0aCByYW5kb20gYm9hdCBsYXlvdXRcbiAgICAgICAgICAgIGNvbnN0IG5ld0dhbWVib2FyZEwgPSBHYW1lYm9hcmQoKVxuICAgICAgICAgICAgY29uc3QgcGxheWVyTmFtZSA9IExheW91dC5hcHBseUxheW91dChuZXdHYW1lYm9hcmRMKVxuICAgICAgICAgICAgZ2FtZVZpZXcuc2V0UGxheWVyTmFtZShwbGF5ZXJOYW1lKSAvLyBzZXQgcmVzcGVjdGl2ZSBuYW1lIGluIFVJXG4gICAgICAgICAgICBnYW1lVmlldy5yZW5kZXJMZWZ0R2FtZWJvYXJkKG5ld0dhbWVib2FyZEwpXG5cbiAgICAgICAgICAgIC8vIHNhdmUgbGF0ZXN0IGdhbWVib2FyZCB0byBzdG9yYWdlXG4gICAgICAgICAgICBjdXJyZW50R2FtZWJvYXJkTCA9IG5ld0dhbWVib2FyZEw7XG5cbiAgICAgICAgICAgIGdhbWVWaWV3LnVuTXV0ZVN0YXJ0KCkgLy8gbWFrZSBzdGFydCBidXR0b24gYXZhaWxhYmxlIGFnYWluXG4gICAgICAgICAgICBnYW1lVmlldy51bk11dGVHYW1lYm9hcmQoKSAvLyBtYWtlIGdhbWVib2FyZCBwbGF5YWJsZSBhdmFpbGFibGUgYWdhaW5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBzdGFydEdhbWUgPSAoZ2FtZWJvYXJkUikgPT4ge1xuXG4gICAgICAgIGdhbWVWaWV3LnNldFN0YXJ0TGlzdGVuZXIoKCkgPT4ge1xuXG4gICAgICAgICAgICBnYW1lVmlldy51bk11dGVTdGFydCgpXG5cbiAgICAgICAgICAgIC8vc2V0IHVpIG1lc3NhZ2UsIHRoYXQgbGVmdCBhdHRhY3MgZmlyc3RcbiAgICAgICAgICAgIGdhbWVWaWV3LnNldE1lc3NhZ2UoXCJMZWZ0U3RhcnRcIilcblxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSBnYW1lIHdpdGggc2h1ZmZsZWQgZ2FtZWJvYXJkXG4gICAgICAgICAgICBsZXQgbmV3R2FtZWJvYXJkTCA9IGdldEN1cnJlbnRHYW1lYm9hcmRMKCk7XG4gICAgICAgICAgICBnYW1lQ29udHJvbGxlci5zdGFydE1vdmVzKG5ld0dhbWVib2FyZEwsIGdhbWVib2FyZFIpXG5cbiAgICAgICAgICAgIC8vIGRlYWN0aXZhdGUgc2h1ZmZsZSBidXR0b25cbiAgICAgICAgICAgIGdhbWVWaWV3Lm11dGVTaHVmZmxlKClcblxuICAgICAgICAgICAgZ2FtZVZpZXcuc3RhcnRUb1Jlc3RhcnQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGdhbWVWaWV3Lm11dGVTdGFydCgpXG4gICAgICAgICAgICAgICAgZ2FtZVZpZXcuY2xlYXJMZWZ0R2FtZWJvYXJkKClcbiAgICAgICAgICAgICAgICBnYW1lVmlldy5jbGVhclJpZ2h0R2FtZWJvYXJkKClcbiAgICAgICAgICAgICAgICBnYW1lVmlldy51bk11dGVTaHVmZmxlKClcbiAgICAgICAgICAgICAgICBnYW1lVmlldy5yZXN0YXJ0VG9TdGFydCgoKSA9PiBzdGFydEdhbWUoKSlcbiAgICAgICAgICAgICAgICBHYW1lKClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBsZXQgY3VycmVudEdhbWVib2FyZEw7XG5cbiAgICBjb25zdCBnZXRDdXJyZW50R2FtZWJvYXJkTCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRHYW1lYm9hcmRMXG4gICAgfVxuXG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0TW92ZXMsXG4gICAgICAgIHNodWZmbGVMYXlvdXQsXG4gICAgICAgIGdldEN1cnJlbnRHYW1lYm9hcmRMLFxuICAgICAgICBzdGFydEdhbWVcbiAgICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lQ29udHJvbGxlcjtcbiIsImNvbnN0IENvbXB1dGVyID0gKCgpID0+IHtcblxuICAgIGxldCBoaXRTdG9yYWdlID0gW107XG4gICAgbGV0IG5leHRIaXRRdWV1ZSA9IFtdO1xuXG4gICAgY29uc3QgZ2V0SGl0U3RvcmFnZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGhpdFN0b3JhZ2VcbiAgICB9XG5cbiAgICBjb25zdCBnZXROZXh0SGl0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV4dEhpdFF1ZXVlXG4gICAgfVxuXG4gICAgY29uc3QgX3NhdmVIaXRUb1N0b3JhZ2UgPSAoZ2FtZWJvYXJkLCB4LCB5KSA9PiB7XG5cbiAgICAgICAgbGV0IGZpZWxkID0gZ2FtZWJvYXJkLmZpZWxkc1t4XVt5XVxuXG4gICAgICAgIGlmIChmaWVsZC5zaGlwID09IG51bGwpIHJldHVyblxuICAgICAgICBcbiAgICAgICAgaGl0U3RvcmFnZS5wdXNoKFsgeCwgeSBdKVxuXG4gICAgICAgIGlmICh4LTEgPj0gMCAmJiB4KzEgPD0gOSkge1xuICAgICAgICAgICAgbmV4dEhpdFF1ZXVlLnB1c2goWyB4LTEgLCB5IF0pXG4gICAgICAgICAgICBuZXh0SGl0UXVldWUucHVzaChbIHgrMSAsIHkgXSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoeS0xID49IDAgJiYgeSsxIDw9IDkpIHtcbiAgICAgICAgICAgIG5leHRIaXRRdWV1ZS5wdXNoKFsgeCAsIHktMSBdKVxuICAgICAgICAgICAgbmV4dEhpdFF1ZXVlLnB1c2goWyB4ICwgeSsxIF0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBnZXRSYW5kb21Nb3ZlID0gKGdhbWVib2FyZCkgPT4ge1xuXG4gICAgICAgIC8vIGdldCBcInNtYXJ0XCIgbW92ZVxuICAgICAgICBpZiAoZ2V0TmV4dEhpdCgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBnZXROZXh0SGl0KCkucG9wKClcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgICAgICBfc2F2ZUhpdFRvU3RvcmFnZShnYW1lYm9hcmQsIHgsIHkpXG5cbiAgICAgICAgcmV0dXJuIFt4LHldXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0UmFuZG9tTW92ZVxuICAgIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IENvbXB1dGVyOyIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuXG4gICAgY29uc3QgRmllbGQgPSB7XG4gICAgICAgIHNoaXAgOiBudWxsLFxuICAgICAgICBoaXQgOiBudWxsLFxuICAgICAgICBtaXNzIDogbnVsbFxuICAgIH1cblxuICAgIGxldCBsYXN0T25lV2FzSGl0ID0gZmFsc2U7XG5cbiAgICBjb25zdCBnZXRMYXN0SGl0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gbGFzdE9uZVdhc0hpdFxuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBnYW1lYm9hcmQgZ3JpZCB3aXRoIEZpZWxkIG9iamVjdCBpbiBlYWNoIGZpZWxkXG4gICAgY29uc3QgX2NyZWF0ZUZpZWxkT2JqZWN0ID0gKGRpbSA9IDEwKSA9PiB7XG4gICAgICAgIGxldCBncmlkID0gW107XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDw9IGRpbSAtIDE7IHgrKykge1xuICAgICAgICAgICAgZ3JpZC5wdXNoKFtdKVxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gZGltIC0gMTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZ3JpZFt4XS5wdXNoKHsuLi5GaWVsZH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdyaWRcbiAgICB9XG5cbiAgICAvLyBpbml0aWFsaXplIGdyaWRcbiAgICBjb25zdCBmaWVsZHMgPSBfY3JlYXRlRmllbGRPYmplY3QoKTtcblxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwTGVuZ3RoLCBjb29yZHMpID0+IHtcblxuICAgICAgICBjb25zdCBuZXdTaGlwID0gU2hpcChzaGlwTGVuZ3RoKVxuXG4gICAgICAgIGZvciAobGV0IGNvb3JkUGFpciBpbiBjb29yZHMpIHtcbiAgICAgICAgICAgIGxldCB4Q29vcmQgPSBjb29yZHNbY29vcmRQYWlyXVswXVxuICAgICAgICAgICAgbGV0IHlDb29yZCA9IGNvb3Jkc1tjb29yZFBhaXJdWzFdXG4gICAgICAgICAgICBmaWVsZHNbeENvb3JkXVt5Q29vcmRdLnNoaXAgPSBuZXdTaGlwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG5cbiAgICAgICAgbGV0IGF0dGFja2VkRmllbGQgPSBmaWVsZHNbeF1beV07XG5cbiAgICAgICAgaWYgKGF0dGFja2VkRmllbGQuc2hpcCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgYXR0YWNrZWRGaWVsZC5zaGlwLmhpdCgpO1xuICAgICAgICAgICAgYXR0YWNrZWRGaWVsZC5oaXQgPSB0cnVlO1xuICAgICAgICAgICAgbGFzdE9uZVdhc0hpdCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhdHRhY2tlZEZpZWxkLm1pc3MgPSB0cnVlO1xuICAgICAgICAgICAgbGFzdE9uZVdhc0hpdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZ2FtZWJvYXJkTG9zdCA9ICgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCByb3cgaW4gZmllbGRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkIGluIGZpZWxkc1tyb3ddKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkc1tyb3ddW2ZpZWxkXS5zaGlwICE9PSBudWxsICYmIGZpZWxkc1tyb3ddW2ZpZWxkXS5oaXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBpc1ZhbGlkTW92ZSA9ICh4LCB5KSA9PiB7XG4gICAgICAgIGxldCBmaWVsZCA9IGZpZWxkc1t4XVt5XTtcbiAgICAgICAgaWYgKGZpZWxkLmhpdCB8fCBmaWVsZC5taXNzKSByZXR1cm4gZmFsc2VcblxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGZpZWxkcyxcbiAgICAgICAgcGxhY2VTaGlwLFxuICAgICAgICByZWNlaXZlQXR0YWNrLFxuICAgICAgICBnYW1lYm9hcmRMb3N0LFxuICAgICAgICBpc1ZhbGlkTW92ZSxcbiAgICAgICAgZ2V0TGFzdEhpdFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkOyAgICIsImNvbnN0IExheW91dCA9IChmdW5jdGlvbiAoKSB7XG4gICAgXG4gICAgY29uc3QgYm9hdExheW91dHMgPSB7XG4gICAgICAgICAgXCJUaGUgU3VibWFyaW5lXCI6IFtcbiAgICAgICAgICAgIFs1LCBbWzcsIDFdLCBbNywgMl0sIFs3LCAzXSwgWzcsIDRdLCBbNywgNV1dXSxcbiAgICAgICAgICAgIFs0LCBbWzksIDFdLCBbOSwgMl0sIFs5LCAzXSwgWzksIDRdXV0sXG4gICAgICAgICAgICBbMywgW1syLCA0XSwgWzMsIDRdLCBbNCwgNF1dXSxcbiAgICAgICAgICAgIFsyLCBbWzYsIDddLCBbNywgN11dXSxcbiAgICAgICAgICAgIFsyLCBbWzEsIDddLCBbMCwgN11dXSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiVGhlIFBpcmF0ZVwiOiBbXG4gICAgICAgICAgICBbNSwgW1syLCA2XSwgWzMsIDZdLCBbNCwgNl0sIFs1LCA2XSwgWzYsIDZdXV0sXG4gICAgICAgICAgICBbNCwgW1sxLCA4XSwgWzIsIDhdLCBbMywgOF0sIFs0LCA4XV1dLFxuICAgICAgICAgICAgWzMsIFtbNiwgOV0sIFs3LCA5XSwgWzgsIDldXV0sXG4gICAgICAgICAgICBbMiwgW1s5LCAwXSwgWzgsIDBdXV0sXG4gICAgICAgICAgICBbMiwgW1sxLCAxXSwgWzEsIDJdXV0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIlRoZSBEdWNrXCI6IFtcbiAgICAgICAgICAgIFs1LCBbWzEsIDNdLCBbMiwgM10sIFszLCAzXSwgWzQsIDNdLCBbNSwgM11dXSxcbiAgICAgICAgICAgIFs0LCBbWzgsIDFdLCBbOCwgMl0sIFs4LCAzXSwgWzgsIDRdXV0sXG4gICAgICAgICAgICBbMywgW1s2LCA1XSwgWzYsIDZdLCBbNiwgN11dXSxcbiAgICAgICAgICAgIFsyLCBbWzksIDldLCBbOCwgOV1dXSxcbiAgICAgICAgICAgIFsyLCBbWzMsIDddLCBbNCwgN11dXVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJUaGUgU3BhY2VzaGlwXCI6IFtcbiAgICAgICAgICAgIFs1LCBbWzIsIDddLCBbMywgN10sIFs0LCA3XSwgWzUsIDddLCBbNiwgN11dXSxcbiAgICAgICAgICAgIFs0LCBbWzgsIDRdLCBbOCwgNV0sIFs4LCA2XSwgWzgsIDddXV0sXG4gICAgICAgICAgICBbMywgW1swLCAwXSwgWzEsIDBdLCBbMiwgMF1dXSxcbiAgICAgICAgICAgIFsyLCBbWzcsIDFdLCBbNywgMl1dXSxcbiAgICAgICAgICAgIFsyLCBbWzksIDJdLCBbOSwgM11dXVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJUaGUgUnViYmVyIEJvYXRcIjogW1xuICAgICAgICAgICAgWzUsIFtbMywgMV0sIFs0LCAxXSwgWzUsIDFdLCBbNiwgMV0sIFs3LCAxXV1dLFxuICAgICAgICAgICAgWzQsIFtbMCwgM10sIFswLCA0XSwgWzAsIDVdLCBbMCwgNl1dXSxcbiAgICAgICAgICAgIFszLCBbWzIsIDNdLCBbMiwgNF0sIFsyLCA1XV1dLFxuICAgICAgICAgICAgWzIsIFtbNSwgNl0sIFs2LCA2XV1dLFxuICAgICAgICAgICAgWzIsIFtbOSwgOF0sIFs5LCA5XV1dXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIlRoZSBZYWNodFwiOiBbXG4gICAgICAgICAgICBbNSwgW1s5LCA3XSwgWzgsIDddLCBbNywgN10sIFs2LCA3XSwgWzUsIDddXV0sXG4gICAgICAgICAgICBbNCwgW1sxLCA1XSwgWzEsIDZdLCBbMSwgN10sIFsxLCA4XV1dLFxuICAgICAgICAgICAgWzMsIFtbMywgNF0sIFs0LCA0XSwgWzUsIDRdXV0sXG4gICAgICAgICAgICBbMiwgW1s0LCA5XSwgWzUsIDldXV0sXG4gICAgICAgICAgICBbMiwgW1s3LCAyXSwgWzgsIDJdXV1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiVGhlIEdhbGxlb25cIjogW1xuICAgICAgICAgICAgWzUsIFtbNiwgMV0sIFs2LCAyXSwgWzYsIDNdLCBbNiwgNF0sIFs2LCA1XV1dLFxuICAgICAgICAgICAgWzQsIFtbOSwgM10sIFs5LCA0XSwgWzksIDVdLCBbOSwgNl1dXSxcbiAgICAgICAgICAgIFszLCBbWzIsIDZdLCBbMywgNl0sIFs0LCA2XV1dLFxuICAgICAgICAgICAgWzIsIFtbOCwgOV0sIFs5LCA5XV1dLFxuICAgICAgICAgICAgWzIsIFtbMCwgMF0sIFsxLCAwXV1dXG4gICAgICAgICAgXVxuICAgICAgfTtcbiAgICBcbiAgICBjb25zdCBfZ2V0UmFuZG9tTGF5b3V0ID0gKCkgPT4ge1xuICAgICAgICBsZXQgbmFtZSA9IE9iamVjdC5rZXlzKGJvYXRMYXlvdXRzKVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA3KV07XG4gICAgICAgIGxldCBsYXlvdXQgPSBib2F0TGF5b3V0c1tuYW1lXTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZSA6IG5hbWUsXG4gICAgICAgICAgICBsYXlvdXQgOiBsYXlvdXRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFwcGx5TGF5b3V0ID0gKGdhbWVib2FyZCkgPT4ge1xuXG4gICAgICAgIGxldCByYW5kb21DaG9pY2UgPSBfZ2V0UmFuZG9tTGF5b3V0KCk7XG4gICAgICAgIGxldCBmdW5ueU5hbWUgPSByYW5kb21DaG9pY2UubmFtZTtcbiAgICAgICAgbGV0IGxheW91dCA9IHJhbmRvbUNob2ljZS5sYXlvdXQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5b3V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc2hpcCA9IGxheW91dFtpXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwWzBdLCBzaGlwWzFdKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bm55TmFtZVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICBhcHBseUxheW91dFxuICAgIH1cblxuXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBMYXlvdXQ7IiwiY29uc3QgU2hpcCA9ICggdW5pdHMgKSA9PiB7XG5cbiAgICBjb25zdCBsZW5ndGggPSB1bml0cztcblxuICAgIGxldCBoaXRzID0gMDtcblxuICAgIGNvbnN0IGdldEhpdHMgPSAoKSA9PiBoaXRzXG5cbiAgICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChpc1N1bmsoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBhbHJlYWR5IHN1bmtcIilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhpdHMrK1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4gZ2V0SGl0cygpID09IGxlbmd0aCA/IHRydWUgOiBmYWxzZVxuIFxuICAgIHJldHVybiB7XG4gICAgICAgIGxlbmd0aCxcbiAgICAgICAgaGl0LFxuICAgICAgICBnZXRIaXRzLFxuICAgICAgICBpc1N1bmtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2ZhY3Rvcmllcy9nYW1lYm9hcmRcIlxuaW1wb3J0IGdhbWVWaWV3IGZyb20gXCIuL3ZpZXcvZ2FtZVZpZXdcIlxuaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXIvZ2FtZUNvbnRyb2xsZXJcIlxuaW1wb3J0IExheW91dCBmcm9tIFwiLi9mYWN0b3JpZXMvbGF5b3V0XCJcblxuZXhwb3J0IGZ1bmN0aW9uIEdhbWUgKCkge1xuXG4gICAgZ2FtZVZpZXcuc2V0TWVzc2FnZShcImluaXRcIilcblxuICAgIC8vIGluaXRpYWxpemUgZ2FtZWJvYXJkIExcbiAgICBjb25zdCBnYW1lYm9hcmRMID0gR2FtZWJvYXJkKClcbiAgICBnYW1lVmlldy5zZXRQbGF5ZXJOYW1lKExheW91dC5hcHBseUxheW91dChnYW1lYm9hcmRMKSlcbiAgICBnYW1lVmlldy5yZW5kZXJMZWZ0R2FtZWJvYXJkKGdhbWVib2FyZEwpXG5cbiAgICAvLyBpbml0aWFsaXplIGdhbWVib2FyZCBSXG4gICAgY29uc3QgZ2FtZWJvYXJkUiA9IEdhbWVib2FyZCgpXG4gICAgTGF5b3V0LmFwcGx5TGF5b3V0KGdhbWVib2FyZFIpXG4gICAgZ2FtZVZpZXcucmVuZGVyUmlnaHRHYW1lYm9hcmQoZ2FtZWJvYXJkUilcblxuICAgIC8vIGluaXRpYWxpemUgc2h1ZmZsZSBidXR0b24gbGlzdGVuZXIgYW5kIGxvZ2ljXG4gICAgZ2FtZUNvbnRyb2xsZXIuc2h1ZmZsZUxheW91dCgpXG5cbiAgICAvLyBpbml0aWFsaXplIHN0YXJ0IGJ1dHRvbiBsaXN0ZW5lciBhbmQgbG9naWNcbiAgICBnYW1lQ29udHJvbGxlci5zdGFydEdhbWUoZ2FtZWJvYXJkUilcbn07IiwiXG5cbi8vIHJlbmRlciBnYW1lYm9hcmQgKGdhbWVib2FyZC5maWVsZHMsIHZpc2libGUgPSB0cnVlKVxuXG5jb25zdCBnYW1lVmlldyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBnYW1lYm9hcmRMZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lYm9hcmRPbmVcIik7XG4gICAgY29uc3QgZ2FtZWJvYXJkUmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVib2FyZFR3b1wiKVxuXG4gICAgY29uc3QgcmVuZGVyR2FtZWJvYXJkID0gKGdhbWVib2FyZCwgZ2FtZWJvYXJkRWxlbWVudCwgdmlzaWJsZSA9IHRydWUpID0+IHtcblxuICAgICAgICAvLyBpdGVyYXRlIHRocm91Z2ggYWxsIGZpZWxkcyBvZiBhIGdhbWVib2FyZFxuICAgICAgICBmb3IgKGNvbnN0IHJvdyBpbiBnYW1lYm9hcmQuZmllbGRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkIGluIGdhbWVib2FyZC5maWVsZHNbcm93XSkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBjZWxsIGRvbSBlbGVtZW50XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgZmllbGQgY2xhc3MgYW5kIGFwcHJvcHJpYXRlIGZpZWxkIHN0YXRlIHN0eWxpbmdcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJmaWVsZFwiLCBfaGl0TWlzc1NoaXAoZ2FtZWJvYXJkLmZpZWxkc1tyb3ddW2ZpZWxkXSkpXG4gICAgICAgICAgICAgICAgaWYgKCF2aXNpYmxlKSBjZWxsLmNsYXNzTGlzdC5hZGQoXCJpbnZpc2libGVcIilcblxuICAgICAgICAgICAgICAgIC8vIGFkZCBkYXRhIHJvdyBhbmQgY29sdW1uIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICAgICAgICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiA9IGZpZWxkXG5cbiAgICAgICAgICAgICAgICAvLyBhcHBlbmQgZmllbGQgdG8gZ2FtZWJvYXJkXG4gICAgICAgICAgICAgICAgZ2FtZWJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChjZWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJHYW1lYm9hcmQgPSAoZ2FtZWJvYXJkRWxlbWVudCkgPT4ge1xuICAgICAgICAvLyBsb29rdXAgZmlyc3QgY2hpbGQgYW5kIGRlbGV0ZSBsYXN0IGNoaWxkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zXG4gICAgICAgIHdoaWxlIChnYW1lYm9hcmRFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGdhbWVib2FyZEVsZW1lbnQucmVtb3ZlQ2hpbGQoZ2FtZWJvYXJkRWxlbWVudC5sYXN0Q2hpbGQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRVcEZpZWxkTGlzdGVuZXIgPSAoZ2FtZWJvYXJkRWxlbWVudCwgY2FsbGJhY2spID0+IHtcblxuICAgICAgICBsZXQgY2hpbGREaXZzID0gZ2FtZWJvYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpZWxkXCIpXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZERpdnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBjaGlsZERpdnNbaV07XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjYWxsYmFjayhlbGVtZW50KSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNldFVwU2h1ZmZsZUxpc3RlbmVyID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGxldCBzaHVmZmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaHVmZmxlXCIpXG4gICAgICAgIHNodWZmbGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNhbGxiYWNrKCkpXG4gICAgfVxuXG4gICAgY29uc3QgbXV0ZVNodWZmbGUgPSAoKSA9PiB7XG4gICAgICAgIGxldCBzaHVmZmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaHVmZmxlXCIpXG4gICAgICAgIHNodWZmbGUuY2xhc3NMaXN0LnJlbW92ZShcImJ1dHRvblwiKVxuICAgICAgICBzaHVmZmxlLmNsYXNzTGlzdC5hZGQoXCJtdXRlXCIpXG4gICAgfVxuXG4gICAgY29uc3QgdW5NdXRlU2h1ZmZsZSA9ICgpID0+IHtcbiAgICAgICAgbGV0IHNodWZmbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNodWZmbGVcIilcbiAgICAgICAgc2h1ZmZsZS5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpXG4gICAgICAgIHNodWZmbGUuY2xhc3NMaXN0LnJlbW92ZShcIm11dGVcIilcbiAgICB9XG5cbiAgICBjb25zdCBtdXRlU3RhcnQgPSAoKSA9PiB7XG4gICAgICAgIGxldCBzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIilcbiAgICAgICAgc3RhcnQuY2xhc3NMaXN0LnJlbW92ZShcImJ1dHRvblwiKVxuICAgICAgICBzdGFydC5jbGFzc0xpc3QuYWRkKFwibXV0ZVwiKVxuICAgIH1cblxuICAgIGNvbnN0IHVuTXV0ZVN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICBsZXQgc3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpXG4gICAgICAgIHN0YXJ0LmNsYXNzTGlzdC5hZGQoXCJidXR0b25cIilcbiAgICAgICAgc3RhcnQuY2xhc3NMaXN0LnJlbW92ZShcIm11dGVcIilcbiAgICB9XG5cbiAgICBjb25zdCBtdXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICAgICAgICBnYW1lYm9hcmRMZWZ0LmNsYXNzTGlzdC5hZGQoXCJmaWVsZE11dGVcIilcbiAgICAgICAgZ2FtZWJvYXJkUmlnaHQuY2xhc3NMaXN0LmFkZChcImZpZWxkTXV0ZVwiKVxuICAgIH1cblxuICAgIGNvbnN0IHVuTXV0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgICAgICAgZ2FtZWJvYXJkTGVmdC5jbGFzc0xpc3QucmVtb3ZlKFwiZmllbGRNdXRlXCIpXG4gICAgICAgIGdhbWVib2FyZFJpZ2h0LmNsYXNzTGlzdC5yZW1vdmUoXCJmaWVsZE11dGVcIilcbiAgICB9XG5cbiAgICBjb25zdCBzZXRTdGFydExpc3RlbmVyID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGxldCBzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIilcbiAgICAgICAgc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNhbGxiYWNrKCkpXG4gICAgfVxuXG4gICAgY29uc3Qgc3RhcnRUb1Jlc3RhcnQgPSAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgbGV0IHN0YXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKVxuICAgICAgICBzdGFydC5pbm5lckhUTUwgPSBcInJlc3RhcnRcIlxuICAgICAgICBzdGFydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2FsbGJhY2soKSlcbiAgICB9XG5cbiAgICBjb25zdCByZXN0YXJ0VG9TdGFydCA9IChjYWxsYmFjaykgPT4ge1xuICAgICAgICBsZXQgc3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpXG4gICAgICAgIHN0YXJ0LmlubmVySFRNTCA9IFwic3RhcnRcIlxuICAgICAgICBzdGFydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2FsbGJhY2soKSlcbiAgICB9XG5cbiAgICBjb25zdCBzZXRNZXNzYWdlID0gKHR5cGUpID0+IHtcbiAgICAgICAgbGV0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYW5ub3VuY2VtZW50XCIpXG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiaW5pdFwiOlxuICAgICAgICAgICAgICAgIGJveC5pbm5lckhUTUwgPSBcIlNodWZmbGUgTGF5b3V0LCB0aGVuIHByZXNzIHN0YXJ0IVwiXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTGVmdFN0YXJ0XCI6XG4gICAgICAgICAgICAgICAgYm94LmlubmVySFRNTCA9IFwiUGxheWVyIExlZnQgYXR0YWNrcyBmaXJzdCFcIlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkxlZnRXb25cIjpcbiAgICAgICAgICAgICAgICBib3guaW5uZXJIVE1MID0gXCJQbGF5ZXIgTGVmdCBXb24hXCJcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJSaWdodFdvblwiOlxuICAgICAgICAgICAgICAgIGJveC5pbm5lckhUTUwgPSBcIlBsYXllciBSaWdodCBXb24hXCJcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYm94LmlubmVySFRNTCA9IFwiXCJcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IF9oaXRNaXNzU2hpcCA9IChmaWVsZCkgPT4ge1xuXG4gICAgICAgIGlmIChmaWVsZC5zaGlwICE9PSBudWxsICYmIGZpZWxkLmhpdCAhPT0gbnVsbCkgcmV0dXJuIFwiaGl0U2hpcFwiICAvLyBzaGlwIHRoYXQgaGFzIGJlZW4gaGl0XG4gICAgICAgIGlmIChmaWVsZC5zaGlwICE9PSBudWxsICYmIGZpZWxkLmhpdCA9PSBudWxsKSByZXR1cm4gXCJzaGlwXCIgIC8vIHNoaXAgbm90IGhpdCB5ZXRcbiAgICAgICAgaWYgKGZpZWxkLm1pc3MpIHJldHVybiBcIm1pc3NcIiAvLyB3YXRlciBidXQgYWxyZWFkeSBoaXQ6IG1pc3NcbiAgICAgICAgcmV0dXJuIFwid2F0ZXJcIiAvLyBqdXN0IHdhdGVyXG4gICAgfVxuXG4gICAgY29uc3Qgc2V0UGxheWVyTmFtZSA9IChuYW1lKSA9PiB7XG4gICAgICAgIGxldCBwbGF5ZXJOYW1lRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXJOYW1lXCIpO1xuICAgICAgICBwbGF5ZXJOYW1lRE9NLmlubmVySFRNTCA9IG5hbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVuZGVyTGVmdEdhbWVib2FyZCAoZ2FtZWJvYXJkKSB7XG4gICAgICAgICAgICByZW5kZXJHYW1lYm9hcmQoZ2FtZWJvYXJkLCBnYW1lYm9hcmRMZWZ0KVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbmRlclJpZ2h0R2FtZWJvYXJkIChnYW1lYm9hcmQpIHtcbiAgICAgICAgICAgIHJlbmRlckdhbWVib2FyZChnYW1lYm9hcmQsIGdhbWVib2FyZFJpZ2h0LCBmYWxzZSlcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRVcEZpZWxkTGlzdGVuZXJMZWZ0IChjYWxsYmFjaykge1xuICAgICAgICAgICAgc2V0VXBGaWVsZExpc3RlbmVyKGdhbWVib2FyZExlZnQsIGNhbGxiYWNrKVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldFVwRmllbGRMaXN0ZW5lclJpZ2h0IChjYWxsYmFjaykge1xuICAgICAgICAgICAgc2V0VXBGaWVsZExpc3RlbmVyKGdhbWVib2FyZFJpZ2h0LCBjYWxsYmFjaylcbiAgICAgICAgfSxcblxuICAgICAgICBjbGVhckxlZnRHYW1lYm9hcmQgKCkge1xuICAgICAgICAgICAgY2xlYXJHYW1lYm9hcmQgKGdhbWVib2FyZExlZnQpXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xlYXJSaWdodEdhbWVib2FyZCAoKSB7XG4gICAgICAgICAgICBjbGVhckdhbWVib2FyZCAoZ2FtZWJvYXJkUmlnaHQpXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0UGxheWVyTmFtZSxcbiAgICAgICAgc2V0VXBTaHVmZmxlTGlzdGVuZXIsXG4gICAgICAgIHNldFN0YXJ0TGlzdGVuZXIsXG4gICAgICAgIHN0YXJ0VG9SZXN0YXJ0LFxuICAgICAgICB1bk11dGVTaHVmZmxlLFxuICAgICAgICBtdXRlU2h1ZmZsZSxcbiAgICAgICAgdW5NdXRlU3RhcnQsXG4gICAgICAgIG11dGVTdGFydCxcbiAgICAgICAgdW5NdXRlR2FtZWJvYXJkLFxuICAgICAgICBtdXRlR2FtZWJvYXJkLFxuICAgICAgICByZXN0YXJ0VG9TdGFydCxcbiAgICAgICAgc2V0TWVzc2FnZVxuICAgIH1cblxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZVZpZXc7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vZ2FtZVwiXG5cbkdhbWUoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==