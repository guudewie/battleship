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




// this module combines dom (gameView) and logic functions (factories)
const gameController = (function () {

    const _timeOut = 700;
    
    // real player
    const _makeMoveLeftPlayer = (gameboardLeft, gameboardRight) => {
        
        _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].setUpFieldListenerRight((field) => {

            // dont set up listener if field was already played
            if (!gameboardRight.isValidMove(field.dataset.row, field.dataset.column)) return

            // register attack and render updated gameboard
            gameboardRight.receiveAttack(field.dataset.row, field.dataset.column);
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].clearRightGameboard();
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].renderRightGameboard(gameboardRight);

            // return if game is over
            if (gameboardRight.gameboardLost() == true) return console.log("Player Right lost")

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
        if (gameboardLeft.gameboardLost() == true) return console.log("Player Left lost")

        // initiate next move
        gameboardLeft.getLastHit() ?
        setTimeout(() => _makeMoveRightPlayer(gameboardLeft, gameboardRight), _timeOut):
        _makeMoveLeftPlayer(gameboardLeft, gameboardRight);
        
    }

    // the functions makemoveplayer recursively call each other inside another untill the win condition stops the game
    const startMoves = (gameboardLeft, gameboardRight) => {
        _makeMoveLeftPlayer(gameboardLeft, gameboardRight)
    }


    return {
        startMoves
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
          "Submarine": [
            [5, [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5]]],
            [4, [[9, 1], [9, 2], [9, 3], [9, 4]]],
            [3, [[2, 4], [3, 4], [4, 4]]],
            [2, [[6, 7], [7, 7]]],
            [2, [[9, 7], [0, 7]]],
          ],
          "Pirate": [
            [5, [[2, 6], [3, 6], [4, 6], [5, 6], [6, 6]]],
            [4, [[1, 8], [2, 8], [3, 8], [4, 8]]],
            [3, [[6, 9], [7, 9], [8, 9]]],
            [2, [[9, 0], [0, 0]]],
            [2, [[1, 1], [1, 2]]],
          ],
          "Duck": [
            [5, [[1, 3], [2, 3], [3, 3], [4, 3], [5, 3]]],
            [4, [[8, 1], [8, 2], [8, 3], [8, 4]]],
            [3, [[6, 5], [6, 6], [6, 7]]],
            [2, [[9, 9], [0, 9]]],
            [2, [[3, 7], [4, 7]]]
          ],
          "Spaceship": [
            [5, [[2, 7], [3, 7], [4, 7], [5, 7], [6, 7]]],
            [4, [[8, 4], [8, 5], [8, 6], [8, 7]]],
            [3, [[0, 0], [1, 0], [2, 0]]],
            [2, [[7, 1], [7, 2]]],
            [2, [[9, 2], [9, 3]]]
          ],
          "Banana": [
            [5, [[3, 1], [4, 1], [5, 1], [6, 1], [7, 1]]],
            [4, [[0, 3], [0, 4], [0, 5], [0, 6]]],
            [3, [[2, 3], [2, 4], [2, 5]]],
            [2, [[5, 6], [6, 6]]],
            [2, [[9, 8], [9, 9]]]
          ],
          "Yacht": [
            [5, [[0, 8], [9, 8], [8, 8], [7, 8], [6, 8]]],
            [4, [[1, 5], [1, 6], [1, 7], [1, 8]]],
            [3, [[3, 4], [4, 4], [5, 4]]],
            [2, [[4, 9], [5, 9]]],
            [2, [[7, 2], [8, 2]]]
          ],
          "Galleon": [
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
        console.log(layout)
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

/***/ "./src/factories/player.js":
/*!*********************************!*\
  !*** ./src/factories/player.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Player = (name) => {

    let turn = false;

    const isTurn = () => {
        return turn
    }

    const toggleTurn = () => {
        turn = turn ? false : true
    }

    return {
        name,
        isTurn,
        toggleTurn
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

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
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/player */ "./src/factories/player.js");
/* harmony import */ var _view_gameView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/gameView */ "./src/view/gameView.js");
/* harmony import */ var _controller_gameController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controller/gameController */ "./src/controller/gameController.js");
/* harmony import */ var _factories_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./factories/layout */ "./src/factories/layout.js");






