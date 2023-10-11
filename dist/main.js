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
    
    const makeMoveLeftPlayer = (gameboardRight) => {
        _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].setUpFieldListenerRight((field) => {
            gameboardRight.receiveAttack(field.dataset.row, field.dataset.column);
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].clearRightGameboard();
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].renderRightGameboard();
        })
    }

    const makeMoveRightPlayer = (gameboardLeft) => {
        _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].setUpFieldListenerLeft((field) => {
            gameboardLeft.receiveAttack(field.dataset.row, field.dataset.column);
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].clearLeftGameboard();
            _view_gameView__WEBPACK_IMPORTED_MODULE_0__["default"].clearRightGameboard();
        })
    }

    return {
        makeMoveLeftPlayer,
        makeMoveRightPlayer
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
            attackedField.ship.hit()
            attackedField.hit = true
        } else {
            attackedField.miss = true
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

    return {
        fields,
        placeShip,
        receiveAttack,
        gameboardLost
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

    let playerL = (0,_factories_player__WEBPACK_IMPORTED_MODULE_1__["default"])("A")
    let playerR = (0,_factories_player__WEBPACK_IMPORTED_MODULE_1__["default"])("B")

    const gameboardL = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])()
    gameboardL.placeShip(3, [[0,0], [0,1], [0,2]])
    gameboardL.placeShip(2, [[3,4], [2,4]])
    _view_gameView__WEBPACK_IMPORTED_MODULE_2__["default"].renderLeftGameboard(gameboardL)

    const gameboardR = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])()
    gameboardR.placeShip(4, [[8,8], [8,7], [8,6], [8,5]])
    gameboardR.placeShip(2, [[2,2], [3,2]])
    _view_gameView__WEBPACK_IMPORTED_MODULE_2__["default"].renderRightGameboard(gameboardR)

    while (true) {
        _controller_gameController__WEBPACK_IMPORTED_MODULE_3__["default"].makeMoveLeftPlayer(gameboardR)
        if (gameboardR.gameboardLost() == true) return "Player Right lost"

        _controller_gameController__WEBPACK_IMPORTED_MODULE_3__["default"].makeMoveRightPlayer(gameboardL)
        if (gameboardL.gameboardLost() == true) return "Player Left lost"
    }
};



// TODO

// render DOM gameboards
//      with visualizing hit/miss/water

