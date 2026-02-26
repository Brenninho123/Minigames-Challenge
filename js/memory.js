function loadMemory() {
    const area = document.getElementById("gameArea");
    const emojis = ["🍎","🍌","🍇","🍎","🍌","🍇"];
    let shuffled = emojis.sort(()=>0.5-Math.random());
    let first=null, lock=false;

    area.innerHTML = "<h2>Memory Game</h2><div id='board'></div>";
    let board = document.getElementById("board");

    shuffled.forEach(e=>{
        let card = document.createElement("div");
        card.className="card";
        card.innerText="";
        card.dataset.value=e;
        card.onclick=()=>{
            if(lock||card.innerText!=="") return;
            card.innerText=e;
            if(!first) first=card;
            else{
                if(first.dataset.value===e){
                    addScore(10);
                    first=null;
                }else{
                    lock=true;
                    setTimeout(()=>{
                        card.innerText="";
                        first.innerText="";
                        first=null;
                        lock=false;
                    },1000);
                }
            }
        }
        board.appendChild(card);
    });
}
