
let canvas = document.createElement('canvas');
canvas.id = "gameScreen";
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);
let ctx = canvas.getContext("2d");
let isKeyPressed = false;
let snake = [{ x: 20, y: 0 }, { x: 40, y: 0 }];
let fruit = generateRandomFruit()
let score = 0;

let dx = 20;
let dy = 0;
let state = "1";   // Game states 1- main menu 2- playing 3- game over




function gameLoop() {


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameUI();

    if (state == 1) {
        mainMenu(ctx);
    }

    if (state == 2) {
        drawFruit(ctx);
        drawSnake(ctx); 
        gameUI();
        collisions();  
        moveSnake();
    }

    if (state == 3) {
        gameOver();
    }



}

setInterval(gameLoop, 100)


function drawSnake(ctx) {
    ctx.fillStyle = "black";
    for (let i = 0; i < snake.length; i++) {

        ctx.fillRect(snake[i].x, snake[i].y, 19, 19);

    }
}

function moveSnake() {
    isKeyPressed = false;
    document.addEventListener("keydown", event => {

        switch (event.keyCode) {
            case 65:
                if (dy != 0 && isKeyPressed == false) {
                    dx = -20;
                    dy = 0;
                    isKeyPressed = true;
                }

                break;

            case 68:
                if (dy != 0 && isKeyPressed == false) {
                    dx = +20;
                    dy = 0;
                    isKeyPressed = true;
                }

                break;

            case 87:
                if (dx != 0 && isKeyPressed == false) {
                    dx = 0;
                    dy = -20;
                    isKeyPressed = true;
                }
                break;

            case 83:
                if (dx != 0 && isKeyPressed == false) {
                    dx = 0;
                    dy = 20;
                    isKeyPressed = true;
                }
                break;


        }

    });

    let snakeHead = snake[snake.length - 1];
    let newHead = { x: snakeHead.x + dx, y: snakeHead.y + dy }
    snake.push(newHead);
    snake.shift();



}


function drawFruit(ctx) {
    
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(fruit.x, fruit.y, 19, 19);
    if (isFruitEaten()) {
        fruit = generateRandomFruit();
    }
    
}

function isFruitEaten () {
    if (snake[snake.length-1].x == fruit.x && snake[snake.length-1].y == fruit.y) {
        snake.unshift({ x: snake[0].x, y: snake[0].y })
        score++;
        return true;
    } 
    return false;
}



function generateRandomFruit() {  // return an object with X and Y
    let fruit = { x: (Math.floor(Math.random() * 30) + 0) * 20 , y: (Math.floor(Math.random() * 30) + 0) * 20}
    return fruit
}

function collisions () {
    if (snake[snake.length -1].x == canvas.width) {
        snake[snake.length -1].x = 0;
    }

    if (snake[snake.length -1].x == -20) {
        snake[snake.length -1].x = 580;
    }

    if (snake[snake.length -1].y == -20) {
        snake[snake.length -1].y = 580;
    }

    if (snake[snake.length -1].y == canvas.height) {
        snake[snake.length -1].y = 0;
    }

    for (let i = 1; i < snake.length - 1; i++) {
        if (snake[snake.length -1].x == snake[i].x && snake[snake.length -1].y == snake[i].y) {
            state = 3;
        }
        
    }
}

function gameOver() {
    ctx.fillStyle = "black";
    ctx.font = "30px comicsans";
    ctx.fillText("Game Over :(", canvas.width / 2 - 150, 200);
    ctx.fillText("Press [Enter] to start again", canvas.width / 2 - 150, 300);
    snake = [{ x: 20, y: 0 }, { x: 40, y: 0 }];
    score = 0;
    dx = 20;
    dy = 0;

    document.addEventListener("keydown", event => {
        if (event.keyCode == 13) {
            state = 2;
        }
    });

}


function mainMenu(ctx) {
    ctx.fillStyle = "black";
    ctx.font = "30px comicsans";
    ctx.fillText("Welcome to snake game", canvas.width / 2 - 150, 200);
    ctx.fillText("Press [Enter] to start", canvas.width / 2 - 150, 300);

    document.addEventListener("keydown", event => {
        if (event.keyCode == 13) {
            state = 2;
        }
    });

}

function gameUI () {
    let scoreTag = document.getElementById("score");
    scoreTag.innerHTML = "Score: " + score;
}