function Game () {


    

    const gameboardL = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])()
    console.log(_factories_layout__WEBPACK_IMPORTED_MODULE_4__["default"].applyLayout(gameboardL))
    _view_gameView__WEBPACK_IMPORTED_MODULE_2__["default"].renderLeftGameboard(gameboardL)

    const gameboardR = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])()
    gameboardR.placeShip(4, [[8,8], [8,7], [8,6], [8,5]])
    gameboardR.placeShip(2, [[2,2], [3,2]])
    _view_gameView__WEBPACK_IMPORTED_MODULE_2__["default"].renderRightGameboard(gameboardR)

    _controller_gameController__WEBPACK_IMPORTED_MODULE_3__["default"].startMoves(gameboardL, gameboardR)
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

    const _hitMissShip = (field) => {

        if (field.ship !== null && field.hit !== null) return "hitShip"  // ship that has been hit
        if (field.ship !== null && field.hit == null) return "ship"  // ship not hit yet
        if (field.miss) return "miss" // water but already hit: miss
        return "water" // just water
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ0s7OztBQUc3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFROztBQUVoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLHNEQUFRO0FBQ3BCLFlBQVksc0RBQVE7O0FBRXBCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQSw2QkFBNkIsMkRBQVE7O0FBRXJDO0FBQ0EsNkJBQTZCLDJEQUFRO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQSxRQUFRLHNEQUFRO0FBQ2hCLFFBQVEsc0RBQVE7O0FBRWhCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLGNBQWMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDbkU5Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxRQUFROzs7Ozs7Ozs7Ozs7Ozs7QUNuREc7O0FBRTFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixjQUFjO0FBQ3RDO0FBQ0EsNEJBQTRCLGNBQWM7QUFDMUMsOEJBQThCLFNBQVM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSx3QkFBd0IsaURBQUk7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsU0FBUyxFQUFDOzs7Ozs7Ozs7Ozs7OztBQ3BGekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsbUJBQW1CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsQ0FBQzs7QUFFRCxpRUFBZSxNQUFNOzs7Ozs7Ozs7Ozs7OztBQ3RGckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsTUFBTTs7Ozs7Ozs7Ozs7Ozs7QUNuQnJCOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxpRUFBZSxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0IwQjtBQUNOO0FBQ0Q7QUFDa0I7QUFDakI7O0FBRWhDOzs7QUFHUDs7QUFFQSx1QkFBdUIsZ0VBQVM7QUFDaEMsZ0JBQWdCLHlEQUFNO0FBQ3RCLElBQUksc0RBQVE7O0FBRVosdUJBQXVCLGdFQUFTO0FBQ2hDO0FBQ0E7QUFDQSxJQUFJLHNEQUFROztBQUVaLElBQUksa0VBQWM7QUFDbEI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQkE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSx3QkFBd0Isc0JBQXNCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBLENBQUM7O0FBRUQsaUVBQWUsUUFBUTs7Ozs7O1VDckZ2QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjZCOztBQUU3QiwyQ0FBSSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb250cm9sbGVyL2dhbWVDb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NvbXB1dGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9sYXlvdXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlldy9nYW1lVmlldy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2FtZVZpZXcgZnJvbSBcIi4uL3ZpZXcvZ2FtZVZpZXdcIjtcbmltcG9ydCBDb21wdXRlciBmcm9tIFwiLi4vZmFjdG9yaWVzL2NvbXB1dGVyXCI7XG5cblxuLy8gdGhpcyBtb2R1bGUgY29tYmluZXMgZG9tIChnYW1lVmlldykgYW5kIGxvZ2ljIGZ1bmN0aW9ucyAoZmFjdG9yaWVzKVxuY29uc3QgZ2FtZUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgX3RpbWVPdXQgPSA3MDA7XG4gICAgXG4gICAgLy8gcmVhbCBwbGF5ZXJcbiAgICBjb25zdCBfbWFrZU1vdmVMZWZ0UGxheWVyID0gKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KSA9PiB7XG4gICAgICAgIFxuICAgICAgICBnYW1lVmlldy5zZXRVcEZpZWxkTGlzdGVuZXJSaWdodCgoZmllbGQpID0+IHtcblxuICAgICAgICAgICAgLy8gZG9udCBzZXQgdXAgbGlzdGVuZXIgaWYgZmllbGQgd2FzIGFscmVhZHkgcGxheWVkXG4gICAgICAgICAgICBpZiAoIWdhbWVib2FyZFJpZ2h0LmlzVmFsaWRNb3ZlKGZpZWxkLmRhdGFzZXQucm93LCBmaWVsZC5kYXRhc2V0LmNvbHVtbikpIHJldHVyblxuXG4gICAgICAgICAgICAvLyByZWdpc3RlciBhdHRhY2sgYW5kIHJlbmRlciB1cGRhdGVkIGdhbWVib2FyZFxuICAgICAgICAgICAgZ2FtZWJvYXJkUmlnaHQucmVjZWl2ZUF0dGFjayhmaWVsZC5kYXRhc2V0LnJvdywgZmllbGQuZGF0YXNldC5jb2x1bW4pO1xuICAgICAgICAgICAgZ2FtZVZpZXcuY2xlYXJSaWdodEdhbWVib2FyZCgpO1xuICAgICAgICAgICAgZ2FtZVZpZXcucmVuZGVyUmlnaHRHYW1lYm9hcmQoZ2FtZWJvYXJkUmlnaHQpO1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gaWYgZ2FtZSBpcyBvdmVyXG4gICAgICAgICAgICBpZiAoZ2FtZWJvYXJkUmlnaHQuZ2FtZWJvYXJkTG9zdCgpID09IHRydWUpIHJldHVybiBjb25zb2xlLmxvZyhcIlBsYXllciBSaWdodCBsb3N0XCIpXG5cbiAgICAgICAgICAgIC8vIGluaXRpYXRlIG5leHQgbW92ZVxuICAgICAgICAgICAgZ2FtZWJvYXJkUmlnaHQuZ2V0TGFzdEhpdCgpID9cbiAgICAgICAgICAgIF9tYWtlTW92ZUxlZnRQbGF5ZXIoZ2FtZWJvYXJkTGVmdCwgZ2FtZWJvYXJkUmlnaHQpIDpcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gX21ha2VNb3ZlUmlnaHRQbGF5ZXIoZ2FtZWJvYXJkTGVmdCwgZ2FtZWJvYXJkUmlnaHQpLCBfdGltZU91dCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gY29tcHV0ZXIgcGxheWVyXG4gICAgY29uc3QgX21ha2VNb3ZlUmlnaHRQbGF5ZXIgPSAoZ2FtZWJvYXJkTGVmdCwgZ2FtZWJvYXJkUmlnaHQpID0+IHtcblxuICAgICAgICBsZXQgY29tcHV0ZXJDaG9pY2UgPSBDb21wdXRlci5nZXRSYW5kb21Nb3ZlKGdhbWVib2FyZExlZnQpO1xuXG4gICAgICAgIHdoaWxlICghZ2FtZWJvYXJkTGVmdC5pc1ZhbGlkTW92ZShjb21wdXRlckNob2ljZVswXSwgY29tcHV0ZXJDaG9pY2VbMV0pKSB7XG4gICAgICAgICAgICBjb21wdXRlckNob2ljZSA9IENvbXB1dGVyLmdldFJhbmRvbU1vdmUoZ2FtZWJvYXJkTGVmdCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZWdpc3RlciBhdHRhY2sgYW5kIHJlbmRlciB1cGRhdGVkIGdhbWVib2FyZFxuICAgICAgICBnYW1lYm9hcmRMZWZ0LnJlY2VpdmVBdHRhY2soY29tcHV0ZXJDaG9pY2VbMF0sIGNvbXB1dGVyQ2hvaWNlWzFdKTtcbiAgICAgICAgZ2FtZVZpZXcuY2xlYXJMZWZ0R2FtZWJvYXJkKCk7XG4gICAgICAgIGdhbWVWaWV3LnJlbmRlckxlZnRHYW1lYm9hcmQoZ2FtZWJvYXJkTGVmdCk7XG5cbiAgICAgICAgLy8gcmV0dXJuIGlmIGdhbWUgaXMgb3ZlclxuICAgICAgICBpZiAoZ2FtZWJvYXJkTGVmdC5nYW1lYm9hcmRMb3N0KCkgPT0gdHJ1ZSkgcmV0dXJuIGNvbnNvbGUubG9nKFwiUGxheWVyIExlZnQgbG9zdFwiKVxuXG4gICAgICAgIC8vIGluaXRpYXRlIG5leHQgbW92ZVxuICAgICAgICBnYW1lYm9hcmRMZWZ0LmdldExhc3RIaXQoKSA/XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gX21ha2VNb3ZlUmlnaHRQbGF5ZXIoZ2FtZWJvYXJkTGVmdCwgZ2FtZWJvYXJkUmlnaHQpLCBfdGltZU91dCk6XG4gICAgICAgIF9tYWtlTW92ZUxlZnRQbGF5ZXIoZ2FtZWJvYXJkTGVmdCwgZ2FtZWJvYXJkUmlnaHQpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvLyB0aGUgZnVuY3Rpb25zIG1ha2Vtb3ZlcGxheWVyIHJlY3Vyc2l2ZWx5IGNhbGwgZWFjaCBvdGhlciBpbnNpZGUgYW5vdGhlciB1bnRpbGwgdGhlIHdpbiBjb25kaXRpb24gc3RvcHMgdGhlIGdhbWVcbiAgICBjb25zdCBzdGFydE1vdmVzID0gKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KSA9PiB7XG4gICAgICAgIF9tYWtlTW92ZUxlZnRQbGF5ZXIoZ2FtZWJvYXJkTGVmdCwgZ2FtZWJvYXJkUmlnaHQpXG4gICAgfVxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydE1vdmVzXG4gICAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZUNvbnRyb2xsZXI7XG4iLCJjb25zdCBDb21wdXRlciA9ICgoKSA9PiB7XG5cbiAgICBsZXQgaGl0U3RvcmFnZSA9IFtdO1xuICAgIGxldCBuZXh0SGl0UXVldWUgPSBbXTtcblxuICAgIGNvbnN0IGdldEhpdFN0b3JhZ2UgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBoaXRTdG9yYWdlXG4gICAgfVxuXG4gICAgY29uc3QgZ2V0TmV4dEhpdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIG5leHRIaXRRdWV1ZVxuICAgIH1cblxuICAgIGNvbnN0IF9zYXZlSGl0VG9TdG9yYWdlID0gKGdhbWVib2FyZCwgeCwgeSkgPT4ge1xuXG4gICAgICAgIGxldCBmaWVsZCA9IGdhbWVib2FyZC5maWVsZHNbeF1beV1cblxuICAgICAgICBpZiAoZmllbGQuc2hpcCA9PSBudWxsKSByZXR1cm5cbiAgICAgICAgXG4gICAgICAgIGhpdFN0b3JhZ2UucHVzaChbIHgsIHkgXSlcblxuICAgICAgICBpZiAoeC0xID49IDAgJiYgeCsxIDw9IDkpIHtcbiAgICAgICAgICAgIG5leHRIaXRRdWV1ZS5wdXNoKFsgeC0xICwgeSBdKVxuICAgICAgICAgICAgbmV4dEhpdFF1ZXVlLnB1c2goWyB4KzEgLCB5IF0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHktMSA+PSAwICYmIHkrMSA8PSA5KSB7XG4gICAgICAgICAgICBuZXh0SGl0UXVldWUucHVzaChbIHggLCB5LTEgXSlcbiAgICAgICAgICAgIG5leHRIaXRRdWV1ZS5wdXNoKFsgeCAsIHkrMSBdKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0UmFuZG9tTW92ZSA9IChnYW1lYm9hcmQpID0+IHtcblxuICAgICAgICAvLyBnZXQgXCJzbWFydFwiIG1vdmVcbiAgICAgICAgaWYgKGdldE5leHRIaXQoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0TmV4dEhpdCgpLnBvcCgpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICAgICAgX3NhdmVIaXRUb1N0b3JhZ2UoZ2FtZWJvYXJkLCB4LCB5KVxuXG4gICAgICAgIHJldHVybiBbeCx5XVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldFJhbmRvbU1vdmVcbiAgICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBDb21wdXRlcjsiLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcblxuICAgIGNvbnN0IEZpZWxkID0ge1xuICAgICAgICBzaGlwIDogbnVsbCxcbiAgICAgICAgaGl0IDogbnVsbCxcbiAgICAgICAgbWlzcyA6IG51bGxcbiAgICB9XG5cbiAgICBsZXQgbGFzdE9uZVdhc0hpdCA9IGZhbHNlO1xuXG4gICAgY29uc3QgZ2V0TGFzdEhpdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGxhc3RPbmVXYXNIaXRcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgZ2FtZWJvYXJkIGdyaWQgd2l0aCBGaWVsZCBvYmplY3QgaW4gZWFjaCBmaWVsZFxuICAgIGNvbnN0IF9jcmVhdGVGaWVsZE9iamVjdCA9IChkaW0gPSAxMCkgPT4ge1xuICAgICAgICBsZXQgZ3JpZCA9IFtdO1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSBkaW0gLSAxOyB4KyspIHtcbiAgICAgICAgICAgIGdyaWQucHVzaChbXSlcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IGRpbSAtIDE7IHkrKykge1xuICAgICAgICAgICAgICAgIGdyaWRbeF0ucHVzaCh7Li4uRmllbGR9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBncmlkXG4gICAgfVxuXG4gICAgLy8gaW5pdGlhbGl6ZSBncmlkXG4gICAgY29uc3QgZmllbGRzID0gX2NyZWF0ZUZpZWxkT2JqZWN0KCk7XG5cbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcExlbmd0aCwgY29vcmRzKSA9PiB7XG5cbiAgICAgICAgY29uc3QgbmV3U2hpcCA9IFNoaXAoc2hpcExlbmd0aClcblxuICAgICAgICBmb3IgKGxldCBjb29yZFBhaXIgaW4gY29vcmRzKSB7XG4gICAgICAgICAgICBsZXQgeENvb3JkID0gY29vcmRzW2Nvb3JkUGFpcl1bMF1cbiAgICAgICAgICAgIGxldCB5Q29vcmQgPSBjb29yZHNbY29vcmRQYWlyXVsxXVxuICAgICAgICAgICAgZmllbGRzW3hDb29yZF1beUNvb3JkXS5zaGlwID0gbmV3U2hpcDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuXG4gICAgICAgIGxldCBhdHRhY2tlZEZpZWxkID0gZmllbGRzW3hdW3ldO1xuXG4gICAgICAgIGlmIChhdHRhY2tlZEZpZWxkLnNoaXAgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGF0dGFja2VkRmllbGQuc2hpcC5oaXQoKTtcbiAgICAgICAgICAgIGF0dGFja2VkRmllbGQuaGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGxhc3RPbmVXYXNIaXQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXR0YWNrZWRGaWVsZC5taXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIGxhc3RPbmVXYXNIaXQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGdhbWVib2FyZExvc3QgPSAoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3Qgcm93IGluIGZpZWxkcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWVsZCBpbiBmaWVsZHNbcm93XSkge1xuICAgICAgICAgICAgICAgIGlmIChmaWVsZHNbcm93XVtmaWVsZF0uc2hpcCAhPT0gbnVsbCAmJiBmaWVsZHNbcm93XVtmaWVsZF0uaGl0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgaXNWYWxpZE1vdmUgPSAoeCwgeSkgPT4ge1xuICAgICAgICBsZXQgZmllbGQgPSBmaWVsZHNbeF1beV07XG4gICAgICAgIGlmIChmaWVsZC5oaXQgfHwgZmllbGQubWlzcykgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmaWVsZHMsXG4gICAgICAgIHBsYWNlU2hpcCxcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcbiAgICAgICAgZ2FtZWJvYXJkTG9zdCxcbiAgICAgICAgaXNWYWxpZE1vdmUsXG4gICAgICAgIGdldExhc3RIaXRcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDsgICAiLCJjb25zdCBMYXlvdXQgPSAoZnVuY3Rpb24gKCkge1xuICAgIFxuICAgIGNvbnN0IGJvYXRMYXlvdXRzID0ge1xuICAgICAgICAgIFwiU3VibWFyaW5lXCI6IFtcbiAgICAgICAgICAgIFs1LCBbWzcsIDFdLCBbNywgMl0sIFs3LCAzXSwgWzcsIDRdLCBbNywgNV1dXSxcbiAgICAgICAgICAgIFs0LCBbWzksIDFdLCBbOSwgMl0sIFs5LCAzXSwgWzksIDRdXV0sXG4gICAgICAgICAgICBbMywgW1syLCA0XSwgWzMsIDRdLCBbNCwgNF1dXSxcbiAgICAgICAgICAgIFsyLCBbWzYsIDddLCBbNywgN11dXSxcbiAgICAgICAgICAgIFsyLCBbWzksIDddLCBbMCwgN11dXSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiUGlyYXRlXCI6IFtcbiAgICAgICAgICAgIFs1LCBbWzIsIDZdLCBbMywgNl0sIFs0LCA2XSwgWzUsIDZdLCBbNiwgNl1dXSxcbiAgICAgICAgICAgIFs0LCBbWzEsIDhdLCBbMiwgOF0sIFszLCA4XSwgWzQsIDhdXV0sXG4gICAgICAgICAgICBbMywgW1s2LCA5XSwgWzcsIDldLCBbOCwgOV1dXSxcbiAgICAgICAgICAgIFsyLCBbWzksIDBdLCBbMCwgMF1dXSxcbiAgICAgICAgICAgIFsyLCBbWzEsIDFdLCBbMSwgMl1dXSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiRHVja1wiOiBbXG4gICAgICAgICAgICBbNSwgW1sxLCAzXSwgWzIsIDNdLCBbMywgM10sIFs0LCAzXSwgWzUsIDNdXV0sXG4gICAgICAgICAgICBbNCwgW1s4LCAxXSwgWzgsIDJdLCBbOCwgM10sIFs4LCA0XV1dLFxuICAgICAgICAgICAgWzMsIFtbNiwgNV0sIFs2LCA2XSwgWzYsIDddXV0sXG4gICAgICAgICAgICBbMiwgW1s5LCA5XSwgWzAsIDldXV0sXG4gICAgICAgICAgICBbMiwgW1szLCA3XSwgWzQsIDddXV1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiU3BhY2VzaGlwXCI6IFtcbiAgICAgICAgICAgIFs1LCBbWzIsIDddLCBbMywgN10sIFs0LCA3XSwgWzUsIDddLCBbNiwgN11dXSxcbiAgICAgICAgICAgIFs0LCBbWzgsIDRdLCBbOCwgNV0sIFs4LCA2XSwgWzgsIDddXV0sXG4gICAgICAgICAgICBbMywgW1swLCAwXSwgWzEsIDBdLCBbMiwgMF1dXSxcbiAgICAgICAgICAgIFsyLCBbWzcsIDFdLCBbNywgMl1dXSxcbiAgICAgICAgICAgIFsyLCBbWzksIDJdLCBbOSwgM11dXVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJCYW5hbmFcIjogW1xuICAgICAgICAgICAgWzUsIFtbMywgMV0sIFs0LCAxXSwgWzUsIDFdLCBbNiwgMV0sIFs3LCAxXV1dLFxuICAgICAgICAgICAgWzQsIFtbMCwgM10sIFswLCA0XSwgWzAsIDVdLCBbMCwgNl1dXSxcbiAgICAgICAgICAgIFszLCBbWzIsIDNdLCBbMiwgNF0sIFsyLCA1XV1dLFxuICAgICAgICAgICAgWzIsIFtbNSwgNl0sIFs2LCA2XV1dLFxuICAgICAgICAgICAgWzIsIFtbOSwgOF0sIFs5LCA5XV1dXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIllhY2h0XCI6IFtcbiAgICAgICAgICAgIFs1LCBbWzAsIDhdLCBbOSwgOF0sIFs4LCA4XSwgWzcsIDhdLCBbNiwgOF1dXSxcbiAgICAgICAgICAgIFs0LCBbWzEsIDVdLCBbMSwgNl0sIFsxLCA3XSwgWzEsIDhdXV0sXG4gICAgICAgICAgICBbMywgW1szLCA0XSwgWzQsIDRdLCBbNSwgNF1dXSxcbiAgICAgICAgICAgIFsyLCBbWzQsIDldLCBbNSwgOV1dXSxcbiAgICAgICAgICAgIFsyLCBbWzcsIDJdLCBbOCwgMl1dXVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJHYWxsZW9uXCI6IFtcbiAgICAgICAgICAgIFs1LCBbWzYsIDFdLCBbNiwgMl0sIFs2LCAzXSwgWzYsIDRdLCBbNiwgNV1dXSxcbiAgICAgICAgICAgIFs0LCBbWzksIDNdLCBbOSwgNF0sIFs5LCA1XSwgWzksIDZdXV0sXG4gICAgICAgICAgICBbMywgW1syLCA2XSwgWzMsIDZdLCBbNCwgNl1dXSxcbiAgICAgICAgICAgIFsyLCBbWzgsIDldLCBbOSwgOV1dXSxcbiAgICAgICAgICAgIFsyLCBbWzAsIDBdLCBbMSwgMF1dXVxuICAgICAgICAgIF1cbiAgICAgIH07XG4gICAgXG4gICAgY29uc3QgX2dldFJhbmRvbUxheW91dCA9ICgpID0+IHtcbiAgICAgICAgbGV0IG5hbWUgPSBPYmplY3Qua2V5cyhib2F0TGF5b3V0cylbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNyldO1xuICAgICAgICBsZXQgbGF5b3V0ID0gYm9hdExheW91dHNbbmFtZV07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWUgOiBuYW1lLFxuICAgICAgICAgICAgbGF5b3V0IDogbGF5b3V0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhcHBseUxheW91dCA9IChnYW1lYm9hcmQpID0+IHtcblxuICAgICAgICBsZXQgcmFuZG9tQ2hvaWNlID0gX2dldFJhbmRvbUxheW91dCgpO1xuICAgICAgICBsZXQgZnVubnlOYW1lID0gcmFuZG9tQ2hvaWNlLm5hbWU7XG4gICAgICAgIGxldCBsYXlvdXQgPSByYW5kb21DaG9pY2UubGF5b3V0O1xuICAgICAgICBjb25zb2xlLmxvZyhsYXlvdXQpXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5b3V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc2hpcCA9IGxheW91dFtpXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwWzBdLCBzaGlwWzFdKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bm55TmFtZVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICBhcHBseUxheW91dFxuICAgIH1cblxuXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBMYXlvdXQ7IiwiY29uc3QgUGxheWVyID0gKG5hbWUpID0+IHtcblxuICAgIGxldCB0dXJuID0gZmFsc2U7XG5cbiAgICBjb25zdCBpc1R1cm4gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgdG9nZ2xlVHVybiA9ICgpID0+IHtcbiAgICAgICAgdHVybiA9IHR1cm4gPyBmYWxzZSA6IHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lLFxuICAgICAgICBpc1R1cm4sXG4gICAgICAgIHRvZ2dsZVR1cm5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJjb25zdCBTaGlwID0gKCB1bml0cyApID0+IHtcblxuICAgIGNvbnN0IGxlbmd0aCA9IHVuaXRzO1xuXG4gICAgbGV0IGhpdHMgPSAwO1xuXG4gICAgY29uc3QgZ2V0SGl0cyA9ICgpID0+IGhpdHNcblxuICAgIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGlzU3VuaygpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGFscmVhZHkgc3Vua1wiKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGl0cysrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiBnZXRIaXRzKCkgPT0gbGVuZ3RoID8gdHJ1ZSA6IGZhbHNlXG4gXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGVuZ3RoLFxuICAgICAgICBoaXQsXG4gICAgICAgIGdldEhpdHMsXG4gICAgICAgIGlzU3Vua1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZmFjdG9yaWVzL2dhbWVib2FyZFwiXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL2ZhY3Rvcmllcy9wbGF5ZXJcIlxuaW1wb3J0IGdhbWVWaWV3IGZyb20gXCIuL3ZpZXcvZ2FtZVZpZXdcIlxuaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXIvZ2FtZUNvbnRyb2xsZXJcIlxuaW1wb3J0IExheW91dCBmcm9tIFwiLi9mYWN0b3JpZXMvbGF5b3V0XCJcblxuZXhwb3J0IGZ1bmN0aW9uIEdhbWUgKCkge1xuXG5cbiAgICBcblxuICAgIGNvbnN0IGdhbWVib2FyZEwgPSBHYW1lYm9hcmQoKVxuICAgIGNvbnNvbGUubG9nKExheW91dC5hcHBseUxheW91dChnYW1lYm9hcmRMKSlcbiAgICBnYW1lVmlldy5yZW5kZXJMZWZ0R2FtZWJvYXJkKGdhbWVib2FyZEwpXG5cbiAgICBjb25zdCBnYW1lYm9hcmRSID0gR2FtZWJvYXJkKClcbiAgICBnYW1lYm9hcmRSLnBsYWNlU2hpcCg0LCBbWzgsOF0sIFs4LDddLCBbOCw2XSwgWzgsNV1dKVxuICAgIGdhbWVib2FyZFIucGxhY2VTaGlwKDIsIFtbMiwyXSwgWzMsMl1dKVxuICAgIGdhbWVWaWV3LnJlbmRlclJpZ2h0R2FtZWJvYXJkKGdhbWVib2FyZFIpXG5cbiAgICBnYW1lQ29udHJvbGxlci5zdGFydE1vdmVzKGdhbWVib2FyZEwsIGdhbWVib2FyZFIpXG59OyIsIlxuXG4vLyByZW5kZXIgZ2FtZWJvYXJkIChnYW1lYm9hcmQuZmllbGRzLCB2aXNpYmxlID0gdHJ1ZSlcblxuY29uc3QgZ2FtZVZpZXcgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgZ2FtZWJvYXJkTGVmdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZWJvYXJkT25lXCIpO1xuICAgIGNvbnN0IGdhbWVib2FyZFJpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lYm9hcmRUd29cIilcblxuICAgIGNvbnN0IHJlbmRlckdhbWVib2FyZCA9IChnYW1lYm9hcmQsIGdhbWVib2FyZEVsZW1lbnQsIHZpc2libGUgPSB0cnVlKSA9PiB7XG5cbiAgICAgICAgLy8gaXRlcmF0ZSB0aHJvdWdoIGFsbCBmaWVsZHMgb2YgYSBnYW1lYm9hcmRcbiAgICAgICAgZm9yIChjb25zdCByb3cgaW4gZ2FtZWJvYXJkLmZpZWxkcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWVsZCBpbiBnYW1lYm9hcmQuZmllbGRzW3Jvd10pIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgY2VsbCBkb20gZWxlbWVudFxuICAgICAgICAgICAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuXG4gICAgICAgICAgICAgICAgLy8gYWRkIGZpZWxkIGNsYXNzIGFuZCBhcHByb3ByaWF0ZSBmaWVsZCBzdGF0ZSBzdHlsaW5nXG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiZmllbGRcIiwgX2hpdE1pc3NTaGlwKGdhbWVib2FyZC5maWVsZHNbcm93XVtmaWVsZF0pKVxuICAgICAgICAgICAgICAgIGlmICghdmlzaWJsZSkgY2VsbC5jbGFzc0xpc3QuYWRkKFwiaW52aXNpYmxlXCIpXG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgZGF0YSByb3cgYW5kIGNvbHVtbiBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQucm93ID0gcm93O1xuICAgICAgICAgICAgICAgIGNlbGwuZGF0YXNldC5jb2x1bW4gPSBmaWVsZFxuXG4gICAgICAgICAgICAgICAgLy8gYXBwZW5kIGZpZWxkIHRvIGdhbWVib2FyZFxuICAgICAgICAgICAgICAgIGdhbWVib2FyZEVsZW1lbnQuYXBwZW5kQ2hpbGQoY2VsbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNsZWFyR2FtZWJvYXJkID0gKGdhbWVib2FyZEVsZW1lbnQpID0+IHtcbiAgICAgICAgLy8gbG9va3VwIGZpcnN0IGNoaWxkIGFuZCBkZWxldGUgbGFzdCBjaGlsZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29uc1xuICAgICAgICB3aGlsZSAoZ2FtZWJvYXJkRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBnYW1lYm9hcmRFbGVtZW50LnJlbW92ZUNoaWxkKGdhbWVib2FyZEVsZW1lbnQubGFzdENoaWxkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0VXBGaWVsZExpc3RlbmVyID0gKGdhbWVib2FyZEVsZW1lbnQsIGNhbGxiYWNrKSA9PiB7XG5cbiAgICAgICAgbGV0IGNoaWxkRGl2cyA9IGdhbWVib2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWVsZFwiKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGREaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gY2hpbGREaXZzW2ldO1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2FsbGJhY2soZWxlbWVudCkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBfaGl0TWlzc1NoaXAgPSAoZmllbGQpID0+IHtcblxuICAgICAgICBpZiAoZmllbGQuc2hpcCAhPT0gbnVsbCAmJiBmaWVsZC5oaXQgIT09IG51bGwpIHJldHVybiBcImhpdFNoaXBcIiAgLy8gc2hpcCB0aGF0IGhhcyBiZWVuIGhpdFxuICAgICAgICBpZiAoZmllbGQuc2hpcCAhPT0gbnVsbCAmJiBmaWVsZC5oaXQgPT0gbnVsbCkgcmV0dXJuIFwic2hpcFwiICAvLyBzaGlwIG5vdCBoaXQgeWV0XG4gICAgICAgIGlmIChmaWVsZC5taXNzKSByZXR1cm4gXCJtaXNzXCIgLy8gd2F0ZXIgYnV0IGFscmVhZHkgaGl0OiBtaXNzXG4gICAgICAgIHJldHVybiBcIndhdGVyXCIgLy8ganVzdCB3YXRlclxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlbmRlckxlZnRHYW1lYm9hcmQgKGdhbWVib2FyZCkge1xuICAgICAgICAgICAgcmVuZGVyR2FtZWJvYXJkKGdhbWVib2FyZCwgZ2FtZWJvYXJkTGVmdClcbiAgICAgICAgfSxcblxuICAgICAgICByZW5kZXJSaWdodEdhbWVib2FyZCAoZ2FtZWJvYXJkKSB7XG4gICAgICAgICAgICByZW5kZXJHYW1lYm9hcmQoZ2FtZWJvYXJkLCBnYW1lYm9hcmRSaWdodCwgZmFsc2UpXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0VXBGaWVsZExpc3RlbmVyTGVmdCAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHNldFVwRmllbGRMaXN0ZW5lcihnYW1lYm9hcmRMZWZ0LCBjYWxsYmFjaylcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRVcEZpZWxkTGlzdGVuZXJSaWdodCAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHNldFVwRmllbGRMaXN0ZW5lcihnYW1lYm9hcmRSaWdodCwgY2FsbGJhY2spXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xlYXJMZWZ0R2FtZWJvYXJkICgpIHtcbiAgICAgICAgICAgIGNsZWFyR2FtZWJvYXJkIChnYW1lYm9hcmRMZWZ0KVxuICAgICAgICB9LFxuXG4gICAgICAgIGNsZWFyUmlnaHRHYW1lYm9hcmQgKCkge1xuICAgICAgICAgICAgY2xlYXJHYW1lYm9hcmQgKGdhbWVib2FyZFJpZ2h0KVxuICAgICAgICB9LFxuICAgIH1cblxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZVZpZXc7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vZ2FtZVwiXG5cbkdhbWUoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==