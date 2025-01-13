let seccode = "";
const len = 4;
const maxmove = 8;
let leftmov;
let movehistory = [];

function gencode() {
    seccode = "";
    for (let i = 0; i < len; i++) {
        const dig = Math.floor(Math.random() * 10);
        seccode += dig;
    }
}

function startgame() {
    gencode();
    leftmov = maxmove;
    movehistory = [];
    document.getElementById("hint").innerText = "The game has started! Make your guess.";
    document.getElementById("feedback").innerText = "";
    document.getElementById("moves-left").innerText = `Moves left: ${leftmov}`;
    document.getElementById("guess-input").value = "";
    document.getElementById("history").innerHTML = "";
}

function guess() {
    const gss = document.getElementById("guess-input").value;
    if (gss.length != len || isNaN(gss)) {
        alert(`Please enter a ${len}-digit number`);
        return;
    }
    leftmov--;
    const { rightpos, rightdigits } = evaluate(gss);

    movehistory.push({ gss, rightpos, rightdigits });

    updatehistory(rightpos, rightdigits);

    if (rightpos === len) {
        document.getElementById("feedback").innerText = "Congratulations! You guessed the code!";
        document.getElementById("hint").innerText = "";
        document.getElementById("moves-left").innerText = `You won with ${leftmov} moves left!`;
        return;
    }

    if (leftmov > 0) {
        document.getElementById("feedback").innerText = "Keep trying!";
        document.getElementById("moves-left").innerText = `Moves left: ${leftmov}`;
    } else {
        document.getElementById("feedback").innerText = `Game over! The secret code was: ${seccode}`;
        document.getElementById("hint").innerText = "";
        document.getElementById("moves-left").innerText = "No moves left!";
    }
}

function evaluate(gss) {
    let rightpos = 0;
    let rightdigits = 0;
    const secarr = seccode.split("");
    const guessarr = gss.split("");

    const sec1 = [];
    const guess1 = [];

    for (let i = 0; i < len; i++) {
        if (guessarr[i] === secarr[i]) rightpos++;
        else {
            sec1.push(secarr[i]);
            guess1.push(guessarr[i]);
        }
    }
    guess1.forEach((digit) => {
        const ind = sec1.indexOf(digit);
        if (ind !== -1) {
            rightdigits++;
            sec1.splice(ind, 1);
        }
    });
    return { rightpos, rightdigits };
}

function updatehistory(rightpos, rightdigits) {
    const historyContainer = document.getElementById("history");

    const entry = document.createElement("div");
    entry.classList.add("history-entry");

    entry.innerHTML = `
        <div class="guess">${movehistory[movehistory.length - 1].gss}</div>
        <div class="dots">${generateDots(rightpos, rightdigits)}</div>
    `;

    historyContainer.appendChild(entry);
}

function generateDots(rightpos, rightdigits) {
    let dotsHTML = "";

    for (let i = 0; i < rightpos; i++) {
        dotsHTML += `<span class="dot blue"></span>`;
    }

    for (let i = 0; i < rightdigits; i++) {
        dotsHTML += `<span class="dot white"></span>`;
    }

    return dotsHTML;
}

window.onload = startgame;
