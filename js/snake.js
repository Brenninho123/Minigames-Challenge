function loadSnake() {
    const area = document.getElementById("gameArea");

    area.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
            <h2>Snake</h2>
            <div id="snakeInfo" style="font-size:18px;">Score: 0</div>
            <canvas id="snake" width="400" height="400" 
            style="background:#111;border:3px solid #444;border-radius:12px;"></canvas>
        </div>
    `;

    const canvas = document.getElementById("snake");
    const ctx = canvas.getContext("2d");

    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    let snake = [
        { x: 10, y: 10 }
    ];

    let direction = { x: 1, y: 0 };
    let nextDirection = { x: 1, y: 0 };

    let food = spawnFood();
    let score = 0;
    let gameOver = false;

    function updateScore() {
        document.getElementById("snakeInfo").innerText = `Score: ${score}`;
    }

    function spawnFood() {
        let newFood;

        do {
            newFood = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount)
            };
        } while (
            snake.some(part => part.x === newFood.x && part.y === newFood.y)
        );

        return newFood;
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = { x: 1, y: 0 };
        nextDirection = { x: 1, y: 0 };
        food = spawnFood();
        score = 0;
        gameOver = false;
        updateScore();
    }

    document.onkeydown = e => {
        if (e.key === "ArrowUp" && direction.y !== 1) {
            nextDirection = { x: 0, y: -1 };
        }

        if (e.key === "ArrowDown" && direction.y !== -1) {
            nextDirection = { x: 0, y: 1 };
        }

        if (e.key === "ArrowLeft" && direction.x !== 1) {
            nextDirection = { x: -1, y: 0 };
        }

        if (e.key === "ArrowRight" && direction.x !== -1) {
            nextDirection = { x: 1, y: 0 };
        }

        if (e.key.toLowerCase() === "r" && gameOver) {
            resetGame();
        }
    };

    function drawGrid() {
        ctx.strokeStyle = "#1f1f1f";

        for (let i = 0; i < tileCount; i++) {
            ctx.beginPath();
            ctx.moveTo(i * gridSize, 0);
            ctx.lineTo(i * gridSize, canvas.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, i * gridSize);
            ctx.lineTo(canvas.width, i * gridSize);
            ctx.stroke();
        }
    }

    function drawSnake() {
        snake.forEach((part, index) => {
            ctx.fillStyle = index === 0 ? "#00ff99" : "#00cc66";

            ctx.fillRect(
                part.x * gridSize + 1,
                part.y * gridSize + 1,
                gridSize - 2,
                gridSize - 2
            );
        });
    }

    function drawFood() {
        ctx.fillStyle = "#ff3333";

        ctx.beginPath();
        ctx.arc(
            food.x * gridSize + gridSize / 2,
            food.y * gridSize + gridSize / 2,
            gridSize / 2.5,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    function drawGameOver() {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#fff";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, 180);

        ctx.font = "20px Arial";
        ctx.fillText("Press R to Restart", canvas.width / 2, 220);
    }

    function update() {
        if (gameOver) return;

        direction = nextDirection;

        const head = {
            x: snake[0].x + direction.x,
            y: snake[0].y + direction.y
        };

        if (
            head.x < 0 ||
            head.y < 0 ||
            head.x >= tileCount ||
            head.y >= tileCount
        ) {
            gameOver = true;
            return;
        }

        if (
            snake.some(
                part => part.x === head.x && part.y === head.y
            )
        ) {
            gameOver = true;
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 5;

            if (typeof addScore === "function") {
                addScore(5);
            }

            updateScore();
            food = spawnFood();
        } else {
            snake.pop();
        }
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawGrid();
        drawFood();
        drawSnake();

        if (gameOver) {
            drawGameOver();
        }
    }

    function loop() {
        update();
        render();
    }

    updateScore();

    if (window.snakeInterval) {
        clearInterval(window.snakeInterval);
    }

    window.snakeInterval = setInterval(loop, 110);
}
