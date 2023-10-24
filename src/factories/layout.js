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

export default Layout;