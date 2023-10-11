/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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



function Game () {

    let playerA = (0,_factories_player__WEBPACK_IMPORTED_MODULE_1__["default"])("A")
    let playerB = (0,_factories_player__WEBPACK_IMPORTED_MODULE_1__["default"])("B")

    let gameboardA = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])()
    gameboardA.placeShip(1, [[0,0]])

    let gameboardB = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])()
    gameboardB.placeShip(1, [[9,9]])

    while (true) {
        let playerAX = prompt("PLAYER A X-COORDINATE: ")
        let playerAY = prompt("PLAYER A Y-COORDINATE: ")
        playerA.attackEnemyGameboard(gameboardB, [playerAX, playerAY])
        if (gameboardB.gameboardLost() == true) return "Player B lost"

        let playerBX = prompt("PLAYER B X-COORDINATE: ")
        let playerBY = prompt("PLAYER B Y-COORDINATE: ")
        playerB.attackEnemyGameboard(gameboardA, [playerBX, playerBY])
        if (gameboardA.gameboardLost() == true) return "Player A lost"
    }
};



// TODO

// render DOM gameboards
//      with visualizing hit/miss/water

// receive user input


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


//console.log(Game())
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7O0FBRTFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGNBQWM7QUFDdEM7QUFDQSw0QkFBNEIsY0FBYztBQUMxQyw4QkFBOEIsU0FBUztBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLHdCQUF3QixpREFBSTs7QUFFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsU0FBUzs7Ozs7Ozs7Ozs7Ozs7QUNuRXhCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxNQUFNOzs7Ozs7Ozs7Ozs7OztBQ2RyQjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUVBQWUsSUFBSTs7Ozs7Ozs7Ozs7Ozs7OztBQzNCMEI7QUFDTjs7QUFFaEM7O0FBRVAsa0JBQWtCLDZEQUFNO0FBQ3hCLGtCQUFrQiw2REFBTTs7QUFFeEIscUJBQXFCLGdFQUFTO0FBQzlCOztBQUVBLHFCQUFxQixnRUFBUztBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7VUNsQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ042Qjs7QUFFN0IscUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuXG4gICAgY29uc3QgRmllbGQgPSB7XG4gICAgICAgIHNoaXAgOiBudWxsLFxuICAgICAgICBoaXQgOiBudWxsLFxuICAgICAgICBtaXNzIDogbnVsbFxuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBnYW1lYm9hcmQgZ3JpZCB3aXRoIEZpZWxkIG9iamVjdCBpbiBlYWNoIGZpZWxkXG4gICAgY29uc3QgX2NyZWF0ZUZpZWxkT2JqZWN0ID0gKGRpbSA9IDEwKSA9PiB7XG4gICAgICAgIGxldCBncmlkID0gW107XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDw9IGRpbSAtIDE7IHgrKykge1xuICAgICAgICAgICAgZ3JpZC5wdXNoKFtdKVxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gZGltIC0gMTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZ3JpZFt4XS5wdXNoKHsuLi5GaWVsZH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdyaWRcbiAgICB9XG5cbiAgICAvLyBpbml0aWFsaXplIGdyaWRcbiAgICBjb25zdCBmaWVsZHMgPSBfY3JlYXRlRmllbGRPYmplY3QoKTtcblxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwTGVuZ3RoLCBjb29yZHMpID0+IHtcblxuICAgICAgICBjb25zdCBuZXdTaGlwID0gU2hpcChzaGlwTGVuZ3RoKVxuXG4gICAgICAgIGZvciAobGV0IGNvb3JkUGFpciBpbiBjb29yZHMpIHtcbiAgICAgICAgICAgIGxldCB4Q29vcmQgPSBjb29yZHNbY29vcmRQYWlyXVswXVxuICAgICAgICAgICAgbGV0IHlDb29yZCA9IGNvb3Jkc1tjb29yZFBhaXJdWzFdXG4gICAgICAgICAgICBmaWVsZHNbeENvb3JkXVt5Q29vcmRdLnNoaXAgPSBuZXdTaGlwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG5cbiAgICAgICAgbGV0IGF0dGFja2VkRmllbGQgPSBmaWVsZHNbeF1beV07XG5cbiAgICAgICAgaWYgKGF0dGFja2VkRmllbGQuc2hpcCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgYXR0YWNrZWRGaWVsZC5zaGlwLmhpdCgpXG4gICAgICAgICAgICBhdHRhY2tlZEZpZWxkLmhpdCA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF0dGFja2VkRmllbGQubWlzcyA9IHRydWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGdhbWVib2FyZExvc3QgPSAoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3Qgcm93IGluIGZpZWxkcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWVsZCBpbiBmaWVsZHNbcm93XSkge1xuICAgICAgICAgICAgICAgIGlmIChmaWVsZHNbcm93XVtmaWVsZF0uc2hpcCAhPT0gbnVsbCAmJiBmaWVsZHNbcm93XVtmaWVsZF0uaGl0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmllbGRzLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgICAgIGdhbWVib2FyZExvc3RcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDsiLCJjb25zdCBQbGF5ZXIgPSAobmFtZSkgPT4ge1xuXG4gICAgY29uc3QgYXR0YWNrRW5lbXlHYW1lYm9hcmQgPSAoZW5lbXlHYW1lYm9hcmQsIGNvb3JkaW5hdGVBcnJheSkgPT4ge1xuICAgICAgICBsZXQgeENvb3JkID0gY29vcmRpbmF0ZUFycmF5WzBdO1xuICAgICAgICBsZXQgeUNvb3JkID0gY29vcmRpbmF0ZUFycmF5WzFdO1xuICAgICAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHhDb29yZCwgeUNvb3JkKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGF0dGFja0VuZW15R2FtZWJvYXJkXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiY29uc3QgU2hpcCA9ICggdW5pdHMgKSA9PiB7XG5cbiAgICBjb25zdCBsZW5ndGggPSB1bml0cztcblxuICAgIGxldCBoaXRzID0gMDtcblxuICAgIGNvbnN0IGdldEhpdHMgPSAoKSA9PiBoaXRzXG5cbiAgICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChpc1N1bmsoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBhbHJlYWR5IHN1bmtcIilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhpdHMrK1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4gZ2V0SGl0cygpID09IGxlbmd0aCA/IHRydWUgOiBmYWxzZVxuIFxuICAgIHJldHVybiB7XG4gICAgICAgIGxlbmd0aCxcbiAgICAgICAgaGl0LFxuICAgICAgICBnZXRIaXRzLFxuICAgICAgICBpc1N1bmtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2ZhY3Rvcmllcy9nYW1lYm9hcmRcIlxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9mYWN0b3JpZXMvcGxheWVyXCJcblxuZXhwb3J0IGZ1bmN0aW9uIEdhbWUgKCkge1xuXG4gICAgbGV0IHBsYXllckEgPSBQbGF5ZXIoXCJBXCIpXG4gICAgbGV0IHBsYXllckIgPSBQbGF5ZXIoXCJCXCIpXG5cbiAgICBsZXQgZ2FtZWJvYXJkQSA9IEdhbWVib2FyZCgpXG4gICAgZ2FtZWJvYXJkQS5wbGFjZVNoaXAoMSwgW1swLDBdXSlcblxuICAgIGxldCBnYW1lYm9hcmRCID0gR2FtZWJvYXJkKClcbiAgICBnYW1lYm9hcmRCLnBsYWNlU2hpcCgxLCBbWzksOV1dKVxuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgbGV0IHBsYXllckFYID0gcHJvbXB0KFwiUExBWUVSIEEgWC1DT09SRElOQVRFOiBcIilcbiAgICAgICAgbGV0IHBsYXllckFZID0gcHJvbXB0KFwiUExBWUVSIEEgWS1DT09SRElOQVRFOiBcIilcbiAgICAgICAgcGxheWVyQS5hdHRhY2tFbmVteUdhbWVib2FyZChnYW1lYm9hcmRCLCBbcGxheWVyQVgsIHBsYXllckFZXSlcbiAgICAgICAgaWYgKGdhbWVib2FyZEIuZ2FtZWJvYXJkTG9zdCgpID09IHRydWUpIHJldHVybiBcIlBsYXllciBCIGxvc3RcIlxuXG4gICAgICAgIGxldCBwbGF5ZXJCWCA9IHByb21wdChcIlBMQVlFUiBCIFgtQ09PUkRJTkFURTogXCIpXG4gICAgICAgIGxldCBwbGF5ZXJCWSA9IHByb21wdChcIlBMQVlFUiBCIFktQ09PUkRJTkFURTogXCIpXG4gICAgICAgIHBsYXllckIuYXR0YWNrRW5lbXlHYW1lYm9hcmQoZ2FtZWJvYXJkQSwgW3BsYXllckJYLCBwbGF5ZXJCWV0pXG4gICAgICAgIGlmIChnYW1lYm9hcmRBLmdhbWVib2FyZExvc3QoKSA9PSB0cnVlKSByZXR1cm4gXCJQbGF5ZXIgQSBsb3N0XCJcbiAgICB9XG59O1xuXG5cblxuLy8gVE9ET1xuXG4vLyByZW5kZXIgRE9NIGdhbWVib2FyZHNcbi8vICAgICAgd2l0aCB2aXN1YWxpemluZyBoaXQvbWlzcy93YXRlclxuXG4vLyByZWNlaXZlIHVzZXIgaW5wdXRcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2dhbWVcIlxuXG4vL2NvbnNvbGUubG9nKEdhbWUoKSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=