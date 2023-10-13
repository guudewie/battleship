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
/* harmony import */ var _factories_gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factories/gameboard */ "./src/factories/gameboard.js");
/* harmony import */ var _factories_ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../factories/ship */ "./src/factories/ship.js");
/* harmony import */ var _factories_computer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../factories/computer */ "./src/factories/computer.js");






// this module combines dom (gameView) and logic functions (factories)
const gameController = (function () {

    const _timeOut = 700;
    
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

    const _makeMoveRightPlayer = (gameboardLeft, gameboardRight) => {

        
        let computerChoice = _factories_computer__WEBPACK_IMPORTED_MODULE_3__["default"].getRandomMove();

        while (!gameboardLeft.isValidMove(computerChoice[0], computerChoice[1])) {
            computerChoice = _factories_computer__WEBPACK_IMPORTED_MODULE_3__["default"].getRandomMove();
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

    // storge efor the current ship

    const getRandomMove = () => {

        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        return [x,y]
    }

    const getSmartMove = () => {

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





function Game () {

    let playerL = (0,_factories_player__WEBPACK_IMPORTED_MODULE_1__["default"])("L")
    let playerR = (0,_factories_player__WEBPACK_IMPORTED_MODULE_1__["default"])("R")

    const gameboardL = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])()
    gameboardL.placeShip(3, [[0,0], [0,1], [0,2]])
    gameboardL.placeShip(2, [[3,4], [2,4]])
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7QUFDTztBQUNWO0FBQ1E7OztBQUc3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBUTs7QUFFaEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxzREFBUTtBQUNwQixZQUFZLHNEQUFROztBQUVwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0EsNkJBQTZCLDJEQUFROztBQUVyQztBQUNBLDZCQUE2QiwyREFBUTtBQUNyQzs7QUFFQTtBQUNBO0FBQ0EsUUFBUSxzREFBUTtBQUNoQixRQUFRLHNEQUFROztBQUVoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxjQUFjLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3BFOUI7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxRQUFROzs7Ozs7Ozs7Ozs7Ozs7QUNwQkc7O0FBRTFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixjQUFjO0FBQ3RDO0FBQ0EsNEJBQTRCLGNBQWM7QUFDMUMsOEJBQThCLFNBQVM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSx3QkFBd0IsaURBQUk7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsU0FBUyxFQUFDOzs7Ozs7Ozs7Ozs7OztBQ3BGekI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsTUFBTTs7Ozs7Ozs7Ozs7Ozs7QUNuQnJCOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxpRUFBZSxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQjBCO0FBQ047QUFDRDtBQUNrQjs7QUFFakQ7O0FBRVAsa0JBQWtCLDZEQUFNO0FBQ3hCLGtCQUFrQiw2REFBTTs7QUFFeEIsdUJBQXVCLGdFQUFTO0FBQ2hDO0FBQ0E7QUFDQSxJQUFJLHNEQUFROztBQUVaLHVCQUF1QixnRUFBUztBQUNoQztBQUNBO0FBQ0EsSUFBSSxzREFBUTs7QUFFWixJQUFJLGtFQUFjO0FBQ2xCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSx3QkFBd0Isc0JBQXNCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBLENBQUM7O0FBRUQsaUVBQWUsUUFBUTs7Ozs7O1VDckZ2QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjZCOztBQUU3QiwyQ0FBSSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb250cm9sbGVyL2dhbWVDb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NvbXB1dGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy92aWV3L2dhbWVWaWV3LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnYW1lVmlldyBmcm9tIFwiLi4vdmlldy9nYW1lVmlld1wiO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi4vZmFjdG9yaWVzL2dhbWVib2FyZFwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4uL2ZhY3Rvcmllcy9zaGlwXCI7XG5pbXBvcnQgQ29tcHV0ZXIgZnJvbSBcIi4uL2ZhY3Rvcmllcy9jb21wdXRlclwiO1xuXG5cbi8vIHRoaXMgbW9kdWxlIGNvbWJpbmVzIGRvbSAoZ2FtZVZpZXcpIGFuZCBsb2dpYyBmdW5jdGlvbnMgKGZhY3RvcmllcylcbmNvbnN0IGdhbWVDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IF90aW1lT3V0ID0gNzAwO1xuICAgIFxuICAgIGNvbnN0IF9tYWtlTW92ZUxlZnRQbGF5ZXIgPSAoZ2FtZWJvYXJkTGVmdCwgZ2FtZWJvYXJkUmlnaHQpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGdhbWVWaWV3LnNldFVwRmllbGRMaXN0ZW5lclJpZ2h0KChmaWVsZCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBkb250IHNldCB1cCBsaXN0ZW5lciBpZiBmaWVsZCB3YXMgYWxyZWFkeSBwbGF5ZWRcbiAgICAgICAgICAgIGlmICghZ2FtZWJvYXJkUmlnaHQuaXNWYWxpZE1vdmUoZmllbGQuZGF0YXNldC5yb3csIGZpZWxkLmRhdGFzZXQuY29sdW1uKSkgcmV0dXJuXG5cbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIGF0dGFjayBhbmQgcmVuZGVyIHVwZGF0ZWQgZ2FtZWJvYXJkXG4gICAgICAgICAgICBnYW1lYm9hcmRSaWdodC5yZWNlaXZlQXR0YWNrKGZpZWxkLmRhdGFzZXQucm93LCBmaWVsZC5kYXRhc2V0LmNvbHVtbik7XG4gICAgICAgICAgICBnYW1lVmlldy5jbGVhclJpZ2h0R2FtZWJvYXJkKCk7XG4gICAgICAgICAgICBnYW1lVmlldy5yZW5kZXJSaWdodEdhbWVib2FyZChnYW1lYm9hcmRSaWdodCk7XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBpZiBnYW1lIGlzIG92ZXJcbiAgICAgICAgICAgIGlmIChnYW1lYm9hcmRSaWdodC5nYW1lYm9hcmRMb3N0KCkgPT0gdHJ1ZSkgcmV0dXJuIGNvbnNvbGUubG9nKFwiUGxheWVyIFJpZ2h0IGxvc3RcIilcblxuICAgICAgICAgICAgLy8gaW5pdGlhdGUgbmV4dCBtb3ZlXG4gICAgICAgICAgICBnYW1lYm9hcmRSaWdodC5nZXRMYXN0SGl0KCkgP1xuICAgICAgICAgICAgX21ha2VNb3ZlTGVmdFBsYXllcihnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodCkgOlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBfbWFrZU1vdmVSaWdodFBsYXllcihnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodCksIF90aW1lT3V0KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBfbWFrZU1vdmVSaWdodFBsYXllciA9IChnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodCkgPT4ge1xuXG4gICAgICAgIFxuICAgICAgICBsZXQgY29tcHV0ZXJDaG9pY2UgPSBDb21wdXRlci5nZXRSYW5kb21Nb3ZlKCk7XG5cbiAgICAgICAgd2hpbGUgKCFnYW1lYm9hcmRMZWZ0LmlzVmFsaWRNb3ZlKGNvbXB1dGVyQ2hvaWNlWzBdLCBjb21wdXRlckNob2ljZVsxXSkpIHtcbiAgICAgICAgICAgIGNvbXB1dGVyQ2hvaWNlID0gQ29tcHV0ZXIuZ2V0UmFuZG9tTW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVnaXN0ZXIgYXR0YWNrIGFuZCByZW5kZXIgdXBkYXRlZCBnYW1lYm9hcmRcbiAgICAgICAgZ2FtZWJvYXJkTGVmdC5yZWNlaXZlQXR0YWNrKGNvbXB1dGVyQ2hvaWNlWzBdLCBjb21wdXRlckNob2ljZVsxXSk7XG4gICAgICAgIGdhbWVWaWV3LmNsZWFyTGVmdEdhbWVib2FyZCgpO1xuICAgICAgICBnYW1lVmlldy5yZW5kZXJMZWZ0R2FtZWJvYXJkKGdhbWVib2FyZExlZnQpO1xuXG4gICAgICAgIC8vIHJldHVybiBpZiBnYW1lIGlzIG92ZXJcbiAgICAgICAgaWYgKGdhbWVib2FyZExlZnQuZ2FtZWJvYXJkTG9zdCgpID09IHRydWUpIHJldHVybiBjb25zb2xlLmxvZyhcIlBsYXllciBMZWZ0IGxvc3RcIilcblxuICAgICAgICAvLyBpbml0aWF0ZSBuZXh0IG1vdmVcbiAgICAgICAgZ2FtZWJvYXJkTGVmdC5nZXRMYXN0SGl0KCkgP1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IF9tYWtlTW92ZVJpZ2h0UGxheWVyKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KSwgX3RpbWVPdXQpOlxuICAgICAgICBfbWFrZU1vdmVMZWZ0UGxheWVyKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gdGhlIGZ1bmN0aW9ucyBtYWtlbW92ZXBsYXllciByZWN1cnNpdmVseSBjYWxsIGVhY2ggb3RoZXIgaW5zaWRlIGFub3RoZXIgdW50aWxsIHRoZSB3aW4gY29uZGl0aW9uIHN0b3BzIHRoZSBnYW1lXG4gICAgY29uc3Qgc3RhcnRNb3ZlcyA9IChnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodCkgPT4ge1xuICAgICAgICBfbWFrZU1vdmVMZWZ0UGxheWVyKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnRNb3Zlc1xuICAgIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVDb250cm9sbGVyO1xuIiwiY29uc3QgQ29tcHV0ZXIgPSAoKCkgPT4ge1xuXG4gICAgLy8gc3RvcmdlIGVmb3IgdGhlIGN1cnJlbnQgc2hpcFxuXG4gICAgY29uc3QgZ2V0UmFuZG9tTW92ZSA9ICgpID0+IHtcblxuICAgICAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIHJldHVybiBbeCx5XVxuICAgIH1cblxuICAgIGNvbnN0IGdldFNtYXJ0TW92ZSA9ICgpID0+IHtcblxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldFJhbmRvbU1vdmVcbiAgICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBDb21wdXRlcjsiLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcblxuICAgIGNvbnN0IEZpZWxkID0ge1xuICAgICAgICBzaGlwIDogbnVsbCxcbiAgICAgICAgaGl0IDogbnVsbCxcbiAgICAgICAgbWlzcyA6IG51bGxcbiAgICB9XG5cbiAgICBsZXQgbGFzdE9uZVdhc0hpdCA9IGZhbHNlO1xuXG4gICAgY29uc3QgZ2V0TGFzdEhpdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGxhc3RPbmVXYXNIaXRcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgZ2FtZWJvYXJkIGdyaWQgd2l0aCBGaWVsZCBvYmplY3QgaW4gZWFjaCBmaWVsZFxuICAgIGNvbnN0IF9jcmVhdGVGaWVsZE9iamVjdCA9IChkaW0gPSAxMCkgPT4ge1xuICAgICAgICBsZXQgZ3JpZCA9IFtdO1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSBkaW0gLSAxOyB4KyspIHtcbiAgICAgICAgICAgIGdyaWQucHVzaChbXSlcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IGRpbSAtIDE7IHkrKykge1xuICAgICAgICAgICAgICAgIGdyaWRbeF0ucHVzaCh7Li4uRmllbGR9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBncmlkXG4gICAgfVxuXG4gICAgLy8gaW5pdGlhbGl6ZSBncmlkXG4gICAgY29uc3QgZmllbGRzID0gX2NyZWF0ZUZpZWxkT2JqZWN0KCk7XG5cbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcExlbmd0aCwgY29vcmRzKSA9PiB7XG5cbiAgICAgICAgY29uc3QgbmV3U2hpcCA9IFNoaXAoc2hpcExlbmd0aClcblxuICAgICAgICBmb3IgKGxldCBjb29yZFBhaXIgaW4gY29vcmRzKSB7XG4gICAgICAgICAgICBsZXQgeENvb3JkID0gY29vcmRzW2Nvb3JkUGFpcl1bMF1cbiAgICAgICAgICAgIGxldCB5Q29vcmQgPSBjb29yZHNbY29vcmRQYWlyXVsxXVxuICAgICAgICAgICAgZmllbGRzW3hDb29yZF1beUNvb3JkXS5zaGlwID0gbmV3U2hpcDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuXG4gICAgICAgIGxldCBhdHRhY2tlZEZpZWxkID0gZmllbGRzW3hdW3ldO1xuXG4gICAgICAgIGlmIChhdHRhY2tlZEZpZWxkLnNoaXAgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGF0dGFja2VkRmllbGQuc2hpcC5oaXQoKTtcbiAgICAgICAgICAgIGF0dGFja2VkRmllbGQuaGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGxhc3RPbmVXYXNIaXQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXR0YWNrZWRGaWVsZC5taXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIGxhc3RPbmVXYXNIaXQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGdhbWVib2FyZExvc3QgPSAoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3Qgcm93IGluIGZpZWxkcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWVsZCBpbiBmaWVsZHNbcm93XSkge1xuICAgICAgICAgICAgICAgIGlmIChmaWVsZHNbcm93XVtmaWVsZF0uc2hpcCAhPT0gbnVsbCAmJiBmaWVsZHNbcm93XVtmaWVsZF0uaGl0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgaXNWYWxpZE1vdmUgPSAoeCwgeSkgPT4ge1xuICAgICAgICBsZXQgZmllbGQgPSBmaWVsZHNbeF1beV07XG4gICAgICAgIGlmIChmaWVsZC5oaXQgfHwgZmllbGQubWlzcykgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmaWVsZHMsXG4gICAgICAgIHBsYWNlU2hpcCxcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcbiAgICAgICAgZ2FtZWJvYXJkTG9zdCxcbiAgICAgICAgaXNWYWxpZE1vdmUsXG4gICAgICAgIGdldExhc3RIaXRcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDsgICAiLCJjb25zdCBQbGF5ZXIgPSAobmFtZSkgPT4ge1xuXG4gICAgbGV0IHR1cm4gPSBmYWxzZTtcblxuICAgIGNvbnN0IGlzVHVybiA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB0b2dnbGVUdXJuID0gKCkgPT4ge1xuICAgICAgICB0dXJuID0gdHVybiA/IGZhbHNlIDogdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGlzVHVybixcbiAgICAgICAgdG9nZ2xlVHVyblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyIsImNvbnN0IFNoaXAgPSAoIHVuaXRzICkgPT4ge1xuXG4gICAgY29uc3QgbGVuZ3RoID0gdW5pdHM7XG5cbiAgICBsZXQgaGl0cyA9IDA7XG5cbiAgICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0c1xuXG4gICAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgYWxyZWFkeSBzdW5rXCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoaXRzKytcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IGdldEhpdHMoKSA9PSBsZW5ndGggPyB0cnVlIDogZmFsc2VcbiBcbiAgICByZXR1cm4ge1xuICAgICAgICBsZW5ndGgsXG4gICAgICAgIGhpdCxcbiAgICAgICAgZ2V0SGl0cyxcbiAgICAgICAgaXNTdW5rXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9mYWN0b3JpZXMvZ2FtZWJvYXJkXCJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vZmFjdG9yaWVzL3BsYXllclwiXG5pbXBvcnQgZ2FtZVZpZXcgZnJvbSBcIi4vdmlldy9nYW1lVmlld1wiXG5pbXBvcnQgZ2FtZUNvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlci9nYW1lQ29udHJvbGxlclwiXG5cbmV4cG9ydCBmdW5jdGlvbiBHYW1lICgpIHtcblxuICAgIGxldCBwbGF5ZXJMID0gUGxheWVyKFwiTFwiKVxuICAgIGxldCBwbGF5ZXJSID0gUGxheWVyKFwiUlwiKVxuXG4gICAgY29uc3QgZ2FtZWJvYXJkTCA9IEdhbWVib2FyZCgpXG4gICAgZ2FtZWJvYXJkTC5wbGFjZVNoaXAoMywgW1swLDBdLCBbMCwxXSwgWzAsMl1dKVxuICAgIGdhbWVib2FyZEwucGxhY2VTaGlwKDIsIFtbMyw0XSwgWzIsNF1dKVxuICAgIGdhbWVWaWV3LnJlbmRlckxlZnRHYW1lYm9hcmQoZ2FtZWJvYXJkTClcblxuICAgIGNvbnN0IGdhbWVib2FyZFIgPSBHYW1lYm9hcmQoKVxuICAgIGdhbWVib2FyZFIucGxhY2VTaGlwKDQsIFtbOCw4XSwgWzgsN10sIFs4LDZdLCBbOCw1XV0pXG4gICAgZ2FtZWJvYXJkUi5wbGFjZVNoaXAoMiwgW1syLDJdLCBbMywyXV0pXG4gICAgZ2FtZVZpZXcucmVuZGVyUmlnaHRHYW1lYm9hcmQoZ2FtZWJvYXJkUilcblxuICAgIGdhbWVDb250cm9sbGVyLnN0YXJ0TW92ZXMoZ2FtZWJvYXJkTCwgZ2FtZWJvYXJkUilcbiAgICBcbn07IiwiXG5cbi8vIHJlbmRlciBnYW1lYm9hcmQgKGdhbWVib2FyZC5maWVsZHMsIHZpc2libGUgPSB0cnVlKVxuXG5jb25zdCBnYW1lVmlldyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBnYW1lYm9hcmRMZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lYm9hcmRPbmVcIik7XG4gICAgY29uc3QgZ2FtZWJvYXJkUmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVib2FyZFR3b1wiKVxuXG4gICAgY29uc3QgcmVuZGVyR2FtZWJvYXJkID0gKGdhbWVib2FyZCwgZ2FtZWJvYXJkRWxlbWVudCwgdmlzaWJsZSA9IHRydWUpID0+IHtcblxuICAgICAgICAvLyBpdGVyYXRlIHRocm91Z2ggYWxsIGZpZWxkcyBvZiBhIGdhbWVib2FyZFxuICAgICAgICBmb3IgKGNvbnN0IHJvdyBpbiBnYW1lYm9hcmQuZmllbGRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkIGluIGdhbWVib2FyZC5maWVsZHNbcm93XSkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBjZWxsIGRvbSBlbGVtZW50XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgZmllbGQgY2xhc3MgYW5kIGFwcHJvcHJpYXRlIGZpZWxkIHN0YXRlIHN0eWxpbmdcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJmaWVsZFwiLCBfaGl0TWlzc1NoaXAoZ2FtZWJvYXJkLmZpZWxkc1tyb3ddW2ZpZWxkXSkpXG4gICAgICAgICAgICAgICAgaWYgKCF2aXNpYmxlKSBjZWxsLmNsYXNzTGlzdC5hZGQoXCJpbnZpc2libGVcIilcblxuICAgICAgICAgICAgICAgIC8vIGFkZCBkYXRhIHJvdyBhbmQgY29sdW1uIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICAgICAgICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiA9IGZpZWxkXG5cbiAgICAgICAgICAgICAgICAvLyBhcHBlbmQgZmllbGQgdG8gZ2FtZWJvYXJkXG4gICAgICAgICAgICAgICAgZ2FtZWJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChjZWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJHYW1lYm9hcmQgPSAoZ2FtZWJvYXJkRWxlbWVudCkgPT4ge1xuICAgICAgICAvLyBsb29rdXAgZmlyc3QgY2hpbGQgYW5kIGRlbGV0ZSBsYXN0IGNoaWxkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zXG4gICAgICAgIHdoaWxlIChnYW1lYm9hcmRFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGdhbWVib2FyZEVsZW1lbnQucmVtb3ZlQ2hpbGQoZ2FtZWJvYXJkRWxlbWVudC5sYXN0Q2hpbGQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRVcEZpZWxkTGlzdGVuZXIgPSAoZ2FtZWJvYXJkRWxlbWVudCwgY2FsbGJhY2spID0+IHtcblxuICAgICAgICBsZXQgY2hpbGREaXZzID0gZ2FtZWJvYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpZWxkXCIpXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZERpdnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBjaGlsZERpdnNbaV07XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjYWxsYmFjayhlbGVtZW50KSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IF9oaXRNaXNzU2hpcCA9IChmaWVsZCkgPT4ge1xuXG4gICAgICAgIGlmIChmaWVsZC5zaGlwICE9PSBudWxsICYmIGZpZWxkLmhpdCAhPT0gbnVsbCkgcmV0dXJuIFwiaGl0U2hpcFwiICAvLyBzaGlwIHRoYXQgaGFzIGJlZW4gaGl0XG4gICAgICAgIGlmIChmaWVsZC5zaGlwICE9PSBudWxsICYmIGZpZWxkLmhpdCA9PSBudWxsKSByZXR1cm4gXCJzaGlwXCIgIC8vIHNoaXAgbm90IGhpdCB5ZXRcbiAgICAgICAgaWYgKGZpZWxkLm1pc3MpIHJldHVybiBcIm1pc3NcIiAvLyB3YXRlciBidXQgYWxyZWFkeSBoaXQ6IG1pc3NcbiAgICAgICAgcmV0dXJuIFwid2F0ZXJcIiAvLyBqdXN0IHdhdGVyXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVuZGVyTGVmdEdhbWVib2FyZCAoZ2FtZWJvYXJkKSB7XG4gICAgICAgICAgICByZW5kZXJHYW1lYm9hcmQoZ2FtZWJvYXJkLCBnYW1lYm9hcmRMZWZ0KVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbmRlclJpZ2h0R2FtZWJvYXJkIChnYW1lYm9hcmQpIHtcbiAgICAgICAgICAgIHJlbmRlckdhbWVib2FyZChnYW1lYm9hcmQsIGdhbWVib2FyZFJpZ2h0LCBmYWxzZSlcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRVcEZpZWxkTGlzdGVuZXJMZWZ0IChjYWxsYmFjaykge1xuICAgICAgICAgICAgc2V0VXBGaWVsZExpc3RlbmVyKGdhbWVib2FyZExlZnQsIGNhbGxiYWNrKVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldFVwRmllbGRMaXN0ZW5lclJpZ2h0IChjYWxsYmFjaykge1xuICAgICAgICAgICAgc2V0VXBGaWVsZExpc3RlbmVyKGdhbWVib2FyZFJpZ2h0LCBjYWxsYmFjaylcbiAgICAgICAgfSxcblxuICAgICAgICBjbGVhckxlZnRHYW1lYm9hcmQgKCkge1xuICAgICAgICAgICAgY2xlYXJHYW1lYm9hcmQgKGdhbWVib2FyZExlZnQpXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xlYXJSaWdodEdhbWVib2FyZCAoKSB7XG4gICAgICAgICAgICBjbGVhckdhbWVib2FyZCAoZ2FtZWJvYXJkUmlnaHQpXG4gICAgICAgIH0sXG4gICAgfVxuXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lVmlldzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9nYW1lXCJcblxuR2FtZSgpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9