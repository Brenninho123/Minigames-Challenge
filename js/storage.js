let totalScore = localStorage.getItem("totalScore") 
    ? parseInt(localStorage.getItem("totalScore")) 
    : 0;

document.getElementById("totalScore").innerText = totalScore;

function addScore(points) {
    totalScore += points;
    localStorage.setItem("totalScore", totalScore);
    document.getElementById("totalScore").innerText = totalScore;
    updateRanking();
}

function updateRanking() {
    let list = document.getElementById("rankingList");
    list.innerHTML = "";
    list.innerHTML += "<li>You - " + totalScore + " pts</li>";
}
