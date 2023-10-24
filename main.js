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
            if (gameboardRight.gameboardLost() == true) _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].setMessage("LeftWon")

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
        if (gameboardLeft.gameboardLost() == true) _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].setMessage("RightWon")

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
        })
    }

    const startGame = (gameboardR) => {

        _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].setStartListener(() => {

            //set ui message, that left attacs first
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].setMessage("LeftStart")

            // initialize game with shuffled gameboard
            let newGameboardL = getCurrentGameboardL();
            gameController.startMoves(newGameboardL, gameboardR)

            // deactivate shuffle button
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].muteShuffle()

            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].startToRestart(() => {
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
        muteShuffle,
        startToRestart,
        unMuteShuffle,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRCxpRUFBZSxRQUFROzs7Ozs7VUMzSnZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNONkI7O0FBRTdCLDJDQUFJLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbnRyb2xsZXIvZ2FtZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2xheW91dC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ZpZXcvZ2FtZVZpZXcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdhbWVWaWV3IGZyb20gXCIuLi92aWV3L2dhbWVWaWV3XCI7XG5pbXBvcnQgQ29tcHV0ZXIgZnJvbSBcIi4uL2ZhY3Rvcmllcy9jb21wdXRlclwiO1xuaW1wb3J0IExheW91dCBmcm9tIFwiLi4vZmFjdG9yaWVzL2xheW91dFwiO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi4vZmFjdG9yaWVzL2dhbWVib2FyZFwiO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuLi9nYW1lXCI7XG5cblxuLy8gdGhpcyBtb2R1bGUgY29tYmluZXMgZG9tIChnYW1lVmlldykgYW5kIGxvZ2ljIGZ1bmN0aW9ucyAoZmFjdG9yaWVzKVxuY29uc3QgZ2FtZUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgX3RpbWVPdXQgPSAwO1xuICAgIFxuICAgIC8vIHJlYWwgcGxheWVyXG4gICAgY29uc3QgX21ha2VNb3ZlTGVmdFBsYXllciA9IChnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgZ2FtZVZpZXcuc2V0VXBGaWVsZExpc3RlbmVyUmlnaHQoKGZpZWxkKSA9PiB7XG5cbiAgICAgICAgICAgIC8vc2V0IHVpIG1lc3NhZ2UgYm94IGVtcHR5XG4gICAgICAgICAgICBnYW1lVmlldy5zZXRNZXNzYWdlKClcblxuICAgICAgICAgICAgLy8gZG9udCBzZXQgdXAgbGlzdGVuZXIgaWYgZmllbGQgd2FzIGFscmVhZHkgcGxheWVkXG4gICAgICAgICAgICBpZiAoIWdhbWVib2FyZFJpZ2h0LmlzVmFsaWRNb3ZlKGZpZWxkLmRhdGFzZXQucm93LCBmaWVsZC5kYXRhc2V0LmNvbHVtbikpIHJldHVyblxuXG4gICAgICAgICAgICAvLyByZWdpc3RlciBhdHRhY2sgYW5kIHJlbmRlciB1cGRhdGVkIGdhbWVib2FyZFxuICAgICAgICAgICAgZ2FtZWJvYXJkUmlnaHQucmVjZWl2ZUF0dGFjayhmaWVsZC5kYXRhc2V0LnJvdywgZmllbGQuZGF0YXNldC5jb2x1bW4pO1xuICAgICAgICAgICAgZ2FtZVZpZXcuY2xlYXJSaWdodEdhbWVib2FyZCgpO1xuICAgICAgICAgICAgZ2FtZVZpZXcucmVuZGVyUmlnaHRHYW1lYm9hcmQoZ2FtZWJvYXJkUmlnaHQpO1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gaWYgZ2FtZSBpcyBvdmVyXG4gICAgICAgICAgICBpZiAoZ2FtZWJvYXJkUmlnaHQuZ2FtZWJvYXJkTG9zdCgpID09IHRydWUpIGdhbWVWaWV3LnNldE1lc3NhZ2UoXCJMZWZ0V29uXCIpXG5cbiAgICAgICAgICAgIC8vIGluaXRpYXRlIG5leHQgbW92ZVxuICAgICAgICAgICAgZ2FtZWJvYXJkUmlnaHQuZ2V0TGFzdEhpdCgpID9cbiAgICAgICAgICAgIF9tYWtlTW92ZUxlZnRQbGF5ZXIoZ2FtZWJvYXJkTGVmdCwgZ2FtZWJvYXJkUmlnaHQpIDpcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gX21ha2VNb3ZlUmlnaHRQbGF5ZXIoZ2FtZWJvYXJkTGVmdCwgZ2FtZWJvYXJkUmlnaHQpLCBfdGltZU91dCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gY29tcHV0ZXIgcGxheWVyXG4gICAgY29uc3QgX21ha2VNb3ZlUmlnaHRQbGF5ZXIgPSAoZ2FtZWJvYXJkTGVmdCwgZ2FtZWJvYXJkUmlnaHQpID0+IHtcblxuICAgICAgICBsZXQgY29tcHV0ZXJDaG9pY2UgPSBDb21wdXRlci5nZXRSYW5kb21Nb3ZlKGdhbWVib2FyZExlZnQpO1xuXG4gICAgICAgIHdoaWxlICghZ2FtZWJvYXJkTGVmdC5pc1ZhbGlkTW92ZShjb21wdXRlckNob2ljZVswXSwgY29tcHV0ZXJDaG9pY2VbMV0pKSB7XG4gICAgICAgICAgICBjb21wdXRlckNob2ljZSA9IENvbXB1dGVyLmdldFJhbmRvbU1vdmUoZ2FtZWJvYXJkTGVmdCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZWdpc3RlciBhdHRhY2sgYW5kIHJlbmRlciB1cGRhdGVkIGdhbWVib2FyZFxuICAgICAgICBnYW1lYm9hcmRMZWZ0LnJlY2VpdmVBdHRhY2soY29tcHV0ZXJDaG9pY2VbMF0sIGNvbXB1dGVyQ2hvaWNlWzFdKTtcbiAgICAgICAgZ2FtZVZpZXcuY2xlYXJMZWZ0R2FtZWJvYXJkKCk7XG4gICAgICAgIGdhbWVWaWV3LnJlbmRlckxlZnRHYW1lYm9hcmQoZ2FtZWJvYXJkTGVmdCk7XG5cbiAgICAgICAgLy8gcmV0dXJuIGlmIGdhbWUgaXMgb3ZlclxuICAgICAgICBpZiAoZ2FtZWJvYXJkTGVmdC5nYW1lYm9hcmRMb3N0KCkgPT0gdHJ1ZSkgZ2FtZVZpZXcuc2V0TWVzc2FnZShcIlJpZ2h0V29uXCIpXG5cbiAgICAgICAgLy8gaW5pdGlhdGUgbmV4dCBtb3ZlXG4gICAgICAgIGdhbWVib2FyZExlZnQuZ2V0TGFzdEhpdCgpID9cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBfbWFrZU1vdmVSaWdodFBsYXllcihnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodCksIF90aW1lT3V0KTpcbiAgICAgICAgX21ha2VNb3ZlTGVmdFBsYXllcihnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodCk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vIHRoZSBmdW5jdGlvbnMgbWFrZW1vdmVwbGF5ZXIgcmVjdXJzaXZlbHkgY2FsbCBlYWNoIG90aGVyIGluc2lkZSBhbm90aGVyIHVudGlsbCB0aGUgd2luIGNvbmRpdGlvbiBzdG9wcyB0aGUgZ2FtZVxuICAgIGNvbnN0IHN0YXJ0TW92ZXMgPSAoZ2FtZWJvYXJkTGVmdCwgZ2FtZWJvYXJkUmlnaHQpID0+IHtcbiAgICAgICAgX21ha2VNb3ZlTGVmdFBsYXllcihnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodClcbiAgICB9XG5cbiAgICBjb25zdCBzaHVmZmxlTGF5b3V0ID0gKCkgPT4ge1xuICAgICAgICBnYW1lVmlldy5zZXRVcFNodWZmbGVMaXN0ZW5lcigoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIGNsZWFyIHByZXZpb3VzIGJvYXQgbGF5b3V0XG4gICAgICAgICAgICBnYW1lVmlldy5jbGVhckxlZnRHYW1lYm9hcmQoKVxuXG4gICAgICAgICAgICAvLyBjcmVhdGUgbmV3IEdhbWVib2FyZCBvYmplY3Qgd2l0aCByYW5kb20gYm9hdCBsYXlvdXRcbiAgICAgICAgICAgIGNvbnN0IG5ld0dhbWVib2FyZEwgPSBHYW1lYm9hcmQoKVxuICAgICAgICAgICAgY29uc3QgcGxheWVyTmFtZSA9IExheW91dC5hcHBseUxheW91dChuZXdHYW1lYm9hcmRMKVxuICAgICAgICAgICAgZ2FtZVZpZXcuc2V0UGxheWVyTmFtZShwbGF5ZXJOYW1lKSAvLyBzZXQgcmVzcGVjdGl2ZSBuYW1lIGluIFVJXG4gICAgICAgICAgICBnYW1lVmlldy5yZW5kZXJMZWZ0R2FtZWJvYXJkKG5ld0dhbWVib2FyZEwpXG5cbiAgICAgICAgICAgIC8vIHNhdmUgbGF0ZXN0IGdhbWVib2FyZCB0byBzdG9yYWdlXG4gICAgICAgICAgICBjdXJyZW50R2FtZWJvYXJkTCA9IG5ld0dhbWVib2FyZEw7IFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0R2FtZSA9IChnYW1lYm9hcmRSKSA9PiB7XG5cbiAgICAgICAgZ2FtZVZpZXcuc2V0U3RhcnRMaXN0ZW5lcigoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vc2V0IHVpIG1lc3NhZ2UsIHRoYXQgbGVmdCBhdHRhY3MgZmlyc3RcbiAgICAgICAgICAgIGdhbWVWaWV3LnNldE1lc3NhZ2UoXCJMZWZ0U3RhcnRcIilcblxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSBnYW1lIHdpdGggc2h1ZmZsZWQgZ2FtZWJvYXJkXG4gICAgICAgICAgICBsZXQgbmV3R2FtZWJvYXJkTCA9IGdldEN1cnJlbnRHYW1lYm9hcmRMKCk7XG4gICAgICAgICAgICBnYW1lQ29udHJvbGxlci5zdGFydE1vdmVzKG5ld0dhbWVib2FyZEwsIGdhbWVib2FyZFIpXG5cbiAgICAgICAgICAgIC8vIGRlYWN0aXZhdGUgc2h1ZmZsZSBidXR0b25cbiAgICAgICAgICAgIGdhbWVWaWV3Lm11dGVTaHVmZmxlKClcblxuICAgICAgICAgICAgZ2FtZVZpZXcuc3RhcnRUb1Jlc3RhcnQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGdhbWVWaWV3LmNsZWFyTGVmdEdhbWVib2FyZCgpXG4gICAgICAgICAgICAgICAgZ2FtZVZpZXcuY2xlYXJSaWdodEdhbWVib2FyZCgpXG4gICAgICAgICAgICAgICAgZ2FtZVZpZXcudW5NdXRlU2h1ZmZsZSgpXG4gICAgICAgICAgICAgICAgZ2FtZVZpZXcucmVzdGFydFRvU3RhcnQoKCkgPT4gc3RhcnRHYW1lKCkpXG4gICAgICAgICAgICAgICAgR2FtZSgpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgbGV0IGN1cnJlbnRHYW1lYm9hcmRMO1xuXG4gICAgY29uc3QgZ2V0Q3VycmVudEdhbWVib2FyZEwgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBjdXJyZW50R2FtZWJvYXJkTFxuICAgIH1cblxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydE1vdmVzLFxuICAgICAgICBzaHVmZmxlTGF5b3V0LFxuICAgICAgICBnZXRDdXJyZW50R2FtZWJvYXJkTCxcbiAgICAgICAgc3RhcnRHYW1lXG4gICAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZUNvbnRyb2xsZXI7XG4iLCJjb25zdCBDb21wdXRlciA9ICgoKSA9PiB7XG5cbiAgICBsZXQgaGl0U3RvcmFnZSA9IFtdO1xuICAgIGxldCBuZXh0SGl0UXVldWUgPSBbXTtcblxuICAgIGNvbnN0IGdldEhpdFN0b3JhZ2UgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBoaXRTdG9yYWdlXG4gICAgfVxuXG4gICAgY29uc3QgZ2V0TmV4dEhpdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIG5leHRIaXRRdWV1ZVxuICAgIH1cblxuICAgIGNvbnN0IF9zYXZlSGl0VG9TdG9yYWdlID0gKGdhbWVib2FyZCwgeCwgeSkgPT4ge1xuXG4gICAgICAgIGxldCBmaWVsZCA9IGdhbWVib2FyZC5maWVsZHNbeF1beV1cblxuICAgICAgICBpZiAoZmllbGQuc2hpcCA9PSBudWxsKSByZXR1cm5cbiAgICAgICAgXG4gICAgICAgIGhpdFN0b3JhZ2UucHVzaChbIHgsIHkgXSlcblxuICAgICAgICBpZiAoeC0xID49IDAgJiYgeCsxIDw9IDkpIHtcbiAgICAgICAgICAgIG5leHRIaXRRdWV1ZS5wdXNoKFsgeC0xICwgeSBdKVxuICAgICAgICAgICAgbmV4dEhpdFF1ZXVlLnB1c2goWyB4KzEgLCB5IF0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHktMSA+PSAwICYmIHkrMSA8PSA5KSB7XG4gICAgICAgICAgICBuZXh0SGl0UXVldWUucHVzaChbIHggLCB5LTEgXSlcbiAgICAgICAgICAgIG5leHRIaXRRdWV1ZS5wdXNoKFsgeCAsIHkrMSBdKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0UmFuZG9tTW92ZSA9IChnYW1lYm9hcmQpID0+IHtcblxuICAgICAgICAvLyBnZXQgXCJzbWFydFwiIG1vdmVcbiAgICAgICAgaWYgKGdldE5leHRIaXQoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0TmV4dEhpdCgpLnBvcCgpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICAgICAgX3NhdmVIaXRUb1N0b3JhZ2UoZ2FtZWJvYXJkLCB4LCB5KVxuXG4gICAgICAgIHJldHVybiBbeCx5XVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldFJhbmRvbU1vdmVcbiAgICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBDb21wdXRlcjsiLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcblxuICAgIGNvbnN0IEZpZWxkID0ge1xuICAgICAgICBzaGlwIDogbnVsbCxcbiAgICAgICAgaGl0IDogbnVsbCxcbiAgICAgICAgbWlzcyA6IG51bGxcbiAgICB9XG5cbiAgICBsZXQgbGFzdE9uZVdhc0hpdCA9IGZhbHNlO1xuXG4gICAgY29uc3QgZ2V0TGFzdEhpdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGxhc3RPbmVXYXNIaXRcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgZ2FtZWJvYXJkIGdyaWQgd2l0aCBGaWVsZCBvYmplY3QgaW4gZWFjaCBmaWVsZFxuICAgIGNvbnN0IF9jcmVhdGVGaWVsZE9iamVjdCA9IChkaW0gPSAxMCkgPT4ge1xuICAgICAgICBsZXQgZ3JpZCA9IFtdO1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSBkaW0gLSAxOyB4KyspIHtcbiAgICAgICAgICAgIGdyaWQucHVzaChbXSlcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IGRpbSAtIDE7IHkrKykge1xuICAgICAgICAgICAgICAgIGdyaWRbeF0ucHVzaCh7Li4uRmllbGR9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBncmlkXG4gICAgfVxuXG4gICAgLy8gaW5pdGlhbGl6ZSBncmlkXG4gICAgY29uc3QgZmllbGRzID0gX2NyZWF0ZUZpZWxkT2JqZWN0KCk7XG5cbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcExlbmd0aCwgY29vcmRzKSA9PiB7XG5cbiAgICAgICAgY29uc3QgbmV3U2hpcCA9IFNoaXAoc2hpcExlbmd0aClcblxuICAgICAgICBmb3IgKGxldCBjb29yZFBhaXIgaW4gY29vcmRzKSB7XG4gICAgICAgICAgICBsZXQgeENvb3JkID0gY29vcmRzW2Nvb3JkUGFpcl1bMF1cbiAgICAgICAgICAgIGxldCB5Q29vcmQgPSBjb29yZHNbY29vcmRQYWlyXVsxXVxuICAgICAgICAgICAgZmllbGRzW3hDb29yZF1beUNvb3JkXS5zaGlwID0gbmV3U2hpcDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuXG4gICAgICAgIGxldCBhdHRhY2tlZEZpZWxkID0gZmllbGRzW3hdW3ldO1xuXG4gICAgICAgIGlmIChhdHRhY2tlZEZpZWxkLnNoaXAgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGF0dGFja2VkRmllbGQuc2hpcC5oaXQoKTtcbiAgICAgICAgICAgIGF0dGFja2VkRmllbGQuaGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGxhc3RPbmVXYXNIaXQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXR0YWNrZWRGaWVsZC5taXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIGxhc3RPbmVXYXNIaXQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGdhbWVib2FyZExvc3QgPSAoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3Qgcm93IGluIGZpZWxkcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWVsZCBpbiBmaWVsZHNbcm93XSkge1xuICAgICAgICAgICAgICAgIGlmIChmaWVsZHNbcm93XVtmaWVsZF0uc2hpcCAhPT0gbnVsbCAmJiBmaWVsZHNbcm93XVtmaWVsZF0uaGl0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgaXNWYWxpZE1vdmUgPSAoeCwgeSkgPT4ge1xuICAgICAgICBsZXQgZmllbGQgPSBmaWVsZHNbeF1beV07XG4gICAgICAgIGlmIChmaWVsZC5oaXQgfHwgZmllbGQubWlzcykgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmaWVsZHMsXG4gICAgICAgIHBsYWNlU2hpcCxcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcbiAgICAgICAgZ2FtZWJvYXJkTG9zdCxcbiAgICAgICAgaXNWYWxpZE1vdmUsXG4gICAgICAgIGdldExhc3RIaXRcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDsgICAiLCJjb25zdCBMYXlvdXQgPSAoZnVuY3Rpb24gKCkge1xuICAgIFxuICAgIGNvbnN0IGJvYXRMYXlvdXRzID0ge1xuICAgICAgICAgIFwiVGhlIFN1Ym1hcmluZVwiOiBbXG4gICAgICAgICAgICBbNSwgW1s3LCAxXSwgWzcsIDJdLCBbNywgM10sIFs3LCA0XSwgWzcsIDVdXV0sXG4gICAgICAgICAgICBbNCwgW1s5LCAxXSwgWzksIDJdLCBbOSwgM10sIFs5LCA0XV1dLFxuICAgICAgICAgICAgWzMsIFtbMiwgNF0sIFszLCA0XSwgWzQsIDRdXV0sXG4gICAgICAgICAgICBbMiwgW1s2LCA3XSwgWzcsIDddXV0sXG4gICAgICAgICAgICBbMiwgW1sxLCA3XSwgWzAsIDddXV0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIlRoZSBQaXJhdGVcIjogW1xuICAgICAgICAgICAgWzUsIFtbMiwgNl0sIFszLCA2XSwgWzQsIDZdLCBbNSwgNl0sIFs2LCA2XV1dLFxuICAgICAgICAgICAgWzQsIFtbMSwgOF0sIFsyLCA4XSwgWzMsIDhdLCBbNCwgOF1dXSxcbiAgICAgICAgICAgIFszLCBbWzYsIDldLCBbNywgOV0sIFs4LCA5XV1dLFxuICAgICAgICAgICAgWzIsIFtbOSwgMF0sIFs4LCAwXV1dLFxuICAgICAgICAgICAgWzIsIFtbMSwgMV0sIFsxLCAyXV1dLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJUaGUgRHVja1wiOiBbXG4gICAgICAgICAgICBbNSwgW1sxLCAzXSwgWzIsIDNdLCBbMywgM10sIFs0LCAzXSwgWzUsIDNdXV0sXG4gICAgICAgICAgICBbNCwgW1s4LCAxXSwgWzgsIDJdLCBbOCwgM10sIFs4LCA0XV1dLFxuICAgICAgICAgICAgWzMsIFtbNiwgNV0sIFs2LCA2XSwgWzYsIDddXV0sXG4gICAgICAgICAgICBbMiwgW1s5LCA5XSwgWzgsIDldXV0sXG4gICAgICAgICAgICBbMiwgW1szLCA3XSwgWzQsIDddXV1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiVGhlIFNwYWNlc2hpcFwiOiBbXG4gICAgICAgICAgICBbNSwgW1syLCA3XSwgWzMsIDddLCBbNCwgN10sIFs1LCA3XSwgWzYsIDddXV0sXG4gICAgICAgICAgICBbNCwgW1s4LCA0XSwgWzgsIDVdLCBbOCwgNl0sIFs4LCA3XV1dLFxuICAgICAgICAgICAgWzMsIFtbMCwgMF0sIFsxLCAwXSwgWzIsIDBdXV0sXG4gICAgICAgICAgICBbMiwgW1s3LCAxXSwgWzcsIDJdXV0sXG4gICAgICAgICAgICBbMiwgW1s5LCAyXSwgWzksIDNdXV1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiVGhlIFJ1YmJlciBCb2F0XCI6IFtcbiAgICAgICAgICAgIFs1LCBbWzMsIDFdLCBbNCwgMV0sIFs1LCAxXSwgWzYsIDFdLCBbNywgMV1dXSxcbiAgICAgICAgICAgIFs0LCBbWzAsIDNdLCBbMCwgNF0sIFswLCA1XSwgWzAsIDZdXV0sXG4gICAgICAgICAgICBbMywgW1syLCAzXSwgWzIsIDRdLCBbMiwgNV1dXSxcbiAgICAgICAgICAgIFsyLCBbWzUsIDZdLCBbNiwgNl1dXSxcbiAgICAgICAgICAgIFsyLCBbWzksIDhdLCBbOSwgOV1dXVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJUaGUgWWFjaHRcIjogW1xuICAgICAgICAgICAgWzUsIFtbOSwgN10sIFs4LCA3XSwgWzcsIDddLCBbNiwgN10sIFs1LCA3XV1dLFxuICAgICAgICAgICAgWzQsIFtbMSwgNV0sIFsxLCA2XSwgWzEsIDddLCBbMSwgOF1dXSxcbiAgICAgICAgICAgIFszLCBbWzMsIDRdLCBbNCwgNF0sIFs1LCA0XV1dLFxuICAgICAgICAgICAgWzIsIFtbNCwgOV0sIFs1LCA5XV1dLFxuICAgICAgICAgICAgWzIsIFtbNywgMl0sIFs4LCAyXV1dXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIlRoZSBHYWxsZW9uXCI6IFtcbiAgICAgICAgICAgIFs1LCBbWzYsIDFdLCBbNiwgMl0sIFs2LCAzXSwgWzYsIDRdLCBbNiwgNV1dXSxcbiAgICAgICAgICAgIFs0LCBbWzksIDNdLCBbOSwgNF0sIFs5LCA1XSwgWzksIDZdXV0sXG4gICAgICAgICAgICBbMywgW1syLCA2XSwgWzMsIDZdLCBbNCwgNl1dXSxcbiAgICAgICAgICAgIFsyLCBbWzgsIDldLCBbOSwgOV1dXSxcbiAgICAgICAgICAgIFsyLCBbWzAsIDBdLCBbMSwgMF1dXVxuICAgICAgICAgIF1cbiAgICAgIH07XG4gICAgXG4gICAgY29uc3QgX2dldFJhbmRvbUxheW91dCA9ICgpID0+IHtcbiAgICAgICAgbGV0IG5hbWUgPSBPYmplY3Qua2V5cyhib2F0TGF5b3V0cylbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNyldO1xuICAgICAgICBsZXQgbGF5b3V0ID0gYm9hdExheW91dHNbbmFtZV07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWUgOiBuYW1lLFxuICAgICAgICAgICAgbGF5b3V0IDogbGF5b3V0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhcHBseUxheW91dCA9IChnYW1lYm9hcmQpID0+IHtcblxuICAgICAgICBsZXQgcmFuZG9tQ2hvaWNlID0gX2dldFJhbmRvbUxheW91dCgpO1xuICAgICAgICBsZXQgZnVubnlOYW1lID0gcmFuZG9tQ2hvaWNlLm5hbWU7XG4gICAgICAgIGxldCBsYXlvdXQgPSByYW5kb21DaG9pY2UubGF5b3V0O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheW91dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNoaXAgPSBsYXlvdXRbaV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcFswXSwgc2hpcFsxXSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5ueU5hbWVcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXBwbHlMYXlvdXRcbiAgICB9XG5cblxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgTGF5b3V0OyIsImNvbnN0IFNoaXAgPSAoIHVuaXRzICkgPT4ge1xuXG4gICAgY29uc3QgbGVuZ3RoID0gdW5pdHM7XG5cbiAgICBsZXQgaGl0cyA9IDA7XG5cbiAgICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0c1xuXG4gICAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgYWxyZWFkeSBzdW5rXCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoaXRzKytcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IGdldEhpdHMoKSA9PSBsZW5ndGggPyB0cnVlIDogZmFsc2VcbiBcbiAgICByZXR1cm4ge1xuICAgICAgICBsZW5ndGgsXG4gICAgICAgIGhpdCxcbiAgICAgICAgZ2V0SGl0cyxcbiAgICAgICAgaXNTdW5rXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9mYWN0b3JpZXMvZ2FtZWJvYXJkXCJcbmltcG9ydCBnYW1lVmlldyBmcm9tIFwiLi92aWV3L2dhbWVWaWV3XCJcbmltcG9ydCBnYW1lQ29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyL2dhbWVDb250cm9sbGVyXCJcbmltcG9ydCBMYXlvdXQgZnJvbSBcIi4vZmFjdG9yaWVzL2xheW91dFwiXG5cbmV4cG9ydCBmdW5jdGlvbiBHYW1lICgpIHtcblxuICAgIC8vIGluaXRpYWxpemUgZ2FtZWJvYXJkIExcbiAgICBjb25zdCBnYW1lYm9hcmRMID0gR2FtZWJvYXJkKClcbiAgICBnYW1lVmlldy5zZXRQbGF5ZXJOYW1lKExheW91dC5hcHBseUxheW91dChnYW1lYm9hcmRMKSlcbiAgICBnYW1lVmlldy5yZW5kZXJMZWZ0R2FtZWJvYXJkKGdhbWVib2FyZEwpXG5cbiAgICAvLyBpbml0aWFsaXplIGdhbWVib2FyZCBSXG4gICAgY29uc3QgZ2FtZWJvYXJkUiA9IEdhbWVib2FyZCgpXG4gICAgTGF5b3V0LmFwcGx5TGF5b3V0KGdhbWVib2FyZFIpXG4gICAgZ2FtZVZpZXcucmVuZGVyUmlnaHRHYW1lYm9hcmQoZ2FtZWJvYXJkUilcblxuICAgIC8vIGluaXRpYWxpemUgc2h1ZmZsZSBidXR0b24gbGlzdGVuZXIgYW5kIGxvZ2ljXG4gICAgZ2FtZUNvbnRyb2xsZXIuc2h1ZmZsZUxheW91dCgpXG5cbiAgICAvLyBpbml0aWFsaXplIHN0YXJ0IGJ1dHRvbiBsaXN0ZW5lciBhbmQgbG9naWNcbiAgICBnYW1lQ29udHJvbGxlci5zdGFydEdhbWUoZ2FtZWJvYXJkUilcbn07IiwiXG5cbi8vIHJlbmRlciBnYW1lYm9hcmQgKGdhbWVib2FyZC5maWVsZHMsIHZpc2libGUgPSB0cnVlKVxuXG5jb25zdCBnYW1lVmlldyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBnYW1lYm9hcmRMZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lYm9hcmRPbmVcIik7XG4gICAgY29uc3QgZ2FtZWJvYXJkUmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVib2FyZFR3b1wiKVxuXG4gICAgY29uc3QgcmVuZGVyR2FtZWJvYXJkID0gKGdhbWVib2FyZCwgZ2FtZWJvYXJkRWxlbWVudCwgdmlzaWJsZSA9IHRydWUpID0+IHtcblxuICAgICAgICAvLyBpdGVyYXRlIHRocm91Z2ggYWxsIGZpZWxkcyBvZiBhIGdhbWVib2FyZFxuICAgICAgICBmb3IgKGNvbnN0IHJvdyBpbiBnYW1lYm9hcmQuZmllbGRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkIGluIGdhbWVib2FyZC5maWVsZHNbcm93XSkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBjZWxsIGRvbSBlbGVtZW50XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgZmllbGQgY2xhc3MgYW5kIGFwcHJvcHJpYXRlIGZpZWxkIHN0YXRlIHN0eWxpbmdcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJmaWVsZFwiLCBfaGl0TWlzc1NoaXAoZ2FtZWJvYXJkLmZpZWxkc1tyb3ddW2ZpZWxkXSkpXG4gICAgICAgICAgICAgICAgaWYgKCF2aXNpYmxlKSBjZWxsLmNsYXNzTGlzdC5hZGQoXCJpbnZpc2libGVcIilcblxuICAgICAgICAgICAgICAgIC8vIGFkZCBkYXRhIHJvdyBhbmQgY29sdW1uIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICAgICAgICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiA9IGZpZWxkXG5cbiAgICAgICAgICAgICAgICAvLyBhcHBlbmQgZmllbGQgdG8gZ2FtZWJvYXJkXG4gICAgICAgICAgICAgICAgZ2FtZWJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChjZWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJHYW1lYm9hcmQgPSAoZ2FtZWJvYXJkRWxlbWVudCkgPT4ge1xuICAgICAgICAvLyBsb29rdXAgZmlyc3QgY2hpbGQgYW5kIGRlbGV0ZSBsYXN0IGNoaWxkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zXG4gICAgICAgIHdoaWxlIChnYW1lYm9hcmRFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGdhbWVib2FyZEVsZW1lbnQucmVtb3ZlQ2hpbGQoZ2FtZWJvYXJkRWxlbWVudC5sYXN0Q2hpbGQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRVcEZpZWxkTGlzdGVuZXIgPSAoZ2FtZWJvYXJkRWxlbWVudCwgY2FsbGJhY2spID0+IHtcblxuICAgICAgICBsZXQgY2hpbGREaXZzID0gZ2FtZWJvYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpZWxkXCIpXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZERpdnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBjaGlsZERpdnNbaV07XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjYWxsYmFjayhlbGVtZW50KSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNldFVwU2h1ZmZsZUxpc3RlbmVyID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGxldCBzaHVmZmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaHVmZmxlXCIpXG4gICAgICAgIHNodWZmbGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNhbGxiYWNrKCkpXG4gICAgfVxuXG4gICAgY29uc3QgbXV0ZVNodWZmbGUgPSAoKSA9PiB7XG4gICAgICAgIGxldCBzaHVmZmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaHVmZmxlXCIpXG4gICAgICAgIHNodWZmbGUuY2xhc3NMaXN0LnJlbW92ZShcImJ1dHRvblwiKVxuICAgICAgICBzaHVmZmxlLmNsYXNzTGlzdC5hZGQoXCJtdXRlXCIpXG4gICAgfVxuXG4gICAgY29uc3QgdW5NdXRlU2h1ZmZsZSA9ICgpID0+IHtcbiAgICAgICAgbGV0IHNodWZmbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNodWZmbGVcIilcbiAgICAgICAgc2h1ZmZsZS5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpXG4gICAgICAgIHNodWZmbGUuY2xhc3NMaXN0LnJlbW92ZShcIm11dGVcIilcbiAgICB9XG5cbiAgICBjb25zdCBzZXRTdGFydExpc3RlbmVyID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGxldCBzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIilcbiAgICAgICAgc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNhbGxiYWNrKCkpXG4gICAgfVxuXG4gICAgY29uc3Qgc3RhcnRUb1Jlc3RhcnQgPSAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgbGV0IHN0YXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKVxuICAgICAgICBzdGFydC5pbm5lckhUTUwgPSBcInJlc3RhcnRcIlxuICAgICAgICBzdGFydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2FsbGJhY2soKSlcbiAgICB9XG5cbiAgICBjb25zdCByZXN0YXJ0VG9TdGFydCA9IChjYWxsYmFjaykgPT4ge1xuICAgICAgICBsZXQgc3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpXG4gICAgICAgIHN0YXJ0LmlubmVySFRNTCA9IFwic3RhcnRcIlxuICAgICAgICBzdGFydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2FsbGJhY2soKSlcbiAgICB9XG5cbiAgICBjb25zdCBzZXRNZXNzYWdlID0gKHR5cGUpID0+IHtcbiAgICAgICAgbGV0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYW5ub3VuY2VtZW50XCIpXG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiaW5pdFwiOlxuICAgICAgICAgICAgICAgIGJveC5pbm5lckhUTUwgPSBcIlNodWZmbGUgTGF5b3V0LCB0aGVuIHByZXNzIHN0YXJ0IVwiXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTGVmdFN0YXJ0XCI6XG4gICAgICAgICAgICAgICAgYm94LmlubmVySFRNTCA9IFwiUGxheWVyIExlZnQgYXR0YWNrcyBmaXJzdCFcIlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkxlZnRXb25cIjpcbiAgICAgICAgICAgICAgICBib3guaW5uZXJIVE1MID0gXCJQbGF5ZXIgTGVmdCBXb24hXCJcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJSaWdodFdvblwiOlxuICAgICAgICAgICAgICAgIGJveC5pbm5lckhUTUwgPSBcIlBsYXllciBSaWdodCBXb24hXCJcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYm94LmlubmVySFRNTCA9IFwiXCJcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IF9oaXRNaXNzU2hpcCA9IChmaWVsZCkgPT4ge1xuXG4gICAgICAgIGlmIChmaWVsZC5zaGlwICE9PSBudWxsICYmIGZpZWxkLmhpdCAhPT0gbnVsbCkgcmV0dXJuIFwiaGl0U2hpcFwiICAvLyBzaGlwIHRoYXQgaGFzIGJlZW4gaGl0XG4gICAgICAgIGlmIChmaWVsZC5zaGlwICE9PSBudWxsICYmIGZpZWxkLmhpdCA9PSBudWxsKSByZXR1cm4gXCJzaGlwXCIgIC8vIHNoaXAgbm90IGhpdCB5ZXRcbiAgICAgICAgaWYgKGZpZWxkLm1pc3MpIHJldHVybiBcIm1pc3NcIiAvLyB3YXRlciBidXQgYWxyZWFkeSBoaXQ6IG1pc3NcbiAgICAgICAgcmV0dXJuIFwid2F0ZXJcIiAvLyBqdXN0IHdhdGVyXG4gICAgfVxuXG4gICAgY29uc3Qgc2V0UGxheWVyTmFtZSA9IChuYW1lKSA9PiB7XG4gICAgICAgIGxldCBwbGF5ZXJOYW1lRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXJOYW1lXCIpO1xuICAgICAgICBwbGF5ZXJOYW1lRE9NLmlubmVySFRNTCA9IG5hbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVuZGVyTGVmdEdhbWVib2FyZCAoZ2FtZWJvYXJkKSB7XG4gICAgICAgICAgICByZW5kZXJHYW1lYm9hcmQoZ2FtZWJvYXJkLCBnYW1lYm9hcmRMZWZ0KVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbmRlclJpZ2h0R2FtZWJvYXJkIChnYW1lYm9hcmQpIHtcbiAgICAgICAgICAgIHJlbmRlckdhbWVib2FyZChnYW1lYm9hcmQsIGdhbWVib2FyZFJpZ2h0LCBmYWxzZSlcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRVcEZpZWxkTGlzdGVuZXJMZWZ0IChjYWxsYmFjaykge1xuICAgICAgICAgICAgc2V0VXBGaWVsZExpc3RlbmVyKGdhbWVib2FyZExlZnQsIGNhbGxiYWNrKVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldFVwRmllbGRMaXN0ZW5lclJpZ2h0IChjYWxsYmFjaykge1xuICAgICAgICAgICAgc2V0VXBGaWVsZExpc3RlbmVyKGdhbWVib2FyZFJpZ2h0LCBjYWxsYmFjaylcbiAgICAgICAgfSxcblxuICAgICAgICBjbGVhckxlZnRHYW1lYm9hcmQgKCkge1xuICAgICAgICAgICAgY2xlYXJHYW1lYm9hcmQgKGdhbWVib2FyZExlZnQpXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xlYXJSaWdodEdhbWVib2FyZCAoKSB7XG4gICAgICAgICAgICBjbGVhckdhbWVib2FyZCAoZ2FtZWJvYXJkUmlnaHQpXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0UGxheWVyTmFtZSxcbiAgICAgICAgc2V0VXBTaHVmZmxlTGlzdGVuZXIsXG4gICAgICAgIHNldFN0YXJ0TGlzdGVuZXIsXG4gICAgICAgIG11dGVTaHVmZmxlLFxuICAgICAgICBzdGFydFRvUmVzdGFydCxcbiAgICAgICAgdW5NdXRlU2h1ZmZsZSxcbiAgICAgICAgcmVzdGFydFRvU3RhcnQsXG4gICAgICAgIHNldE1lc3NhZ2VcbiAgICB9XG5cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVWaWV3OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2dhbWVcIlxuXG5HYW1lKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=