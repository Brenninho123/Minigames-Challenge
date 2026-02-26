function loadGuess() {
    const area = document.getElementById("gameArea");
    let number = Math.floor(Math.random()*100)+1;

    area.innerHTML = `
        <h2>Guess Number (1-100)</h2>
        <input id="guessInput" type="number">
        <button onclick="check()">Guess</button>
        <p id="result"></p>
    `;

    window.check = function() {
        let guess = parseInt(document.getElementById("guessInput").value);
        let result = document.getElementById("result");

        if (guess === number) {
            result.innerText = "Correct!";
            addScore(20);
        } else if (guess > number) {
            result.innerText = "Too High!";
        } else {
            result.innerText = "Too Low!";
        }
    }
}
