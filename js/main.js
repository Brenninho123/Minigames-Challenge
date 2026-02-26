function openGame(game) {
    const area = document.getElementById("gameArea");
    area.innerHTML = "";

    if (game === "click") loadClick();
    if (game === "guess") loadGuess();
    if (game === "memory") loadMemory();
    if (game === "reaction") loadReaction();
    if (game === "snake") loadSnake();
    if (game === "ttt") loadTicTacToe();
}
