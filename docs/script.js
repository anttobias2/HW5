/*
    Anthony Tobias
    CPSC 332: HW5
    11/7/2022 
    This is a script file the creates and performs the game "Breakout"
*/
// 
var color1 = "red";
var color2 = "white";

        window.onload = function () {
            var canvas = document.getElementById("myCanvas");
            var speedSlider = document.getElementById("ballSpeed");
            var ballSpeed = document.getElementById("speedVal");
            var ctx = canvas.getContext("2d");
            var ballRadius = 10;
            var x = canvas.width / 2;
            var y = canvas.height - 30;
            var dx = 2;
            var dy = -2;
            var paddleHeight = 10;
            var paddleWidth = 75;
            var paddleX = (canvas.width - paddleWidth) / 2;
            var rightPressed = false;
            var leftPressed = false;
            var brickRowCount = 5;
            var brickColumnCount = 3;
            var brickWidth = 75;
            var brickHeight = 20;
            var brickPadding = 10;
            var brickOffsetTop = 30;
            var brickOffsetLeft = 30;
            var score = 0;
            var lives = 3;
            var highScore = 0;
            var menuPos = 30;
            var startX = 180;
            var startY = 220;
            var startWidth = 120;
            var startHeight = 40;

            var bricks = [];

            for (var c = 0; c < brickColumnCount; c++) {
                bricks[c] = [];
                for (var r = 0; r < brickRowCount; r++) {
                    bricks[c][r] = { x: 0, y: 0, status: 1 };
                }
            }

            document.addEventListener("keydown", keyDownHandler, false);
            document.addEventListener("keyup", keyUpHandler, false);
            document.addEventListener("mousemove", mouseMoveHandler, false);
            speedSlider.addEventListener("input", adjustGameSpeed);
            document.getElementById("pause").addEventListener("click", togglePauseGame);
            document.getElementById("reload").addEventListener("click", reloadWindow);
            document.getElementById("newGame").addEventListener("click", startNewGame);
            document.getElementById("continue").addEventListener("click", continuePlaying);

            function keyDownHandler(e) {
                if (e.keyCode == 39) {
                    rightPressed = true;
                }
                else if (e.keyCode == 37) {
                    leftPressed = true;
                }
            }

            function keyUpHandler(e) {
                if (e.keyCode == 39) {
                    rightPressed = false;
                }
                else if (e.keyCode == 37) {
                    leftPressed = false;
                }
            }

            function mouseMoveHandler(e) {
                var relativeX = e.clientX - canvas.offsetLeft;
                if (relativeX > 0 && relativeX < canvas.width) {
                    paddleX = relativeX - paddleWidth / 2;
                }
            }

            function collisionDetection() {
                for (var c = 0; c < brickColumnCount; c++) {
                    for (var r = 0; r < brickRowCount; r++) {
                        var b = bricks[c][r];
                        if (b.status == 1) {
                            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                                dy = -dy;
                                b.status = 0;
                                score++;
                                if (checkWinState()) {
                                    //TODO: draw message on the canvas
                                    pause = true;
                                    
                                }
                            }
                        }
                    }
                }
            }

            function drawBall() {
                ctx.beginPath();
                ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
                ctx.fillStyle = color1;
                ctx.fill();
                ctx.closePath();
            }

            function drawPaddle() {
                ctx.beginPath();
                ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
                ctx.fillStyle = color1;
                ctx.fill();
                ctx.closePath();
            }

            function drawBricks() {
                for (var c = 0; c < brickColumnCount; c++) {
                    for (var r = 0; r < brickRowCount; r++) {
                        if (bricks[c][r].status == 1) {
                            var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                            var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                            bricks[c][r].x = brickX;
                            bricks[c][r].y = brickY;
                            ctx.beginPath();
                            ctx.rect(brickX, brickY, brickWidth, brickHeight);
                            ctx.fillStyle = color1;
                            ctx.fill();
                            ctx.closePath();
                        }
                    }
                }
            }
            function drawScore() {
                ctx.font = "16px Arial";
                ctx.fillStyle = color1;
                ctx.fillText("Score: " + score, 60, 20);
            }

            function drawLives() {
                ctx.font = "16px Arial";
                ctx.fillStyle = color1;
                ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
            }

            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawBricks();
                drawBall();
                drawPaddle();
                drawScore();
                drawHighScore();
                drawLives();
                collisionDetection();

                if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                    dx = -dx;
                }
                if (y + dy < ballRadius) {
                    dy = -dy;
                }
                else if (y + dy > canvas.height - ballRadius) {
                    if (x > paddleX && x < paddleX + paddleWidth) {
                        dy = -dy;
                    }
                    else {
                        lives--;
                        if (lives <= 0) {
                            pause = true;
                        }
                        else {
                            x = canvas.width / 2;
                            y = canvas.height - 30;
                            dx = 3;
                            dy = -3;
                            paddleX = (canvas.width - paddleWidth) / 2;
                        }
                    }
                }

                if (rightPressed && paddleX < canvas.width - paddleWidth) {
                    paddleX += 7;
                }
                else if (leftPressed && paddleX > 0) {
                    paddleX -= 7;
                }

                //TODO: adjust speed
                x += dx;
                y += dy;

                //TODO: pause game check
                if(pause == false){
                    requestAnimationFrame(draw);
                }
                
            }

            /*
                Additions to starter code
            */

            //Additional variables used to help make dimensions/locations easier to reuse            
            //controls game speed            
            //pause game variable            
            //high score tracking variables
            //other variables?            

            //event listeners added
            //game speed changes handler            
            //pause game event handler            
            //start a new game event handler            
            //continue playing
            //reload click event listener            

            //Drawing a high score
            function drawHighScore() {
                if (score >= highScore){
                    highScore = score
                    ctx.font = "16px Arial";
                    ctx.fillStyle = color1;
                    ctx.fillText("High score: " + highScore, 210, 20);
                }
                
            }

            //draw the menu screen, including labels and button
            function drawMenu() {


                //draw the rectangle menu backdrop
                ctx.beginPath();
                let width = canvas.width - menuPos*2;
                let height = canvas.height - menuPos*2;
             
                ctx.rect(menuPos, menuPos, width, height);
                ctx.fillStyle = color1;
                ctx.fill();
                ctx.closePath();


                //draw the menu header
                ctx.font = "40px Arial";
                ctx.fillStyle = color2;
                ctx.fillText("Breakout Game!", canvas.width / 4.5, 80);
                
                //start game button area
                ctx.beginPath();
                ctx.rect(startX, startY, startWidth, startHeight);
                ctx.fillStyle = color2;
                ctx.fill();
                ctx.closePath();

                ctx.font = "20px Arial"
                ctx.fillStyle = "black";
                ctx.fillText("Start Game", startX + 10, startY + 25)
                //event listener for clicking start
                //need to add it here because the menu should be able to come back after 
                //we remove the it later          
                canvas.addEventListener("click", startGameClick); 
            }

            //function used to set shadow properties
            function setShadow() {

            };

            //function used to reset shadow properties to 'normal'
            function resetShadow() {

            };

            //function to clear the menu when we want to start the game
            function clearMenu() {
                //remove event listener for menu, 
                //we don't want to trigger the start game click event during a game  
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.removeEventListener("click", startGameClick);              
            }

            //function to start the game
            //this should check to see if the player clicked the button
            //i.e., did the user click in the bounds of where the button is drawn
            //if so, we want to trigger the draw(); function to start our game
            function startGameClick(event) {
                let x = event.clientX - canvas.offsetLeft;
                let y = event.clientY - canvas.offsetTop;

                let buttonEndX = startX + startWidth;
                let buttonEndY = startY + startHeight;

                if (x >= startX && x <= buttonEndX && y >= startY && y <= buttonEndY){
                    pause = false;
                    clearMenu();
                    draw();
                }
            };

            //function to handle game speed adjustments when we move our slider
            function adjustGameSpeed() {
                //update the slider display                
                //update the game speed multiplier  
                let speed = speedSlider.value;
                ballSpeed.innerHTML = speed;

                dx = (Math.abs(dx) / dx) * speed * 3;
                dy = (Math.abs(dy) / dy) * speed * 3;
            };

            //function to toggle the play/paused game state
            function togglePauseGame() {
                //toggle state                
                //if we are not paused, we want to continue animating (hint: zyBook 8.9)
                pause = !pause;
                draw();
            };

            //function to check win state
            //if we win, we want to accumulate high score and draw a message to the canvas
            //if we lose, we want to draw a losing message to the canvas
            function checkWinState() {
                if (score == brickRowCount * brickColumnCount){
                    return true;
                }
                else {
                    return false;
                }
            };

            //function to clear the board state and start a new game (no high score accumulation)
            function startNewGame(resetScore) {
                clearMenu();
                resetBoard();
            };

            //function to reset the board and continue playing (accumulate high score)
            //should make sure we didn't lose before accumulating high score
            function continuePlaying() {

            };

            //function to reset starting game info
            function resetBoard(resetLives) {
                //reset paddle position
                //reset bricks               
                //reset score and lives 
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;  
                drawBricks();            
            };

            function reloadWindow(){
                document.location.reload();
            }

            //draw the menu.
            //we don't want to immediately draw... only when we click start game            
            drawMenu();

        };