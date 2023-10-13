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

export default Computer;