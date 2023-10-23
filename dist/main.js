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
Object(function webpackMissingModule() { var e = new Error("Cannot find module './factories/player'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBUztBQUNoQyxnQkFBZ0IseURBQU07QUFDdEIsSUFBSSxzREFBUTs7QUFFWix1QkFBdUIsZ0VBQVM7QUFDaEM7QUFDQTtBQUNBLElBQUksc0RBQVE7O0FBRVosSUFBSSxrRUFBYztBQUNsQjs7Ozs7Ozs7Ozs7Ozs7OztBQ25CQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLHdCQUF3QixzQkFBc0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUEsQ0FBQzs7QUFFRCxpRUFBZSxRQUFROzs7Ozs7VUNyRnZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNONkI7O0FBRTdCLDJDQUFJLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbnRyb2xsZXIvZ2FtZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2xheW91dC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ZpZXcvZ2FtZVZpZXcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdhbWVWaWV3IGZyb20gXCIuLi92aWV3L2dhbWVWaWV3XCI7XG5pbXBvcnQgQ29tcHV0ZXIgZnJvbSBcIi4uL2ZhY3Rvcmllcy9jb21wdXRlclwiO1xuXG5cbi8vIHRoaXMgbW9kdWxlIGNvbWJpbmVzIGRvbSAoZ2FtZVZpZXcpIGFuZCBsb2dpYyBmdW5jdGlvbnMgKGZhY3RvcmllcylcbmNvbnN0IGdhbWVDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IF90aW1lT3V0ID0gNzAwO1xuICAgIFxuICAgIC8vIHJlYWwgcGxheWVyXG4gICAgY29uc3QgX21ha2VNb3ZlTGVmdFBsYXllciA9IChnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgZ2FtZVZpZXcuc2V0VXBGaWVsZExpc3RlbmVyUmlnaHQoKGZpZWxkKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIGRvbnQgc2V0IHVwIGxpc3RlbmVyIGlmIGZpZWxkIHdhcyBhbHJlYWR5IHBsYXllZFxuICAgICAgICAgICAgaWYgKCFnYW1lYm9hcmRSaWdodC5pc1ZhbGlkTW92ZShmaWVsZC5kYXRhc2V0LnJvdywgZmllbGQuZGF0YXNldC5jb2x1bW4pKSByZXR1cm5cblxuICAgICAgICAgICAgLy8gcmVnaXN0ZXIgYXR0YWNrIGFuZCByZW5kZXIgdXBkYXRlZCBnYW1lYm9hcmRcbiAgICAgICAgICAgIGdhbWVib2FyZFJpZ2h0LnJlY2VpdmVBdHRhY2soZmllbGQuZGF0YXNldC5yb3csIGZpZWxkLmRhdGFzZXQuY29sdW1uKTtcbiAgICAgICAgICAgIGdhbWVWaWV3LmNsZWFyUmlnaHRHYW1lYm9hcmQoKTtcbiAgICAgICAgICAgIGdhbWVWaWV3LnJlbmRlclJpZ2h0R2FtZWJvYXJkKGdhbWVib2FyZFJpZ2h0KTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGlmIGdhbWUgaXMgb3ZlclxuICAgICAgICAgICAgaWYgKGdhbWVib2FyZFJpZ2h0LmdhbWVib2FyZExvc3QoKSA9PSB0cnVlKSByZXR1cm4gY29uc29sZS5sb2coXCJQbGF5ZXIgUmlnaHQgbG9zdFwiKVxuXG4gICAgICAgICAgICAvLyBpbml0aWF0ZSBuZXh0IG1vdmVcbiAgICAgICAgICAgIGdhbWVib2FyZFJpZ2h0LmdldExhc3RIaXQoKSA/XG4gICAgICAgICAgICBfbWFrZU1vdmVMZWZ0UGxheWVyKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KSA6XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IF9tYWtlTW92ZVJpZ2h0UGxheWVyKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KSwgX3RpbWVPdXQpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vIGNvbXB1dGVyIHBsYXllclxuICAgIGNvbnN0IF9tYWtlTW92ZVJpZ2h0UGxheWVyID0gKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KSA9PiB7XG5cbiAgICAgICAgbGV0IGNvbXB1dGVyQ2hvaWNlID0gQ29tcHV0ZXIuZ2V0UmFuZG9tTW92ZShnYW1lYm9hcmRMZWZ0KTtcblxuICAgICAgICB3aGlsZSAoIWdhbWVib2FyZExlZnQuaXNWYWxpZE1vdmUoY29tcHV0ZXJDaG9pY2VbMF0sIGNvbXB1dGVyQ2hvaWNlWzFdKSkge1xuICAgICAgICAgICAgY29tcHV0ZXJDaG9pY2UgPSBDb21wdXRlci5nZXRSYW5kb21Nb3ZlKGdhbWVib2FyZExlZnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVnaXN0ZXIgYXR0YWNrIGFuZCByZW5kZXIgdXBkYXRlZCBnYW1lYm9hcmRcbiAgICAgICAgZ2FtZWJvYXJkTGVmdC5yZWNlaXZlQXR0YWNrKGNvbXB1dGVyQ2hvaWNlWzBdLCBjb21wdXRlckNob2ljZVsxXSk7XG4gICAgICAgIGdhbWVWaWV3LmNsZWFyTGVmdEdhbWVib2FyZCgpO1xuICAgICAgICBnYW1lVmlldy5yZW5kZXJMZWZ0R2FtZWJvYXJkKGdhbWVib2FyZExlZnQpO1xuXG4gICAgICAgIC8vIHJldHVybiBpZiBnYW1lIGlzIG92ZXJcbiAgICAgICAgaWYgKGdhbWVib2FyZExlZnQuZ2FtZWJvYXJkTG9zdCgpID09IHRydWUpIHJldHVybiBjb25zb2xlLmxvZyhcIlBsYXllciBMZWZ0IGxvc3RcIilcblxuICAgICAgICAvLyBpbml0aWF0ZSBuZXh0IG1vdmVcbiAgICAgICAgZ2FtZWJvYXJkTGVmdC5nZXRMYXN0SGl0KCkgP1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IF9tYWtlTW92ZVJpZ2h0UGxheWVyKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KSwgX3RpbWVPdXQpOlxuICAgICAgICBfbWFrZU1vdmVMZWZ0UGxheWVyKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gdGhlIGZ1bmN0aW9ucyBtYWtlbW92ZXBsYXllciByZWN1cnNpdmVseSBjYWxsIGVhY2ggb3RoZXIgaW5zaWRlIGFub3RoZXIgdW50aWxsIHRoZSB3aW4gY29uZGl0aW9uIHN0b3BzIHRoZSBnYW1lXG4gICAgY29uc3Qgc3RhcnRNb3ZlcyA9IChnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodCkgPT4ge1xuICAgICAgICBfbWFrZU1vdmVMZWZ0UGxheWVyKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnRNb3Zlc1xuICAgIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVDb250cm9sbGVyO1xuIiwiY29uc3QgQ29tcHV0ZXIgPSAoKCkgPT4ge1xuXG4gICAgbGV0IGhpdFN0b3JhZ2UgPSBbXTtcbiAgICBsZXQgbmV4dEhpdFF1ZXVlID0gW107XG5cbiAgICBjb25zdCBnZXRIaXRTdG9yYWdlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gaGl0U3RvcmFnZVxuICAgIH1cblxuICAgIGNvbnN0IGdldE5leHRIaXQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXh0SGl0UXVldWVcbiAgICB9XG5cbiAgICBjb25zdCBfc2F2ZUhpdFRvU3RvcmFnZSA9IChnYW1lYm9hcmQsIHgsIHkpID0+IHtcblxuICAgICAgICBsZXQgZmllbGQgPSBnYW1lYm9hcmQuZmllbGRzW3hdW3ldXG5cbiAgICAgICAgaWYgKGZpZWxkLnNoaXAgPT0gbnVsbCkgcmV0dXJuXG4gICAgICAgIFxuICAgICAgICBoaXRTdG9yYWdlLnB1c2goWyB4LCB5IF0pXG5cbiAgICAgICAgaWYgKHgtMSA+PSAwICYmIHgrMSA8PSA5KSB7XG4gICAgICAgICAgICBuZXh0SGl0UXVldWUucHVzaChbIHgtMSAsIHkgXSlcbiAgICAgICAgICAgIG5leHRIaXRRdWV1ZS5wdXNoKFsgeCsxICwgeSBdKVxuICAgICAgICB9XG4gICAgICAgIGlmICh5LTEgPj0gMCAmJiB5KzEgPD0gOSkge1xuICAgICAgICAgICAgbmV4dEhpdFF1ZXVlLnB1c2goWyB4ICwgeS0xIF0pXG4gICAgICAgICAgICBuZXh0SGl0UXVldWUucHVzaChbIHggLCB5KzEgXSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGdldFJhbmRvbU1vdmUgPSAoZ2FtZWJvYXJkKSA9PiB7XG5cbiAgICAgICAgLy8gZ2V0IFwic21hcnRcIiBtb3ZlXG4gICAgICAgIGlmIChnZXROZXh0SGl0KCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldE5leHRIaXQoKS5wb3AoKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgICAgIF9zYXZlSGl0VG9TdG9yYWdlKGdhbWVib2FyZCwgeCwgeSlcblxuICAgICAgICByZXR1cm4gW3gseV1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRSYW5kb21Nb3ZlXG4gICAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tcHV0ZXI7IiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBGaWVsZCA9IHtcbiAgICAgICAgc2hpcCA6IG51bGwsXG4gICAgICAgIGhpdCA6IG51bGwsXG4gICAgICAgIG1pc3MgOiBudWxsXG4gICAgfVxuXG4gICAgbGV0IGxhc3RPbmVXYXNIaXQgPSBmYWxzZTtcblxuICAgIGNvbnN0IGdldExhc3RIaXQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBsYXN0T25lV2FzSGl0XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGdhbWVib2FyZCBncmlkIHdpdGggRmllbGQgb2JqZWN0IGluIGVhY2ggZmllbGRcbiAgICBjb25zdCBfY3JlYXRlRmllbGRPYmplY3QgPSAoZGltID0gMTApID0+IHtcbiAgICAgICAgbGV0IGdyaWQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPD0gZGltIC0gMTsgeCsrKSB7XG4gICAgICAgICAgICBncmlkLnB1c2goW10pXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSBkaW0gLSAxOyB5KyspIHtcbiAgICAgICAgICAgICAgICBncmlkW3hdLnB1c2goey4uLkZpZWxkfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JpZFxuICAgIH1cblxuICAgIC8vIGluaXRpYWxpemUgZ3JpZFxuICAgIGNvbnN0IGZpZWxkcyA9IF9jcmVhdGVGaWVsZE9iamVjdCgpO1xuXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBMZW5ndGgsIGNvb3JkcykgPT4ge1xuXG4gICAgICAgIGNvbnN0IG5ld1NoaXAgPSBTaGlwKHNoaXBMZW5ndGgpXG5cbiAgICAgICAgZm9yIChsZXQgY29vcmRQYWlyIGluIGNvb3Jkcykge1xuICAgICAgICAgICAgbGV0IHhDb29yZCA9IGNvb3Jkc1tjb29yZFBhaXJdWzBdXG4gICAgICAgICAgICBsZXQgeUNvb3JkID0gY29vcmRzW2Nvb3JkUGFpcl1bMV1cbiAgICAgICAgICAgIGZpZWxkc1t4Q29vcmRdW3lDb29yZF0uc2hpcCA9IG5ld1NoaXA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcblxuICAgICAgICBsZXQgYXR0YWNrZWRGaWVsZCA9IGZpZWxkc1t4XVt5XTtcblxuICAgICAgICBpZiAoYXR0YWNrZWRGaWVsZC5zaGlwICE9PSBudWxsKSB7XG4gICAgICAgICAgICBhdHRhY2tlZEZpZWxkLnNoaXAuaGl0KCk7XG4gICAgICAgICAgICBhdHRhY2tlZEZpZWxkLmhpdCA9IHRydWU7XG4gICAgICAgICAgICBsYXN0T25lV2FzSGl0ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF0dGFja2VkRmllbGQubWlzcyA9IHRydWU7XG4gICAgICAgICAgICBsYXN0T25lV2FzSGl0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBnYW1lYm9hcmRMb3N0ID0gKCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHJvdyBpbiBmaWVsZHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmllbGQgaW4gZmllbGRzW3Jvd10pIHtcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRzW3Jvd11bZmllbGRdLnNoaXAgIT09IG51bGwgJiYgZmllbGRzW3Jvd11bZmllbGRdLmhpdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGlzVmFsaWRNb3ZlID0gKHgsIHkpID0+IHtcbiAgICAgICAgbGV0IGZpZWxkID0gZmllbGRzW3hdW3ldO1xuICAgICAgICBpZiAoZmllbGQuaGl0IHx8IGZpZWxkLm1pc3MpIHJldHVybiBmYWxzZVxuXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmllbGRzLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgICAgIGdhbWVib2FyZExvc3QsXG4gICAgICAgIGlzVmFsaWRNb3ZlLFxuICAgICAgICBnZXRMYXN0SGl0XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7ICAgIiwiY29uc3QgTGF5b3V0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBcbiAgICBjb25zdCBib2F0TGF5b3V0cyA9IHtcbiAgICAgICAgICBcIlN1Ym1hcmluZVwiOiBbXG4gICAgICAgICAgICBbNSwgW1s3LCAxXSwgWzcsIDJdLCBbNywgM10sIFs3LCA0XSwgWzcsIDVdXV0sXG4gICAgICAgICAgICBbNCwgW1s5LCAxXSwgWzksIDJdLCBbOSwgM10sIFs5LCA0XV1dLFxuICAgICAgICAgICAgWzMsIFtbMiwgNF0sIFszLCA0XSwgWzQsIDRdXV0sXG4gICAgICAgICAgICBbMiwgW1s2LCA3XSwgWzcsIDddXV0sXG4gICAgICAgICAgICBbMiwgW1s5LCA3XSwgWzAsIDddXV0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIlBpcmF0ZVwiOiBbXG4gICAgICAgICAgICBbNSwgW1syLCA2XSwgWzMsIDZdLCBbNCwgNl0sIFs1LCA2XSwgWzYsIDZdXV0sXG4gICAgICAgICAgICBbNCwgW1sxLCA4XSwgWzIsIDhdLCBbMywgOF0sIFs0LCA4XV1dLFxuICAgICAgICAgICAgWzMsIFtbNiwgOV0sIFs3LCA5XSwgWzgsIDldXV0sXG4gICAgICAgICAgICBbMiwgW1s5LCAwXSwgWzAsIDBdXV0sXG4gICAgICAgICAgICBbMiwgW1sxLCAxXSwgWzEsIDJdXV0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIkR1Y2tcIjogW1xuICAgICAgICAgICAgWzUsIFtbMSwgM10sIFsyLCAzXSwgWzMsIDNdLCBbNCwgM10sIFs1LCAzXV1dLFxuICAgICAgICAgICAgWzQsIFtbOCwgMV0sIFs4LCAyXSwgWzgsIDNdLCBbOCwgNF1dXSxcbiAgICAgICAgICAgIFszLCBbWzYsIDVdLCBbNiwgNl0sIFs2LCA3XV1dLFxuICAgICAgICAgICAgWzIsIFtbOSwgOV0sIFswLCA5XV1dLFxuICAgICAgICAgICAgWzIsIFtbMywgN10sIFs0LCA3XV1dXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIlNwYWNlc2hpcFwiOiBbXG4gICAgICAgICAgICBbNSwgW1syLCA3XSwgWzMsIDddLCBbNCwgN10sIFs1LCA3XSwgWzYsIDddXV0sXG4gICAgICAgICAgICBbNCwgW1s4LCA0XSwgWzgsIDVdLCBbOCwgNl0sIFs4LCA3XV1dLFxuICAgICAgICAgICAgWzMsIFtbMCwgMF0sIFsxLCAwXSwgWzIsIDBdXV0sXG4gICAgICAgICAgICBbMiwgW1s3LCAxXSwgWzcsIDJdXV0sXG4gICAgICAgICAgICBbMiwgW1s5LCAyXSwgWzksIDNdXV1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiQmFuYW5hXCI6IFtcbiAgICAgICAgICAgIFs1LCBbWzMsIDFdLCBbNCwgMV0sIFs1LCAxXSwgWzYsIDFdLCBbNywgMV1dXSxcbiAgICAgICAgICAgIFs0LCBbWzAsIDNdLCBbMCwgNF0sIFswLCA1XSwgWzAsIDZdXV0sXG4gICAgICAgICAgICBbMywgW1syLCAzXSwgWzIsIDRdLCBbMiwgNV1dXSxcbiAgICAgICAgICAgIFsyLCBbWzUsIDZdLCBbNiwgNl1dXSxcbiAgICAgICAgICAgIFsyLCBbWzksIDhdLCBbOSwgOV1dXVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJZYWNodFwiOiBbXG4gICAgICAgICAgICBbNSwgW1swLCA4XSwgWzksIDhdLCBbOCwgOF0sIFs3LCA4XSwgWzYsIDhdXV0sXG4gICAgICAgICAgICBbNCwgW1sxLCA1XSwgWzEsIDZdLCBbMSwgN10sIFsxLCA4XV1dLFxuICAgICAgICAgICAgWzMsIFtbMywgNF0sIFs0LCA0XSwgWzUsIDRdXV0sXG4gICAgICAgICAgICBbMiwgW1s0LCA5XSwgWzUsIDldXV0sXG4gICAgICAgICAgICBbMiwgW1s3LCAyXSwgWzgsIDJdXV1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiR2FsbGVvblwiOiBbXG4gICAgICAgICAgICBbNSwgW1s2LCAxXSwgWzYsIDJdLCBbNiwgM10sIFs2LCA0XSwgWzYsIDVdXV0sXG4gICAgICAgICAgICBbNCwgW1s5LCAzXSwgWzksIDRdLCBbOSwgNV0sIFs5LCA2XV1dLFxuICAgICAgICAgICAgWzMsIFtbMiwgNl0sIFszLCA2XSwgWzQsIDZdXV0sXG4gICAgICAgICAgICBbMiwgW1s4LCA5XSwgWzksIDldXV0sXG4gICAgICAgICAgICBbMiwgW1swLCAwXSwgWzEsIDBdXV1cbiAgICAgICAgICBdXG4gICAgICB9O1xuICAgIFxuICAgIGNvbnN0IF9nZXRSYW5kb21MYXlvdXQgPSAoKSA9PiB7XG4gICAgICAgIGxldCBuYW1lID0gT2JqZWN0LmtleXMoYm9hdExheW91dHMpW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDcpXTtcbiAgICAgICAgbGV0IGxheW91dCA9IGJvYXRMYXlvdXRzW25hbWVdO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lIDogbmFtZSxcbiAgICAgICAgICAgIGxheW91dCA6IGxheW91dFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYXBwbHlMYXlvdXQgPSAoZ2FtZWJvYXJkKSA9PiB7XG5cbiAgICAgICAgbGV0IHJhbmRvbUNob2ljZSA9IF9nZXRSYW5kb21MYXlvdXQoKTtcbiAgICAgICAgbGV0IGZ1bm55TmFtZSA9IHJhbmRvbUNob2ljZS5uYW1lO1xuICAgICAgICBsZXQgbGF5b3V0ID0gcmFuZG9tQ2hvaWNlLmxheW91dDtcbiAgICAgICAgY29uc29sZS5sb2cobGF5b3V0KVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheW91dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNoaXAgPSBsYXlvdXRbaV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcFswXSwgc2hpcFsxXSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5ueU5hbWVcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXBwbHlMYXlvdXRcbiAgICB9XG5cblxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgTGF5b3V0OyIsImNvbnN0IFNoaXAgPSAoIHVuaXRzICkgPT4ge1xuXG4gICAgY29uc3QgbGVuZ3RoID0gdW5pdHM7XG5cbiAgICBsZXQgaGl0cyA9IDA7XG5cbiAgICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0c1xuXG4gICAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgYWxyZWFkeSBzdW5rXCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoaXRzKytcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IGdldEhpdHMoKSA9PSBsZW5ndGggPyB0cnVlIDogZmFsc2VcbiBcbiAgICByZXR1cm4ge1xuICAgICAgICBsZW5ndGgsXG4gICAgICAgIGhpdCxcbiAgICAgICAgZ2V0SGl0cyxcbiAgICAgICAgaXNTdW5rXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9mYWN0b3JpZXMvZ2FtZWJvYXJkXCJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vZmFjdG9yaWVzL3BsYXllclwiXG5pbXBvcnQgZ2FtZVZpZXcgZnJvbSBcIi4vdmlldy9nYW1lVmlld1wiXG5pbXBvcnQgZ2FtZUNvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlci9nYW1lQ29udHJvbGxlclwiXG5pbXBvcnQgTGF5b3V0IGZyb20gXCIuL2ZhY3Rvcmllcy9sYXlvdXRcIlxuXG5leHBvcnQgZnVuY3Rpb24gR2FtZSAoKSB7XG5cblxuICAgIFxuXG4gICAgY29uc3QgZ2FtZWJvYXJkTCA9IEdhbWVib2FyZCgpXG4gICAgY29uc29sZS5sb2coTGF5b3V0LmFwcGx5TGF5b3V0KGdhbWVib2FyZEwpKVxuICAgIGdhbWVWaWV3LnJlbmRlckxlZnRHYW1lYm9hcmQoZ2FtZWJvYXJkTClcblxuICAgIGNvbnN0IGdhbWVib2FyZFIgPSBHYW1lYm9hcmQoKVxuICAgIGdhbWVib2FyZFIucGxhY2VTaGlwKDQsIFtbOCw4XSwgWzgsN10sIFs4LDZdLCBbOCw1XV0pXG4gICAgZ2FtZWJvYXJkUi5wbGFjZVNoaXAoMiwgW1syLDJdLCBbMywyXV0pXG4gICAgZ2FtZVZpZXcucmVuZGVyUmlnaHRHYW1lYm9hcmQoZ2FtZWJvYXJkUilcblxuICAgIGdhbWVDb250cm9sbGVyLnN0YXJ0TW92ZXMoZ2FtZWJvYXJkTCwgZ2FtZWJvYXJkUilcbn07IiwiXG5cbi8vIHJlbmRlciBnYW1lYm9hcmQgKGdhbWVib2FyZC5maWVsZHMsIHZpc2libGUgPSB0cnVlKVxuXG5jb25zdCBnYW1lVmlldyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBnYW1lYm9hcmRMZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lYm9hcmRPbmVcIik7XG4gICAgY29uc3QgZ2FtZWJvYXJkUmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVib2FyZFR3b1wiKVxuXG4gICAgY29uc3QgcmVuZGVyR2FtZWJvYXJkID0gKGdhbWVib2FyZCwgZ2FtZWJvYXJkRWxlbWVudCwgdmlzaWJsZSA9IHRydWUpID0+IHtcblxuICAgICAgICAvLyBpdGVyYXRlIHRocm91Z2ggYWxsIGZpZWxkcyBvZiBhIGdhbWVib2FyZFxuICAgICAgICBmb3IgKGNvbnN0IHJvdyBpbiBnYW1lYm9hcmQuZmllbGRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkIGluIGdhbWVib2FyZC5maWVsZHNbcm93XSkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBjZWxsIGRvbSBlbGVtZW50XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgZmllbGQgY2xhc3MgYW5kIGFwcHJvcHJpYXRlIGZpZWxkIHN0YXRlIHN0eWxpbmdcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJmaWVsZFwiLCBfaGl0TWlzc1NoaXAoZ2FtZWJvYXJkLmZpZWxkc1tyb3ddW2ZpZWxkXSkpXG4gICAgICAgICAgICAgICAgaWYgKCF2aXNpYmxlKSBjZWxsLmNsYXNzTGlzdC5hZGQoXCJpbnZpc2libGVcIilcblxuICAgICAgICAgICAgICAgIC8vIGFkZCBkYXRhIHJvdyBhbmQgY29sdW1uIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICAgICAgICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiA9IGZpZWxkXG5cbiAgICAgICAgICAgICAgICAvLyBhcHBlbmQgZmllbGQgdG8gZ2FtZWJvYXJkXG4gICAgICAgICAgICAgICAgZ2FtZWJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChjZWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJHYW1lYm9hcmQgPSAoZ2FtZWJvYXJkRWxlbWVudCkgPT4ge1xuICAgICAgICAvLyBsb29rdXAgZmlyc3QgY2hpbGQgYW5kIGRlbGV0ZSBsYXN0IGNoaWxkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zXG4gICAgICAgIHdoaWxlIChnYW1lYm9hcmRFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGdhbWVib2FyZEVsZW1lbnQucmVtb3ZlQ2hpbGQoZ2FtZWJvYXJkRWxlbWVudC5sYXN0Q2hpbGQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRVcEZpZWxkTGlzdGVuZXIgPSAoZ2FtZWJvYXJkRWxlbWVudCwgY2FsbGJhY2spID0+IHtcblxuICAgICAgICBsZXQgY2hpbGREaXZzID0gZ2FtZWJvYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpZWxkXCIpXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZERpdnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBjaGlsZERpdnNbaV07XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjYWxsYmFjayhlbGVtZW50KSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IF9oaXRNaXNzU2hpcCA9IChmaWVsZCkgPT4ge1xuXG4gICAgICAgIGlmIChmaWVsZC5zaGlwICE9PSBudWxsICYmIGZpZWxkLmhpdCAhPT0gbnVsbCkgcmV0dXJuIFwiaGl0U2hpcFwiICAvLyBzaGlwIHRoYXQgaGFzIGJlZW4gaGl0XG4gICAgICAgIGlmIChmaWVsZC5zaGlwICE9PSBudWxsICYmIGZpZWxkLmhpdCA9PSBudWxsKSByZXR1cm4gXCJzaGlwXCIgIC8vIHNoaXAgbm90IGhpdCB5ZXRcbiAgICAgICAgaWYgKGZpZWxkLm1pc3MpIHJldHVybiBcIm1pc3NcIiAvLyB3YXRlciBidXQgYWxyZWFkeSBoaXQ6IG1pc3NcbiAgICAgICAgcmV0dXJuIFwid2F0ZXJcIiAvLyBqdXN0IHdhdGVyXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVuZGVyTGVmdEdhbWVib2FyZCAoZ2FtZWJvYXJkKSB7XG4gICAgICAgICAgICByZW5kZXJHYW1lYm9hcmQoZ2FtZWJvYXJkLCBnYW1lYm9hcmRMZWZ0KVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbmRlclJpZ2h0R2FtZWJvYXJkIChnYW1lYm9hcmQpIHtcbiAgICAgICAgICAgIHJlbmRlckdhbWVib2FyZChnYW1lYm9hcmQsIGdhbWVib2FyZFJpZ2h0LCBmYWxzZSlcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRVcEZpZWxkTGlzdGVuZXJMZWZ0IChjYWxsYmFjaykge1xuICAgICAgICAgICAgc2V0VXBGaWVsZExpc3RlbmVyKGdhbWVib2FyZExlZnQsIGNhbGxiYWNrKVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldFVwRmllbGRMaXN0ZW5lclJpZ2h0IChjYWxsYmFjaykge1xuICAgICAgICAgICAgc2V0VXBGaWVsZExpc3RlbmVyKGdhbWVib2FyZFJpZ2h0LCBjYWxsYmFjaylcbiAgICAgICAgfSxcblxuICAgICAgICBjbGVhckxlZnRHYW1lYm9hcmQgKCkge1xuICAgICAgICAgICAgY2xlYXJHYW1lYm9hcmQgKGdhbWVib2FyZExlZnQpXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xlYXJSaWdodEdhbWVib2FyZCAoKSB7XG4gICAgICAgICAgICBjbGVhckdhbWVib2FyZCAoZ2FtZWJvYXJkUmlnaHQpXG4gICAgICAgIH0sXG4gICAgfVxuXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lVmlldzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9nYW1lXCJcblxuR2FtZSgpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9