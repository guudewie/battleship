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





// this module combines dom (gameView) and logic functions (factories)
const gameController = (function () {
    
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
            _makeMoveRightPlayer(gameboardLeft, gameboardRight);
        })
    }

    const _makeMoveRightPlayer = (gameboardLeft, gameboardRight) => {

        _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].setUpFieldListenerLeft((field) => {

            // dont set up listener if field was already played
            if (!gameboardLeft.isValidMove(field.dataset.row, field.dataset.column)) return

            // register attack and render updated gameboard
            gameboardLeft.receiveAttack(field.dataset.row, field.dataset.column);
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].clearLeftGameboard();
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].renderLeftGameboard(gameboardLeft);

            // return if game is over
            if (gameboardLeft.gameboardLost() == true) return console.log("Player Left lost")

            // initiate next move
            gameboardLeft.getLastHit() ?
            _makeMoveRightPlayer(gameboardLeft, gameboardRight) :
            _makeMoveLeftPlayer(gameboardLeft, gameboardRight);
        })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjZCOztBQUU3QiwyQ0FBSSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb250cm9sbGVyL2dhbWVDb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy92aWV3L2dhbWVWaWV3LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnYW1lVmlldyBmcm9tIFwiLi4vdmlldy9nYW1lVmlld1wiO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi4vZmFjdG9yaWVzL2dhbWVib2FyZFwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4uL2ZhY3Rvcmllcy9zaGlwXCI7XG5cblxuLy8gdGhpcyBtb2R1bGUgY29tYmluZXMgZG9tIChnYW1lVmlldykgYW5kIGxvZ2ljIGZ1bmN0aW9ucyAoZmFjdG9yaWVzKVxuY29uc3QgZ2FtZUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIFxuICAgIGNvbnN0IF9tYWtlTW92ZUxlZnRQbGF5ZXIgPSAoZ2FtZWJvYXJkTGVmdCwgZ2FtZWJvYXJkUmlnaHQpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGdhbWVWaWV3LnNldFVwRmllbGRMaXN0ZW5lclJpZ2h0KChmaWVsZCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBkb250IHNldCB1cCBsaXN0ZW5lciBpZiBmaWVsZCB3YXMgYWxyZWFkeSBwbGF5ZWRcbiAgICAgICAgICAgIGlmICghZ2FtZWJvYXJkUmlnaHQuaXNWYWxpZE1vdmUoZmllbGQuZGF0YXNldC5yb3csIGZpZWxkLmRhdGFzZXQuY29sdW1uKSkgcmV0dXJuXG5cbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIGF0dGFjayBhbmQgcmVuZGVyIHVwZGF0ZWQgZ2FtZWJvYXJkXG4gICAgICAgICAgICBnYW1lYm9hcmRSaWdodC5yZWNlaXZlQXR0YWNrKGZpZWxkLmRhdGFzZXQucm93LCBmaWVsZC5kYXRhc2V0LmNvbHVtbik7XG4gICAgICAgICAgICBnYW1lVmlldy5jbGVhclJpZ2h0R2FtZWJvYXJkKCk7XG4gICAgICAgICAgICBnYW1lVmlldy5yZW5kZXJSaWdodEdhbWVib2FyZChnYW1lYm9hcmRSaWdodCk7XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBpZiBnYW1lIGlzIG92ZXJcbiAgICAgICAgICAgIGlmIChnYW1lYm9hcmRSaWdodC5nYW1lYm9hcmRMb3N0KCkgPT0gdHJ1ZSkgcmV0dXJuIGNvbnNvbGUubG9nKFwiUGxheWVyIFJpZ2h0IGxvc3RcIilcblxuICAgICAgICAgICAgLy8gaW5pdGlhdGUgbmV4dCBtb3ZlXG4gICAgICAgICAgICBnYW1lYm9hcmRSaWdodC5nZXRMYXN0SGl0KCkgP1xuICAgICAgICAgICAgX21ha2VNb3ZlTGVmdFBsYXllcihnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodCkgOlxuICAgICAgICAgICAgX21ha2VNb3ZlUmlnaHRQbGF5ZXIoZ2FtZWJvYXJkTGVmdCwgZ2FtZWJvYXJkUmlnaHQpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IF9tYWtlTW92ZVJpZ2h0UGxheWVyID0gKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KSA9PiB7XG5cbiAgICAgICAgZ2FtZVZpZXcuc2V0VXBGaWVsZExpc3RlbmVyTGVmdCgoZmllbGQpID0+IHtcblxuICAgICAgICAgICAgLy8gZG9udCBzZXQgdXAgbGlzdGVuZXIgaWYgZmllbGQgd2FzIGFscmVhZHkgcGxheWVkXG4gICAgICAgICAgICBpZiAoIWdhbWVib2FyZExlZnQuaXNWYWxpZE1vdmUoZmllbGQuZGF0YXNldC5yb3csIGZpZWxkLmRhdGFzZXQuY29sdW1uKSkgcmV0dXJuXG5cbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIGF0dGFjayBhbmQgcmVuZGVyIHVwZGF0ZWQgZ2FtZWJvYXJkXG4gICAgICAgICAgICBnYW1lYm9hcmRMZWZ0LnJlY2VpdmVBdHRhY2soZmllbGQuZGF0YXNldC5yb3csIGZpZWxkLmRhdGFzZXQuY29sdW1uKTtcbiAgICAgICAgICAgIGdhbWVWaWV3LmNsZWFyTGVmdEdhbWVib2FyZCgpO1xuICAgICAgICAgICAgZ2FtZVZpZXcucmVuZGVyTGVmdEdhbWVib2FyZChnYW1lYm9hcmRMZWZ0KTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGlmIGdhbWUgaXMgb3ZlclxuICAgICAgICAgICAgaWYgKGdhbWVib2FyZExlZnQuZ2FtZWJvYXJkTG9zdCgpID09IHRydWUpIHJldHVybiBjb25zb2xlLmxvZyhcIlBsYXllciBMZWZ0IGxvc3RcIilcblxuICAgICAgICAgICAgLy8gaW5pdGlhdGUgbmV4dCBtb3ZlXG4gICAgICAgICAgICBnYW1lYm9hcmRMZWZ0LmdldExhc3RIaXQoKSA/XG4gICAgICAgICAgICBfbWFrZU1vdmVSaWdodFBsYXllcihnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodCkgOlxuICAgICAgICAgICAgX21ha2VNb3ZlTGVmdFBsYXllcihnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gdGhlIGZ1bmN0aW9ucyBtYWtlbW92ZXBsYXllciByZWN1cnNpdmVseSBjYWxsIGVhY2ggb3RoZXIgaW5zaWRlIGFub3RoZXIgdW50aWxsIHRoZSB3aW4gY29uZGl0aW9uIHN0b3BzIHRoZSBnYW1lXG4gICAgY29uc3Qgc3RhcnRNb3ZlcyA9IChnYW1lYm9hcmRMZWZ0LCBnYW1lYm9hcmRSaWdodCkgPT4ge1xuICAgICAgICBfbWFrZU1vdmVMZWZ0UGxheWVyKGdhbWVib2FyZExlZnQsIGdhbWVib2FyZFJpZ2h0KVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnRNb3Zlc1xuICAgIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVDb250cm9sbGVyO1xuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBGaWVsZCA9IHtcbiAgICAgICAgc2hpcCA6IG51bGwsXG4gICAgICAgIGhpdCA6IG51bGwsXG4gICAgICAgIG1pc3MgOiBudWxsXG4gICAgfVxuXG4gICAgbGV0IGxhc3RPbmVXYXNIaXQgPSBmYWxzZTtcblxuICAgIGNvbnN0IGdldExhc3RIaXQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBsYXN0T25lV2FzSGl0XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGdhbWVib2FyZCBncmlkIHdpdGggRmllbGQgb2JqZWN0IGluIGVhY2ggZmllbGRcbiAgICBjb25zdCBfY3JlYXRlRmllbGRPYmplY3QgPSAoZGltID0gMTApID0+IHtcbiAgICAgICAgbGV0IGdyaWQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPD0gZGltIC0gMTsgeCsrKSB7XG4gICAgICAgICAgICBncmlkLnB1c2goW10pXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSBkaW0gLSAxOyB5KyspIHtcbiAgICAgICAgICAgICAgICBncmlkW3hdLnB1c2goey4uLkZpZWxkfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JpZFxuICAgIH1cblxuICAgIC8vIGluaXRpYWxpemUgZ3JpZFxuICAgIGNvbnN0IGZpZWxkcyA9IF9jcmVhdGVGaWVsZE9iamVjdCgpO1xuXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBMZW5ndGgsIGNvb3JkcykgPT4ge1xuXG4gICAgICAgIGNvbnN0IG5ld1NoaXAgPSBTaGlwKHNoaXBMZW5ndGgpXG5cbiAgICAgICAgZm9yIChsZXQgY29vcmRQYWlyIGluIGNvb3Jkcykge1xuICAgICAgICAgICAgbGV0IHhDb29yZCA9IGNvb3Jkc1tjb29yZFBhaXJdWzBdXG4gICAgICAgICAgICBsZXQgeUNvb3JkID0gY29vcmRzW2Nvb3JkUGFpcl1bMV1cbiAgICAgICAgICAgIGZpZWxkc1t4Q29vcmRdW3lDb29yZF0uc2hpcCA9IG5ld1NoaXA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcblxuICAgICAgICBsZXQgYXR0YWNrZWRGaWVsZCA9IGZpZWxkc1t4XVt5XTtcblxuICAgICAgICBpZiAoYXR0YWNrZWRGaWVsZC5zaGlwICE9PSBudWxsKSB7XG4gICAgICAgICAgICBhdHRhY2tlZEZpZWxkLnNoaXAuaGl0KCk7XG4gICAgICAgICAgICBhdHRhY2tlZEZpZWxkLmhpdCA9IHRydWU7XG4gICAgICAgICAgICBsYXN0T25lV2FzSGl0ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF0dGFja2VkRmllbGQubWlzcyA9IHRydWU7XG4gICAgICAgICAgICBsYXN0T25lV2FzSGl0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBnYW1lYm9hcmRMb3N0ID0gKCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHJvdyBpbiBmaWVsZHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmllbGQgaW4gZmllbGRzW3Jvd10pIHtcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRzW3Jvd11bZmllbGRdLnNoaXAgIT09IG51bGwgJiYgZmllbGRzW3Jvd11bZmllbGRdLmhpdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGlzVmFsaWRNb3ZlID0gKHgsIHkpID0+IHtcbiAgICAgICAgbGV0IGZpZWxkID0gZmllbGRzW3hdW3ldO1xuICAgICAgICBpZiAoZmllbGQuaGl0IHx8IGZpZWxkLm1pc3MpIHJldHVybiBmYWxzZVxuXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmllbGRzLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgICAgIGdhbWVib2FyZExvc3QsXG4gICAgICAgIGlzVmFsaWRNb3ZlLFxuICAgICAgICBnZXRMYXN0SGl0XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7ICAgIiwiY29uc3QgUGxheWVyID0gKG5hbWUpID0+IHtcblxuICAgIGxldCB0dXJuID0gZmFsc2U7XG5cbiAgICBjb25zdCBpc1R1cm4gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgdG9nZ2xlVHVybiA9ICgpID0+IHtcbiAgICAgICAgdHVybiA9IHR1cm4gPyBmYWxzZSA6IHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lLFxuICAgICAgICBpc1R1cm4sXG4gICAgICAgIHRvZ2dsZVR1cm5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJjb25zdCBTaGlwID0gKCB1bml0cyApID0+IHtcblxuICAgIGNvbnN0IGxlbmd0aCA9IHVuaXRzO1xuXG4gICAgbGV0IGhpdHMgPSAwO1xuXG4gICAgY29uc3QgZ2V0SGl0cyA9ICgpID0+IGhpdHNcblxuICAgIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGlzU3VuaygpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGFscmVhZHkgc3Vua1wiKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGl0cysrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiBnZXRIaXRzKCkgPT0gbGVuZ3RoID8gdHJ1ZSA6IGZhbHNlXG4gXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGVuZ3RoLFxuICAgICAgICBoaXQsXG4gICAgICAgIGdldEhpdHMsXG4gICAgICAgIGlzU3Vua1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZmFjdG9yaWVzL2dhbWVib2FyZFwiXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL2ZhY3Rvcmllcy9wbGF5ZXJcIlxuaW1wb3J0IGdhbWVWaWV3IGZyb20gXCIuL3ZpZXcvZ2FtZVZpZXdcIlxuaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXIvZ2FtZUNvbnRyb2xsZXJcIlxuXG5leHBvcnQgZnVuY3Rpb24gR2FtZSAoKSB7XG5cbiAgICBsZXQgcGxheWVyTCA9IFBsYXllcihcIkxcIilcbiAgICBsZXQgcGxheWVyUiA9IFBsYXllcihcIlJcIilcblxuICAgIGNvbnN0IGdhbWVib2FyZEwgPSBHYW1lYm9hcmQoKVxuICAgIGdhbWVib2FyZEwucGxhY2VTaGlwKDMsIFtbMCwwXSwgWzAsMV0sIFswLDJdXSlcbiAgICBnYW1lYm9hcmRMLnBsYWNlU2hpcCgyLCBbWzMsNF0sIFsyLDRdXSlcbiAgICBnYW1lVmlldy5yZW5kZXJMZWZ0R2FtZWJvYXJkKGdhbWVib2FyZEwpXG5cbiAgICBjb25zdCBnYW1lYm9hcmRSID0gR2FtZWJvYXJkKClcbiAgICBnYW1lYm9hcmRSLnBsYWNlU2hpcCg0LCBbWzgsOF0sIFs4LDddLCBbOCw2XSwgWzgsNV1dKVxuICAgIGdhbWVib2FyZFIucGxhY2VTaGlwKDIsIFtbMiwyXSwgWzMsMl1dKVxuICAgIGdhbWVWaWV3LnJlbmRlclJpZ2h0R2FtZWJvYXJkKGdhbWVib2FyZFIpXG5cbiAgICBnYW1lQ29udHJvbGxlci5zdGFydE1vdmVzKGdhbWVib2FyZEwsIGdhbWVib2FyZFIpXG4gICAgXG59OyIsIlxuXG4vLyByZW5kZXIgZ2FtZWJvYXJkIChnYW1lYm9hcmQuZmllbGRzLCB2aXNpYmxlID0gdHJ1ZSlcblxuY29uc3QgZ2FtZVZpZXcgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgZ2FtZWJvYXJkTGVmdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZWJvYXJkT25lXCIpO1xuICAgIGNvbnN0IGdhbWVib2FyZFJpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lYm9hcmRUd29cIilcblxuICAgIGNvbnN0IHJlbmRlckdhbWVib2FyZCA9IChnYW1lYm9hcmQsIGdhbWVib2FyZEVsZW1lbnQsIHZpc2libGUgPSB0cnVlKSA9PiB7XG5cbiAgICAgICAgLy8gaXRlcmF0ZSB0aHJvdWdoIGFsbCBmaWVsZHMgb2YgYSBnYW1lYm9hcmRcbiAgICAgICAgZm9yIChjb25zdCByb3cgaW4gZ2FtZWJvYXJkLmZpZWxkcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWVsZCBpbiBnYW1lYm9hcmQuZmllbGRzW3Jvd10pIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgY2VsbCBkb20gZWxlbWVudFxuICAgICAgICAgICAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuXG4gICAgICAgICAgICAgICAgLy8gYWRkIGZpZWxkIGNsYXNzIGFuZCBhcHByb3ByaWF0ZSBmaWVsZCBzdGF0ZSBzdHlsaW5nXG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiZmllbGRcIiwgX2hpdE1pc3NTaGlwKGdhbWVib2FyZC5maWVsZHNbcm93XVtmaWVsZF0pKVxuICAgICAgICAgICAgICAgIGlmICghdmlzaWJsZSkgY2VsbC5jbGFzc0xpc3QuYWRkKFwiaW52aXNpYmxlXCIpXG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgZGF0YSByb3cgYW5kIGNvbHVtbiBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQucm93ID0gcm93O1xuICAgICAgICAgICAgICAgIGNlbGwuZGF0YXNldC5jb2x1bW4gPSBmaWVsZFxuXG4gICAgICAgICAgICAgICAgLy8gYXBwZW5kIGZpZWxkIHRvIGdhbWVib2FyZFxuICAgICAgICAgICAgICAgIGdhbWVib2FyZEVsZW1lbnQuYXBwZW5kQ2hpbGQoY2VsbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNsZWFyR2FtZWJvYXJkID0gKGdhbWVib2FyZEVsZW1lbnQpID0+IHtcbiAgICAgICAgLy8gbG9va3VwIGZpcnN0IGNoaWxkIGFuZCBkZWxldGUgbGFzdCBjaGlsZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29uc1xuICAgICAgICB3aGlsZSAoZ2FtZWJvYXJkRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBnYW1lYm9hcmRFbGVtZW50LnJlbW92ZUNoaWxkKGdhbWVib2FyZEVsZW1lbnQubGFzdENoaWxkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0VXBGaWVsZExpc3RlbmVyID0gKGdhbWVib2FyZEVsZW1lbnQsIGNhbGxiYWNrKSA9PiB7XG5cbiAgICAgICAgbGV0IGNoaWxkRGl2cyA9IGdhbWVib2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWVsZFwiKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGREaXZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gY2hpbGREaXZzW2ldO1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2FsbGJhY2soZWxlbWVudCkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBfaGl0TWlzc1NoaXAgPSAoZmllbGQpID0+IHtcblxuICAgICAgICBpZiAoZmllbGQuc2hpcCAhPT0gbnVsbCAmJiBmaWVsZC5oaXQgIT09IG51bGwpIHJldHVybiBcImhpdFNoaXBcIiAgLy8gc2hpcCB0aGF0IGhhcyBiZWVuIGhpdFxuICAgICAgICBpZiAoZmllbGQuc2hpcCAhPT0gbnVsbCAmJiBmaWVsZC5oaXQgPT0gbnVsbCkgcmV0dXJuIFwic2hpcFwiICAvLyBzaGlwIG5vdCBoaXQgeWV0XG4gICAgICAgIGlmIChmaWVsZC5taXNzKSByZXR1cm4gXCJtaXNzXCIgLy8gd2F0ZXIgYnV0IGFscmVhZHkgaGl0OiBtaXNzXG4gICAgICAgIHJldHVybiBcIndhdGVyXCIgLy8ganVzdCB3YXRlclxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlbmRlckxlZnRHYW1lYm9hcmQgKGdhbWVib2FyZCkge1xuICAgICAgICAgICAgcmVuZGVyR2FtZWJvYXJkKGdhbWVib2FyZCwgZ2FtZWJvYXJkTGVmdClcbiAgICAgICAgfSxcblxuICAgICAgICByZW5kZXJSaWdodEdhbWVib2FyZCAoZ2FtZWJvYXJkKSB7XG4gICAgICAgICAgICByZW5kZXJHYW1lYm9hcmQoZ2FtZWJvYXJkLCBnYW1lYm9hcmRSaWdodCwgZmFsc2UpXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0VXBGaWVsZExpc3RlbmVyTGVmdCAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHNldFVwRmllbGRMaXN0ZW5lcihnYW1lYm9hcmRMZWZ0LCBjYWxsYmFjaylcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRVcEZpZWxkTGlzdGVuZXJSaWdodCAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHNldFVwRmllbGRMaXN0ZW5lcihnYW1lYm9hcmRSaWdodCwgY2FsbGJhY2spXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xlYXJMZWZ0R2FtZWJvYXJkICgpIHtcbiAgICAgICAgICAgIGNsZWFyR2FtZWJvYXJkIChnYW1lYm9hcmRMZWZ0KVxuICAgICAgICB9LFxuXG4gICAgICAgIGNsZWFyUmlnaHRHYW1lYm9hcmQgKCkge1xuICAgICAgICAgICAgY2xlYXJHYW1lYm9hcmQgKGdhbWVib2FyZFJpZ2h0KVxuICAgICAgICB9LFxuICAgIH1cblxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZVZpZXc7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vZ2FtZVwiXG5cbkdhbWUoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==