function loadTicTacToe(){
    const area=document.getElementById("gameArea");
    area.innerHTML="<h2>Tic Tac Toe</h2><div id='grid'></div>";
    let grid=document.getElementById("grid");
    let board=["","","","","","","","",""];
    let player="X";

    board.forEach((_,i)=>{
        let cell=document.createElement("div");
        cell.className="card";
        cell.onclick=()=>{
            if(board[i]===""){
                board[i]=player;
                cell.innerText=player;
                player=player==="X"?"O":"X";
            }
        };
        grid.appendChild(cell);
    });
}
