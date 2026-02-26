function loadSnake(){
    const area=document.getElementById("gameArea");
    area.innerHTML="<h2>Snake</h2><canvas id='snake' width='400' height='400'></canvas>";

    let canvas=document.getElementById("snake");
    let ctx=canvas.getContext("2d");
    let snake=[{x:10,y:10}];
    let food={x:5,y:5};
    let dx=0,dy=0;

    document.onkeydown=e=>{
        if(e.key==="ArrowUp"){dx=0;dy=-1;}
        if(e.key==="ArrowDown"){dx=0;dy=1;}
        if(e.key==="ArrowLeft"){dx=-1;dy=0;}
        if(e.key==="ArrowRight"){dx=1;dy=0;}
    };

    function draw(){
        ctx.clearRect(0,0,400,400);
        snake.unshift({x:snake[0].x+dx,y:snake[0].y+dy});
        if(snake[0].x===food.x && snake[0].y===food.y){
            addScore(5);
            food={x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)};
        }else snake.pop();

        ctx.fillStyle="lime";
        snake.forEach(s=>ctx.fillRect(s.x*20,s.y*20,18,18));

        ctx.fillStyle="red";
        ctx.fillRect(food.x*20,food.y*20,18,18);
    }

    setInterval(draw,150);
}
