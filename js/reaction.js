function loadReaction(){
    const area=document.getElementById("gameArea");
    area.innerHTML="<h2>Reaction Test</h2><div id='box' style='width:200px;height:200px;background:red;margin:auto;border-radius:20px;'></div>";

    let box=document.getElementById("box");
    let start;

    setTimeout(()=>{
        box.style.background="green";
        start=Date.now();
    },2000+Math.random()*2000);

    box.onclick=()=>{
        if(box.style.background==="green"){
            let time=Date.now()-start;
            addScore(Math.max(0,500-time));
            alert("Reaction: "+time+"ms");
        }
    }
}
