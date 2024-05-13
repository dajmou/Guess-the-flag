let flagsAndCountry = {};
let correctCountry = "";
let rightAnswers = 0;
let lives = 3;

function setUpFlags() {
    fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                let flag = data[i].flags.png;
                let country = data[i].name.common;
                flagsAndCountry[flag] = country;
            }
            console.log(flagsAndCountry);
            getRandomCountry();
        });

    document.getElementById("correctAnswers").innerHTML = "Correct answers: " + rightAnswers;
    document.getElementById("lives").innerHTML = "Lives: " + lives;

}

function getRandomCountry() {
    const flags = Object.keys(flagsAndCountry);
    const randomFlag = flags[Math.floor(Math.random() * flags.length)];
    correctCountry = flagsAndCountry[randomFlag];
    document.getElementById('flag').src = randomFlag;
    generateOptions();
}

function generateOptions() {
    const options = document.querySelectorAll('#options button');
    const correctOptionIndex = Math.floor(Math.random() * options.length);
    options.forEach((option, index) => {
        option.removeEventListener('click', handleCorrectAnswer);
        option.removeEventListener('click', handleWrongAnswer);
        if (index === correctOptionIndex) {
            option.innerText = correctCountry;
            option.addEventListener('click', handleCorrectAnswer);
        } else {
            let wrongCountry = getRandomCountryExcept(correctCountry);
            option.innerText = wrongCountry;
            option.addEventListener('click', handleWrongAnswer);
        }
    });
}

function handleCorrectAnswer() {
    rightAnswers++;
    document.getElementById("correctAnswers").innerHTML = "Correct answers: " + rightAnswers;
    getRandomCountry();
    if (rightAnswers === 100) {
        alert("")
    }
}

function handleWrongAnswer() {
    lives--;
    document.getElementById("lives").innerHTML = "Lives: " + lives;
    if (lives === 0) {
        document.getElementById("menu").style.display = "block";
    } else {
        generateOptions();
    }
}

function getRandomCountryExcept(country) {
    const flags = Object.keys(flagsAndCountry);
    let randomFlag = flags[Math.floor(Math.random() * flags.length)];
    while (flagsAndCountry[randomFlag] === country) {
        randomFlag = flags[Math.floor(Math.random() * flags.length)];
    }
    return flagsAndCountry[randomFlag];
}


function playAgain() {
    rightAnswers = 0;
    lives = 3;
    document.getElementById("correctAnswers").innerHTML = "Correct answers: " + rightAnswers;
    document.getElementById("lives").innerHTML = "Lives: " + lives;
    document.getElementById("menu").style.display = "none";
    setUpFlags();
}

setUpFlags();
