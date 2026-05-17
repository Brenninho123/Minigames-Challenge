function loadMemoryGame() {

    const area = document.getElementById("gameArea");

    const icons = [
        "🍎","🍌","🍇","🍒",
        "🍉","🥝","🍍","🍓"
    ];

    let cardsData = [...icons, ...icons]
    .sort(() => Math.random() - 0.5);

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matches = 0;
    let moves = 0;

    area.innerHTML = `
    <div style="
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:20px;
    ">

        <h2 style="
        font-size:2.5rem;
        ">
        🧠 Memory Game
        </h2>

        <div style="
        display:flex;
        gap:20px;
        flex-wrap:wrap;
        justify-content:center;
        ">

            <div id="memoryMoves" style="
            background:rgba(255,255,255,0.08);
            padding:12px 20px;
            border-radius:16px;
            ">
            Moves: 0
            </div>

            <div id="memoryMatches" style="
            background:rgba(255,255,255,0.08);
            padding:12px 20px;
            border-radius:16px;
            ">
            Matches: 0 / 8
            </div>

        </div>

        <div id="memoryBoard" style="
        display:grid;
        grid-template-columns:repeat(4,110px);
        gap:14px;
        justify-content:center;
        ">
        </div>

    </div>
    `;

    const board = document.getElementById("memoryBoard");
    const movesText = document.getElementById("memoryMoves");
    const matchesText = document.getElementById("memoryMatches");

    cardsData.forEach(icon => {

        const card = document.createElement("button");

        card.className = "memory-card";

        card.dataset.value = icon;

        card.innerHTML = `
        <div style="
        font-size:2.4rem;
        opacity:0;
        transform:scale(.4);
        transition:.2s;
        ">
        ${icon}
        </div>
        `;

        card.style.width = "110px";
        card.style.height = "110px";
        card.style.border = "none";
        card.style.borderRadius = "22px";
        card.style.cursor = "pointer";
        card.style.background = `
        linear-gradient(
        135deg,
        rgba(100,100,255,.9),
        rgba(140,50,255,.9)
        )
        `;
        card.style.boxShadow = `
        0 10px 25px rgba(0,0,0,.3)
        `;
        card.style.transition = ".15s";
        card.style.position = "relative";

        card.onmouseenter = () => {
            if (!card.classList.contains("flipped")) {
                card.style.transform = "translateY(-4px)";
            }
        };

        card.onmouseleave = () => {
            if (!card.classList.contains("flipped")) {
                card.style.transform = "translateY(0px)";
            }
        };

        card.onclick = () => {

            if (
                lockBoard ||
                card === firstCard ||
                card.classList.contains("matched")
            ) return;

            revealCard(card);

            if (!firstCard) {
                firstCard = card;
                return;
            }

            secondCard = card;

            moves++;

            movesText.innerText = `Moves: ${moves}`;

            if (
                firstCard.dataset.value ===
                secondCard.dataset.value
            ) {

                firstCard.classList.add("matched");
                secondCard.classList.add("matched");

                firstCard.style.background = `
                linear-gradient(
                135deg,
                #00c853,
                #00e676
                )
                `;

                secondCard.style.background = `
                linear-gradient(
                135deg,
                #00c853,
                #00e676
                )
                `;

                matches++;

                matchesText.innerText =
                `Matches: ${matches} / 8`;

                addScore(10);

                firstCard = null;
                secondCard = null;

                if (matches >= 8) {

                    setTimeout(() => {

                        area.innerHTML += `
                        <div style="
                        position:absolute;
                        inset:0;
                        background:rgba(0,0,0,.7);
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        backdrop-filter:blur(8px);
                        ">

                            <div style="
                            background:rgba(255,255,255,.08);
                            border:1px solid rgba(255,255,255,.12);
                            padding:40px;
                            border-radius:28px;
                            text-align:center;
                            ">

                                <h1 style="
                                font-size:3rem;
                                margin-bottom:15px;
                                ">
                                🎉 Victory
                                </h1>

                                <p style="
                                opacity:.75;
                                margin-bottom:25px;
                                ">
                                You completed the board
                                in ${moves} moves
                                </p>

                                <button onclick="loadMemoryGame()" style="
                                border:none;
                                padding:15px 28px;
                                border-radius:18px;
                                cursor:pointer;
                                font-size:1rem;
                                font-weight:bold;
                                background:
                                linear-gradient(
                                135deg,
                                #5b5bff,
                                #8c42ff
                                );
                                color:white;
                                ">
                                Play Again
                                </button>

                            </div>

                        </div>
                        `;

                    }, 500);
                }

            } else {

                lockBoard = true;

                setTimeout(() => {

                    hideCard(firstCard);
                    hideCard(secondCard);

                    firstCard = null;
                    secondCard = null;

                    lockBoard = false;

                }, 850);
            }
        };

        board.appendChild(card);
    });

    function revealCard(card) {

        card.classList.add("flipped");

        card.style.transform = "scale(.96)";
        card.style.background = `
        linear-gradient(
        135deg,
        rgba(255,255,255,.18),
        rgba(255,255,255,.08)
        )
        `;

        const icon = card.firstElementChild;

        icon.style.opacity = "1";
        icon.style.transform = "scale(1)";
    }

    function hideCard(card) {

        card.classList.remove("flipped");

        card.style.transform = "scale(1)";
        card.style.background = `
        linear-gradient(
        135deg,
        rgba(100,100,255,.9),
        rgba(140,50,255,.9)
        )
        `;

        const icon = card.firstElementChild;

        icon.style.opacity = "0";
        icon.style.transform = "scale(.4)";
    }
}