// receive user input


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
        while (gameboardElement.firstChild) {
            gameboardElement.lastChild.addEventListener("click", (e) => callback(e))
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
            renderGameboard(gameboard, gameboardRight)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7OztBQ042Qjs7QUFFN0IsMkNBQUksRSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29udHJvbGxlci9nYW1lQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlldy9nYW1lVmlldy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2FtZVZpZXcgZnJvbSBcIi4uL3ZpZXcvZ2FtZVZpZXdcIjtcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4uL2ZhY3Rvcmllcy9nYW1lYm9hcmRcIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuLi9mYWN0b3JpZXMvc2hpcFwiO1xuXG5cbi8vIHRoaXMgbW9kdWxlIGNvbWJpbmVzIGRvbSAoZ2FtZVZpZXcpIGFuZCBsb2dpYyBmdW5jdGlvbnMgKGZhY3RvcmllcylcbmNvbnN0IGdhbWVDb250cm9sbGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBcbiAgICBjb25zdCBtYWtlTW92ZUxlZnRQbGF5ZXIgPSAoZ2FtZWJvYXJkUmlnaHQpID0+IHtcbiAgICAgICAgZ2FtZVZpZXcuc2V0VXBGaWVsZExpc3RlbmVyUmlnaHQoKGZpZWxkKSA9PiB7XG4gICAgICAgICAgICBnYW1lYm9hcmRSaWdodC5yZWNlaXZlQXR0YWNrKGZpZWxkLmRhdGFzZXQucm93LCBmaWVsZC5kYXRhc2V0LmNvbHVtbik7XG4gICAgICAgICAgICBnYW1lVmlldy5jbGVhclJpZ2h0R2FtZWJvYXJkKCk7XG4gICAgICAgICAgICBnYW1lVmlldy5yZW5kZXJSaWdodEdhbWVib2FyZCgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IG1ha2VNb3ZlUmlnaHRQbGF5ZXIgPSAoZ2FtZWJvYXJkTGVmdCkgPT4ge1xuICAgICAgICBnYW1lVmlldy5zZXRVcEZpZWxkTGlzdGVuZXJMZWZ0KChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgZ2FtZWJvYXJkTGVmdC5yZWNlaXZlQXR0YWNrKGZpZWxkLmRhdGFzZXQucm93LCBmaWVsZC5kYXRhc2V0LmNvbHVtbik7XG4gICAgICAgICAgICBnYW1lVmlldy5jbGVhckxlZnRHYW1lYm9hcmQoKTtcbiAgICAgICAgICAgIGdhbWVWaWV3LmNsZWFyUmlnaHRHYW1lYm9hcmQoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtYWtlTW92ZUxlZnRQbGF5ZXIsXG4gICAgICAgIG1ha2VNb3ZlUmlnaHRQbGF5ZXJcbiAgICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lQ29udHJvbGxlcjtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuXG4gICAgY29uc3QgRmllbGQgPSB7XG4gICAgICAgIHNoaXAgOiBudWxsLFxuICAgICAgICBoaXQgOiBudWxsLFxuICAgICAgICBtaXNzIDogbnVsbFxuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBnYW1lYm9hcmQgZ3JpZCB3aXRoIEZpZWxkIG9iamVjdCBpbiBlYWNoIGZpZWxkXG4gICAgY29uc3QgX2NyZWF0ZUZpZWxkT2JqZWN0ID0gKGRpbSA9IDEwKSA9PiB7XG4gICAgICAgIGxldCBncmlkID0gW107XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDw9IGRpbSAtIDE7IHgrKykge1xuICAgICAgICAgICAgZ3JpZC5wdXNoKFtdKVxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gZGltIC0gMTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZ3JpZFt4XS5wdXNoKHsuLi5GaWVsZH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdyaWRcbiAgICB9XG5cbiAgICAvLyBpbml0aWFsaXplIGdyaWRcbiAgICBjb25zdCBmaWVsZHMgPSBfY3JlYXRlRmllbGRPYmplY3QoKTtcblxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwTGVuZ3RoLCBjb29yZHMpID0+IHtcblxuICAgICAgICBjb25zdCBuZXdTaGlwID0gU2hpcChzaGlwTGVuZ3RoKVxuXG4gICAgICAgIGZvciAobGV0IGNvb3JkUGFpciBpbiBjb29yZHMpIHtcbiAgICAgICAgICAgIGxldCB4Q29vcmQgPSBjb29yZHNbY29vcmRQYWlyXVswXVxuICAgICAgICAgICAgbGV0IHlDb29yZCA9IGNvb3Jkc1tjb29yZFBhaXJdWzFdXG4gICAgICAgICAgICBmaWVsZHNbeENvb3JkXVt5Q29vcmRdLnNoaXAgPSBuZXdTaGlwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG5cbiAgICAgICAgbGV0IGF0dGFja2VkRmllbGQgPSBmaWVsZHNbeF1beV07XG5cbiAgICAgICAgaWYgKGF0dGFja2VkRmllbGQuc2hpcCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgYXR0YWNrZWRGaWVsZC5zaGlwLmhpdCgpXG4gICAgICAgICAgICBhdHRhY2tlZEZpZWxkLmhpdCA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF0dGFja2VkRmllbGQubWlzcyA9IHRydWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGdhbWVib2FyZExvc3QgPSAoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3Qgcm93IGluIGZpZWxkcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWVsZCBpbiBmaWVsZHNbcm93XSkge1xuICAgICAgICAgICAgICAgIGlmIChmaWVsZHNbcm93XVtmaWVsZF0uc2hpcCAhPT0gbnVsbCAmJiBmaWVsZHNbcm93XVtmaWVsZF0uaGl0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmllbGRzLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgICAgIGdhbWVib2FyZExvc3RcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDsiLCJjb25zdCBQbGF5ZXIgPSAobmFtZSkgPT4ge1xuXG4gICAgY29uc3QgYXR0YWNrRW5lbXlHYW1lYm9hcmQgPSAoZW5lbXlHYW1lYm9hcmQsIGNvb3JkaW5hdGVBcnJheSkgPT4ge1xuICAgICAgICBsZXQgeENvb3JkID0gY29vcmRpbmF0ZUFycmF5WzBdO1xuICAgICAgICBsZXQgeUNvb3JkID0gY29vcmRpbmF0ZUFycmF5WzFdO1xuICAgICAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHhDb29yZCwgeUNvb3JkKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGF0dGFja0VuZW15R2FtZWJvYXJkXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiY29uc3QgU2hpcCA9ICggdW5pdHMgKSA9PiB7XG5cbiAgICBjb25zdCBsZW5ndGggPSB1bml0cztcblxuICAgIGxldCBoaXRzID0gMDtcblxuICAgIGNvbnN0IGdldEhpdHMgPSAoKSA9PiBoaXRzXG5cbiAgICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChpc1N1bmsoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBhbHJlYWR5IHN1bmtcIilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhpdHMrK1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4gZ2V0SGl0cygpID09IGxlbmd0aCA/IHRydWUgOiBmYWxzZVxuIFxuICAgIHJldHVybiB7XG4gICAgICAgIGxlbmd0aCxcbiAgICAgICAgaGl0LFxuICAgICAgICBnZXRIaXRzLFxuICAgICAgICBpc1N1bmtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2ZhY3Rvcmllcy9nYW1lYm9hcmRcIlxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9mYWN0b3JpZXMvcGxheWVyXCJcbmltcG9ydCBnYW1lVmlldyBmcm9tIFwiLi92aWV3L2dhbWVWaWV3XCJcbmltcG9ydCBnYW1lQ29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyL2dhbWVDb250cm9sbGVyXCJcblxuZXhwb3J0IGZ1bmN0aW9uIEdhbWUgKCkge1xuXG4gICAgbGV0IHBsYXllckwgPSBQbGF5ZXIoXCJBXCIpXG4gICAgbGV0IHBsYXllclIgPSBQbGF5ZXIoXCJCXCIpXG5cbiAgICBjb25zdCBnYW1lYm9hcmRMID0gR2FtZWJvYXJkKClcbiAgICBnYW1lYm9hcmRMLnBsYWNlU2hpcCgzLCBbWzAsMF0sIFswLDFdLCBbMCwyXV0pXG4gICAgZ2FtZWJvYXJkTC5wbGFjZVNoaXAoMiwgW1szLDRdLCBbMiw0XV0pXG4gICAgZ2FtZVZpZXcucmVuZGVyTGVmdEdhbWVib2FyZChnYW1lYm9hcmRMKVxuXG4gICAgY29uc3QgZ2FtZWJvYXJkUiA9IEdhbWVib2FyZCgpXG4gICAgZ2FtZWJvYXJkUi5wbGFjZVNoaXAoNCwgW1s4LDhdLCBbOCw3XSwgWzgsNl0sIFs4LDVdXSlcbiAgICBnYW1lYm9hcmRSLnBsYWNlU2hpcCgyLCBbWzIsMl0sIFszLDJdXSlcbiAgICBnYW1lVmlldy5yZW5kZXJSaWdodEdhbWVib2FyZChnYW1lYm9hcmRSKVxuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgZ2FtZUNvbnRyb2xsZXIubWFrZU1vdmVMZWZ0UGxheWVyKGdhbWVib2FyZFIpXG4gICAgICAgIGlmIChnYW1lYm9hcmRSLmdhbWVib2FyZExvc3QoKSA9PSB0cnVlKSByZXR1cm4gXCJQbGF5ZXIgUmlnaHQgbG9zdFwiXG5cbiAgICAgICAgZ2FtZUNvbnRyb2xsZXIubWFrZU1vdmVSaWdodFBsYXllcihnYW1lYm9hcmRMKVxuICAgICAgICBpZiAoZ2FtZWJvYXJkTC5nYW1lYm9hcmRMb3N0KCkgPT0gdHJ1ZSkgcmV0dXJuIFwiUGxheWVyIExlZnQgbG9zdFwiXG4gICAgfVxufTtcblxuXG5cbi8vIFRPRE9cblxuLy8gcmVuZGVyIERPTSBnYW1lYm9hcmRzXG4vLyAgICAgIHdpdGggdmlzdWFsaXppbmcgaGl0L21pc3Mvd2F0ZXJcblxuLy8gcmVjZWl2ZSB1c2VyIGlucHV0XG4iLCJcblxuLy8gcmVuZGVyIGdhbWVib2FyZCAoZ2FtZWJvYXJkLmZpZWxkcywgdmlzaWJsZSA9IHRydWUpXG5cbmNvbnN0IGdhbWVWaWV3ID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IGdhbWVib2FyZExlZnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVib2FyZE9uZVwiKTtcbiAgICBjb25zdCBnYW1lYm9hcmRSaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZWJvYXJkVHdvXCIpXG5cbiAgICBjb25zdCByZW5kZXJHYW1lYm9hcmQgPSAoZ2FtZWJvYXJkLCBnYW1lYm9hcmRFbGVtZW50LCB2aXNpYmxlID0gdHJ1ZSkgPT4ge1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCBhbGwgZmllbGRzIG9mIGEgZ2FtZWJvYXJkXG4gICAgICAgIGZvciAoY29uc3Qgcm93IGluIGdhbWVib2FyZC5maWVsZHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmllbGQgaW4gZ2FtZWJvYXJkLmZpZWxkc1tyb3ddKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGNlbGwgZG9tIGVsZW1lbnRcbiAgICAgICAgICAgICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcblxuICAgICAgICAgICAgICAgIC8vIGFkZCBmaWVsZCBjbGFzcyBhbmQgYXBwcm9wcmlhdGUgZmllbGQgc3RhdGUgc3R5bGluZ1xuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImZpZWxkXCIsIF9oaXRNaXNzU2hpcChnYW1lYm9hcmQuZmllbGRzW3Jvd11bZmllbGRdKSlcblxuICAgICAgICAgICAgICAgIC8vIGFkZCBkYXRhIHJvdyBhbmQgY29sdW1uIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICAgICAgICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiA9IGZpZWxkXG5cbiAgICAgICAgICAgICAgICAvLyBhcHBlbmQgZmllbGQgdG8gZ2FtZWJvYXJkXG4gICAgICAgICAgICAgICAgZ2FtZWJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChjZWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJHYW1lYm9hcmQgPSAoZ2FtZWJvYXJkRWxlbWVudCkgPT4ge1xuICAgICAgICAvLyBsb29rdXAgZmlyc3QgY2hpbGQgYW5kIGRlbGV0ZSBsYXN0IGNoaWxkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zXG4gICAgICAgIHdoaWxlIChnYW1lYm9hcmRFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGdhbWVib2FyZEVsZW1lbnQucmVtb3ZlQ2hpbGQoZ2FtZWJvYXJkRWxlbWVudC5sYXN0Q2hpbGQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRVcEZpZWxkTGlzdGVuZXIgPSAoZ2FtZWJvYXJkRWxlbWVudCwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgd2hpbGUgKGdhbWVib2FyZEVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgZ2FtZWJvYXJkRWxlbWVudC5sYXN0Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBjYWxsYmFjayhlKSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IF9oaXRNaXNzU2hpcCA9IChmaWVsZCkgPT4ge1xuXG4gICAgICAgIGlmIChmaWVsZC5zaGlwICE9PSBudWxsICYmIGZpZWxkLmhpdCAhPT0gbnVsbCkgcmV0dXJuIFwiaGl0U2hpcFwiICAvLyBzaGlwIHRoYXQgaGFzIGJlZW4gaGl0XG4gICAgICAgIGlmIChmaWVsZC5zaGlwICE9PSBudWxsICYmIGZpZWxkLmhpdCA9PSBudWxsKSByZXR1cm4gXCJzaGlwXCIgIC8vIHNoaXAgbm90IGhpdCB5ZXRcbiAgICAgICAgaWYgKGZpZWxkLm1pc3MpIHJldHVybiBcIm1pc3NcIiAvLyB3YXRlciBidXQgYWxyZWFkeSBoaXQ6IG1pc3NcbiAgICAgICAgcmV0dXJuIFwid2F0ZXJcIiAvLyBqdXN0IHdhdGVyXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVuZGVyTGVmdEdhbWVib2FyZCAoZ2FtZWJvYXJkKSB7XG4gICAgICAgICAgICByZW5kZXJHYW1lYm9hcmQoZ2FtZWJvYXJkLCBnYW1lYm9hcmRMZWZ0KVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbmRlclJpZ2h0R2FtZWJvYXJkIChnYW1lYm9hcmQpIHtcbiAgICAgICAgICAgIHJlbmRlckdhbWVib2FyZChnYW1lYm9hcmQsIGdhbWVib2FyZFJpZ2h0KVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldFVwRmllbGRMaXN0ZW5lckxlZnQgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBzZXRVcEZpZWxkTGlzdGVuZXIoZ2FtZWJvYXJkTGVmdCwgY2FsbGJhY2spXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0VXBGaWVsZExpc3RlbmVyUmlnaHQgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBzZXRVcEZpZWxkTGlzdGVuZXIoZ2FtZWJvYXJkUmlnaHQsIGNhbGxiYWNrKVxuICAgICAgICB9LFxuXG4gICAgICAgIGNsZWFyTGVmdEdhbWVib2FyZCAoKSB7XG4gICAgICAgICAgICBjbGVhckdhbWVib2FyZCAoZ2FtZWJvYXJkTGVmdClcbiAgICAgICAgfSxcblxuICAgICAgICBjbGVhclJpZ2h0R2FtZWJvYXJkICgpIHtcbiAgICAgICAgICAgIGNsZWFyR2FtZWJvYXJkIChnYW1lYm9hcmRSaWdodClcbiAgICAgICAgfSxcblxuICAgIH1cblxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZVZpZXc7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vZ2FtZVwiXG5cbkdhbWUoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==