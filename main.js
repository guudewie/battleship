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


console.log((0,_game__WEBPACK_IMPORTED_MODULE_0__.Game)())
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7O0FBRTFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGNBQWM7QUFDdEM7QUFDQSw0QkFBNEIsY0FBYztBQUMxQyw4QkFBOEIsU0FBUztBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLHdCQUF3QixpREFBSTs7QUFFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsU0FBUzs7Ozs7Ozs7Ozs7Ozs7QUNuRXhCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxNQUFNOzs7Ozs7Ozs7Ozs7OztBQ2RyQjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUVBQWUsSUFBSTs7Ozs7Ozs7Ozs7Ozs7OztBQzNCMEI7QUFDTjs7QUFFaEM7O0FBRVAsa0JBQWtCLDZEQUFNO0FBQ3hCLGtCQUFrQiw2REFBTTs7QUFFeEIscUJBQXFCLGdFQUFTO0FBQzlCOztBQUVBLHFCQUFxQixnRUFBUztBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDekJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNONkI7O0FBRTdCLFlBQVksMkNBQUksRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBGaWVsZCA9IHtcbiAgICAgICAgc2hpcCA6IG51bGwsXG4gICAgICAgIGhpdCA6IG51bGwsXG4gICAgICAgIG1pc3MgOiBudWxsXG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGdhbWVib2FyZCBncmlkIHdpdGggRmllbGQgb2JqZWN0IGluIGVhY2ggZmllbGRcbiAgICBjb25zdCBfY3JlYXRlRmllbGRPYmplY3QgPSAoZGltID0gMTApID0+IHtcbiAgICAgICAgbGV0IGdyaWQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPD0gZGltIC0gMTsgeCsrKSB7XG4gICAgICAgICAgICBncmlkLnB1c2goW10pXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSBkaW0gLSAxOyB5KyspIHtcbiAgICAgICAgICAgICAgICBncmlkW3hdLnB1c2goey4uLkZpZWxkfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JpZFxuICAgIH1cblxuICAgIC8vIGluaXRpYWxpemUgZ3JpZFxuICAgIGNvbnN0IGZpZWxkcyA9IF9jcmVhdGVGaWVsZE9iamVjdCgpO1xuXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBMZW5ndGgsIGNvb3JkcykgPT4ge1xuXG4gICAgICAgIGNvbnN0IG5ld1NoaXAgPSBTaGlwKHNoaXBMZW5ndGgpXG5cbiAgICAgICAgZm9yIChsZXQgY29vcmRQYWlyIGluIGNvb3Jkcykge1xuICAgICAgICAgICAgbGV0IHhDb29yZCA9IGNvb3Jkc1tjb29yZFBhaXJdWzBdXG4gICAgICAgICAgICBsZXQgeUNvb3JkID0gY29vcmRzW2Nvb3JkUGFpcl1bMV1cbiAgICAgICAgICAgIGZpZWxkc1t4Q29vcmRdW3lDb29yZF0uc2hpcCA9IG5ld1NoaXA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcblxuICAgICAgICBsZXQgYXR0YWNrZWRGaWVsZCA9IGZpZWxkc1t4XVt5XTtcblxuICAgICAgICBpZiAoYXR0YWNrZWRGaWVsZC5zaGlwICE9PSBudWxsKSB7XG4gICAgICAgICAgICBhdHRhY2tlZEZpZWxkLnNoaXAuaGl0KClcbiAgICAgICAgICAgIGF0dGFja2VkRmllbGQuaGl0ID0gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXR0YWNrZWRGaWVsZC5taXNzID0gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZ2FtZWJvYXJkTG9zdCA9ICgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCByb3cgaW4gZmllbGRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkIGluIGZpZWxkc1tyb3ddKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkc1tyb3ddW2ZpZWxkXS5zaGlwICE9PSBudWxsICYmIGZpZWxkc1tyb3ddW2ZpZWxkXS5oaXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmaWVsZHMsXG4gICAgICAgIHBsYWNlU2hpcCxcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcbiAgICAgICAgZ2FtZWJvYXJkTG9zdFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkOyIsImNvbnN0IFBsYXllciA9IChuYW1lKSA9PiB7XG5cbiAgICBjb25zdCBhdHRhY2tFbmVteUdhbWVib2FyZCA9IChlbmVteUdhbWVib2FyZCwgY29vcmRpbmF0ZUFycmF5KSA9PiB7XG4gICAgICAgIGxldCB4Q29vcmQgPSBjb29yZGluYXRlQXJyYXlbMF07XG4gICAgICAgIGxldCB5Q29vcmQgPSBjb29yZGluYXRlQXJyYXlbMV07XG4gICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeENvb3JkLCB5Q29vcmQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgYXR0YWNrRW5lbXlHYW1lYm9hcmRcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJjb25zdCBTaGlwID0gKCB1bml0cyApID0+IHtcblxuICAgIGNvbnN0IGxlbmd0aCA9IHVuaXRzO1xuXG4gICAgbGV0IGhpdHMgPSAwO1xuXG4gICAgY29uc3QgZ2V0SGl0cyA9ICgpID0+IGhpdHNcblxuICAgIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGlzU3VuaygpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGFscmVhZHkgc3Vua1wiKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGl0cysrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiBnZXRIaXRzKCkgPT0gbGVuZ3RoID8gdHJ1ZSA6IGZhbHNlXG4gXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGVuZ3RoLFxuICAgICAgICBoaXQsXG4gICAgICAgIGdldEhpdHMsXG4gICAgICAgIGlzU3Vua1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZmFjdG9yaWVzL2dhbWVib2FyZFwiXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL2ZhY3Rvcmllcy9wbGF5ZXJcIlxuXG5leHBvcnQgZnVuY3Rpb24gR2FtZSAoKSB7XG5cbiAgICBsZXQgcGxheWVyQSA9IFBsYXllcihcIkFcIilcbiAgICBsZXQgcGxheWVyQiA9IFBsYXllcihcIkJcIilcblxuICAgIGxldCBnYW1lYm9hcmRBID0gR2FtZWJvYXJkKClcbiAgICBnYW1lYm9hcmRBLnBsYWNlU2hpcCgxLCBbWzAsMF1dKVxuXG4gICAgbGV0IGdhbWVib2FyZEIgPSBHYW1lYm9hcmQoKVxuICAgIGdhbWVib2FyZEIucGxhY2VTaGlwKDEsIFtbOSw5XV0pXG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBsZXQgcGxheWVyQVggPSBwcm9tcHQoXCJQTEFZRVIgQSBYLUNPT1JESU5BVEU6IFwiKVxuICAgICAgICBsZXQgcGxheWVyQVkgPSBwcm9tcHQoXCJQTEFZRVIgQSBZLUNPT1JESU5BVEU6IFwiKVxuICAgICAgICBwbGF5ZXJBLmF0dGFja0VuZW15R2FtZWJvYXJkKGdhbWVib2FyZEIsIFtwbGF5ZXJBWCwgcGxheWVyQVldKVxuICAgICAgICBpZiAoZ2FtZWJvYXJkQi5nYW1lYm9hcmRMb3N0KCkgPT0gdHJ1ZSkgcmV0dXJuIFwiUGxheWVyIEIgbG9zdFwiXG5cbiAgICAgICAgbGV0IHBsYXllckJYID0gcHJvbXB0KFwiUExBWUVSIEIgWC1DT09SRElOQVRFOiBcIilcbiAgICAgICAgbGV0IHBsYXllckJZID0gcHJvbXB0KFwiUExBWUVSIEIgWS1DT09SRElOQVRFOiBcIilcbiAgICAgICAgcGxheWVyQi5hdHRhY2tFbmVteUdhbWVib2FyZChnYW1lYm9hcmRBLCBbcGxheWVyQlgsIHBsYXllckJZXSlcbiAgICAgICAgaWYgKGdhbWVib2FyZEEuZ2FtZWJvYXJkTG9zdCgpID09IHRydWUpIHJldHVybiBcIlBsYXllciBBIGxvc3RcIlxuICAgIH1cbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vZ2FtZVwiXG5cbmNvbnNvbGUubG9nKEdhbWUoKSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=