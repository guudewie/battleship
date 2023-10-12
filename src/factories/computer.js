const Computer = () => {

    const getRandomMove = () => {

        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);

        return [x,y]
    }

    return {
        getRandomMove
    }
};

export default Computer;