function loadSnake() {

    const area = document.getElementById("gameArea");

    area.innerHTML = `
    <div style="
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:18px;
    position:relative;
    ">

        <h2 style="
        font-size:3rem;
        text-shadow:0 0 25px rgba(0,255,150,.35);
        ">
        🐍 Snake Extreme
        </h2>

        <div style="
        display:flex;
        gap:18px;
        flex-wrap:wrap;
        justify-content:center;
        ">

            <div id="snakeScore" style="
            background:rgba(255,255,255,.08);
            border:1px solid rgba(255,255,255,.08);
            padding:14px 22px;
            border-radius:18px;
            font-size:1.1rem;
            font-weight:bold;
            ">
            Score: 0
            </div>

            <div id="snakeBest" style="
            background:rgba(255,255,255,.08);
            border:1px solid rgba(255,255,255,.08);
            padding:14px 22px;
            border-radius:18px;
            font-size:1.1rem;
            font-weight:bold;
            ">
            Best: 0
            </div>

            <div style="
            background:rgba(255,255,255,.08);
            border:1px solid rgba(255,255,255,.08);
            padding:14px 22px;
            border-radius:18px;
            font-size:1rem;
            ">
            Controls: W A S D
            </div>

        </div>

        <canvas id="snakeCanvas"
        width="500"
        height="500"
        style="
        background:
        radial-gradient(circle at top,#181818,#070707);
        border-radius:28px;
        border:2px solid rgba(255,255,255,.08);
        box-shadow:
        0 20px 50px rgba(0,0,0,.45),
        inset 0 0 50px rgba(0,255,150,.04);
        ">
        </canvas>

    </div>
    `;

    const canvas = document.getElementById("snakeCanvas");

    const ctx = canvas.getContext("2d");

    const gridSize = 25;

    const tileCount = canvas.width / gridSize;

    let snake = [
        {x:10,y:10},
        {x:9,y:10},
        {x:8,y:10}
    ];

    let direction = {x:1,y:0};

    let nextDirection = {x:1,y:0};

    let score = 0;

    let speed = 110;

    let gameOver = false;

    let particles = [];

    let bestScore =
    Number(localStorage.getItem("snakeBest")) || 0;

    document.getElementById("snakeBest")
    .innerText = `Best: ${bestScore}`;

    let food = createFood();

    function createFood(){

        let newFood;

        do{

            newFood = {
                x:Math.floor(Math.random()*tileCount),
                y:Math.floor(Math.random()*tileCount)
            };

        }while(
            snake.some(
                part =>
                part.x === newFood.x &&
                part.y === newFood.y
            )
        );

        return newFood;
    }

    function updateScore(){

        document.getElementById("snakeScore")
        .innerText = `Score: ${score}`;

        if(score > bestScore){

            bestScore = score;

            localStorage.setItem(
                "snakeBest",
                bestScore
            );

            document.getElementById("snakeBest")
            .innerText = `Best: ${bestScore}`;
        }
    }

    function createParticles(x,y){

        for(let i=0;i<10;i++){

            particles.push({
                x,
                y,
                vx:(Math.random()-0.5)*4,
                vy:(Math.random()-0.5)*4,
                alpha:1,
                size:Math.random()*5+2
            });
        }
    }

    document.onkeydown = e => {

        const key = e.key.toLowerCase();

        if(key === "w" && direction.y !== 1){

            nextDirection = {x:0,y:-1};
        }

        if(key === "s" && direction.y !== -1){

            nextDirection = {x:0,y:1};
        }

        if(key === "a" && direction.x !== 1){

            nextDirection = {x:-1,y:0};
        }

        if(key === "d" && direction.x !== -1){

            nextDirection = {x:1,y:0};
        }

        if(key === "r" && gameOver){

            startGame();
        }
    };

    function drawGrid(){

        ctx.strokeStyle = "rgba(255,255,255,.04)";

        for(let i=0;i<tileCount;i++){

            ctx.beginPath();

            ctx.moveTo(i*gridSize,0);

            ctx.lineTo(i*gridSize,canvas.height);

            ctx.stroke();

            ctx.beginPath();

            ctx.moveTo(0,i*gridSize);

            ctx.lineTo(canvas.width,i*gridSize);

            ctx.stroke();
        }
    }

    function drawSnake(){

        snake.forEach((part,index)=>{

            const gradient = ctx.createLinearGradient(
                part.x*gridSize,
                part.y*gridSize,
                part.x*gridSize+gridSize,
                part.y*gridSize+gridSize
            );

            if(index === 0){

                gradient.addColorStop(0,"#00ff99");
                gradient.addColorStop(1,"#00cc66");

            }else{

                gradient.addColorStop(0,"#00d084");
                gradient.addColorStop(1,"#00995c");
            }

            ctx.fillStyle = gradient;

            ctx.shadowBlur = 20;

            ctx.shadowColor = "#00ff99";

            ctx.fillRect(
                part.x*gridSize+2,
                part.y*gridSize+2,
                gridSize-4,
                gridSize-4
            );

            ctx.shadowBlur = 0;
        });
    }

    function drawFood(){

        const pulse =
        Math.sin(Date.now()*0.01)*4;

        ctx.beginPath();

        ctx.fillStyle = "#ff3355";

        ctx.shadowBlur = 25;

        ctx.shadowColor = "#ff3355";

        ctx.arc(
            food.x*gridSize + gridSize/2,
            food.y*gridSize + gridSize/2,
            gridSize/2.7 + pulse*0.1,
            0,
            Math.PI*2
        );

        ctx.fill();

        ctx.shadowBlur = 0;
    }

    function drawParticles(){

        particles.forEach((p,index)=>{

            p.x += p.vx;

            p.y += p.vy;

            p.alpha -= 0.03;

            ctx.globalAlpha = p.alpha;

            ctx.fillStyle = "#00ff99";

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI*2
            );

            ctx.fill();

            ctx.globalAlpha = 1;

            if(p.alpha <= 0){

                particles.splice(index,1);
            }
        });
    }

    function drawGameOver(){

        ctx.fillStyle = "rgba(0,0,0,.7)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillStyle = "white";

        ctx.textAlign = "center";

        ctx.font = "bold 48px Arial";

        ctx.fillText(
            "GAME OVER",
            canvas.width/2,
            210
        );

        ctx.font = "22px Arial";

        ctx.fillText(
            `Final Score: ${score}`,
            canvas.width/2,
            260
        );

        ctx.fillText(
            "Press R to Restart",
            canvas.width/2,
            305
        );
    }

    function update(){

        if(gameOver) return;

        direction = nextDirection;

        const head = {
            x:snake[0].x + direction.x,
            y:snake[0].y + direction.y
        };

        if(
            head.x < 0 ||
            head.y < 0 ||
            head.x >= tileCount ||
            head.y >= tileCount
        ){

            gameOver = true;

            return;
        }

        if(
            snake.some(
                part =>
                part.x === head.x &&
                part.y === head.y
            )
        ){

            gameOver = true;

            return;
        }

        snake.unshift(head);

        if(
            head.x === food.x &&
            head.y === food.y
        ){

            score += 5;

            updateScore();

            if(typeof addScore === "function"){

                addScore(5);
            }

            createParticles(
                food.x*gridSize + gridSize/2,
                food.y*gridSize + gridSize/2
            );

            food = createFood();

            if(speed > 60){

                speed -= 2;

                clearInterval(window.snakeLoop);

                window.snakeLoop =
                setInterval(loop,speed);
            }

        }else{

            snake.pop();
        }
    }

    function render(){

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        drawGrid();

        drawFood();

        drawSnake();

        drawParticles();

        if(gameOver){

            drawGameOver();
        }
    }

    function loop(){

        update();

        render();
    }

    function startGame(){

        snake = [
            {x:10,y:10},
            {x:9,y:10},
            {x:8,y:10}
        ];

        direction = {x:1,y:0};

        nextDirection = {x:1,y:0};

        score = 0;

        speed = 110;

        gameOver = false;

        particles = [];

        food = createFood();

        updateScore();

        clearInterval(window.snakeLoop);

        window.snakeLoop =
        setInterval(loop,speed);
    }

    startGame();
}
