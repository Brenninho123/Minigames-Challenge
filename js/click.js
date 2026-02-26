function loadClick() {
    const area = document.getElementById("gameArea");
    area.innerHTML = `
        <h2>Click Speed (5 seconds)</h2>
        <button id="clickBtn">Click Me!</button>
        <p>Clicks: <span id="clicks">0</span></p>
    `;

    let clicks = 0;
    let btn = document.getElementById("clickBtn");
    let counter = document.getElementById("clicks");

    btn.onclick = () => {
        clicks++;
        counter.innerText = clicks;
    };

    setTimeout(() => {
        addScore(clicks);
        alert("Score: " + clicks);
    }, 5000);
}
