document.addEventListener('DOMContentLoaded', ()=> {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');
    
    const width = 10;
    let currentIndex = 0; //first div in grid
    let appleIndex = 0;
    let currentSnake = [2,1,0] // 2 is snake's head
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    //to start and restart the game

    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime);
    }

    //function that deals with all of the outcomes of the Snake
    function moveOutcomes() {
        //deals with snake hitting border and snake hitting slef
        if( 
            (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || //if the snake hits right border
            (currentSnake[0] % width === 0 && direction === -1) || //if the snake hits left border
            (currentSnake[0] - width < 0 && direction === -width) || //if the snake hits top border
            squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
        ){
            return clearInterval(interval); //this will clear the interval
        };

        const tail = currentSnake.pop(); //removes the last item from the array
        squares[tail].classList.remove('snake'); //removes class of the snake from the tail
        currentSnake.unshift(currentSnake[0] + direction); //gives direction to the head of the array
        
        //deals with snake hitting apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            randomApple()
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }
        squares[currentSnake[0]].classList.add('snake');
    }
    
    //generate random apple

    function randomApple() {
        appleIndex = Math.floor(Math.random() * squares.length);
        if (!squares[appleIndex].classList.contains('snake')) {
            squares[appleIndex].classList.add('apple')
        } else if (squares[appleIndex].classList.contains('snake')) {
            randomApple();
            return;
        }
        
    }

    //assign functions to keycodes

    function control(e) {
        squares[currentIndex].classList.remove('snake'); //we are removing snake class
        
        if(e.keyCode === 39) {
            direction = 1; //if we press the right arrow the snake will go right
        } else if (e.keyCode ===  38) {
            direction = -width; //if we press the up arrow the snake will go up
        } else if (e.keyCode === 37) {
            direction = -1; //if we press the left arrow the snake will go left
        } else if (e.keyCode === 40) {
            direction = width; //if we press the down arrow the snake will go down
        }
    }

    document.addEventListener('keydown', control);
    startBtn.addEventListener('click', startGame);
});