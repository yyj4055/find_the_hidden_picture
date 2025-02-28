document.getElementById("backBtn").addEventListener("click", function() {
    window.location.href = "index.html"; // 시작 화면으로 이동
    let sound = document.getElementById("clickSound");
        sound.play();
});

let timeLeft = 15;
let foundCount = 0;
let totalHidden = 6;
let timerInterval;
let lives = 3; // 기회 3번

/* 숨은 그림 좌표 */
const positions = {
    1: { left: 52, top: 60 },
    2: { left: 210, top: 135 },
    3: { left: 135, top: 277 },
    4: { left: 435, top: 283 },
    5: { left: 56, top: 360 },
    6: { left: 435, top: 210 }
};

/* 게임 시작 시 타이머 실행 */
function startTimer() {
    console.log("타이머 시작!");
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        console.log("남은 시간:", timeLeft);
        document.getElementById("time-left").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameOver(false);
        }
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function() {
    startTimer();
});

/* 숨은 그림 찾기 */
function foundHidden(event) {
    event.stopPropagation();
    
    let number = event.target.dataset.number;
    if (!positions[number]) return;
    if (event.target.classList.contains("found")) return;
    
    event.target.classList.add("found"); // 찾은 강아지 표시
    
    showGreatMessage();

    let container = document.querySelector(".game-container");

    /* 찾은 위치 아이콘 */
    let icon = document.createElement("span");
    icon.classList.add("material-symbols-outlined", "icon-highlight");
    icon.innerText = "Favorite"; // 하트 아이콘
    icon.style.position = "absolute";
    icon.style.left = `${positions[number].left - 17}px`;
    icon.style.top = `${positions[number].top - 17}px`;
    icon.style.fontSize = "70px";
    icon.style.color = "red";
    icon.style.opacity = "0.8";
    icon.style.transition = "opacity 0.3s ease-in-out"; //

    container.appendChild(icon);

    setTimeout(() => {
        icon.style.opacity = "0";
        setTimeout(() => {
            icon.remove();
        }, 500);
    }, 500);

    /* 찾을 시 카운트 증가 */
    foundCount++;
    document.getElementById("found-count").innerText = foundCount;

    if (foundCount === totalHidden) {
        clearInterval(timerInterval);
        console.log("✅ 모든 강아지를 찾음! gameOver(true) 실행");
        gameOver(true);
    }

    /* 찾을 시 메세지 */
    let sound = document.getElementById("dogSound");
        sound.playbackRate = 2; // 1.2배 빠르게 재생
        sound.play();

    function showGreatMessage() {
        let message = document.getElementById("message");
        message.innerHTML = "🎉Great!";
        message.style.opacity = "1";
        message.style.color = "rgb(50, 207, 255)";
        message.style.transform = "translateX(-50%) scale(1.3)";
    
        setTimeout(() => {
            message.style.opacity = "0";
            message.style.transform = "translateX(-50%) scale(0)";
        }, 700);
    }
}

/* 틀린 클릭 시 하트 감소 */
function wrongClick(event) {
    let gameContainer = document.querySelector(".game-container");
    let rect = gameContainer.getBoundingClientRect();
    let clickX = event.clientX - rect.left;
    let clickY = event.clientY - rect.top;

    if (event.target.id === "backBtn") return; // backBtn 예외 처리

    let isCorrect = false;

    Object.values(positions).forEach(pos => {
        if (
            clickX >= pos.left &&
            clickX <= pos.left + 30 &&
            clickY >= pos.top &&
            clickY <= pos.top + 30
        ) {
            isCorrect = true;
        }
    });    

        if (!isCorrect) {
            if (lives > 0) {
                lives--;
                let hearts = "❤️".repeat(lives);
                document.getElementById("heart-container").innerText = hearts;
        
                showWrongMessage();
            }

            if (lives === 0) {
                console.log("❌ 하트 모두 소진! gameOver(false) 실행");
                clearInterval(timerInterval);
                gameOver(false);
            } 

        /* 틀릴 시 메세지 */
        let sound = document.getElementById("wrongSound");
            sound.playbackRate = 1.5;
            sound.play();

        function showWrongMessage() {
            let message = document.getElementById("wrong-message");
            message.innerHTML = "💔Wrong";
            message.style.opacity = "1";
            message.style.color = "rgb(250, 65, 65)";
            message.style.transform = "translateX(-50%) scale(1.3)";
        
            setTimeout(() => {
                message.style.opacity = "0";
                message.style.transform = "translateX(-50%) scale(0)";
            }, 700);
        }
    }
}

/* 클릭 이벤트 */
document.querySelectorAll("area").forEach(area => {
    area.addEventListener("click", foundHidden);
});
document.addEventListener("click", wrongClick);

/* 게임 종료(성공 or 실패) */
function gameOver(isSuccess) {
    console.log("게임 종료!", isSuccess ? "성공" : "실패");

    document.getElementById("game-screen").style.display = "none";
    document.querySelector("p").style.display = "none";
    document.getElementById("lives").style.display = "none";
    document.getElementById("backBtn").style.display = "none";

    if (isSuccess) {
        document.getElementById("success-screen").style.display = "block";
        setTimeout(() => {
            let sound = document.getElementById("successSound");
            sound.play();
        }, 1000);
    } else {
        document.getElementById("fail-screen").style.display = "block";
        setTimeout(() =>{
            let sound = document.getElementById   ("failSound");
            sound.play();
        }, 1000);
    }
}

/* 성공 > 인트로 */
document.getElementById("toIntroBtn").addEventListener("click", function() {
    window.location.href = "index.html";
    let sound = document.getElementById("clickSound");
        sound.play();
});

/* 실패 > 재시작 */
document.getElementById("retryBtn").addEventListener("click", function() {
    document.getElementById("lives").style.display = "block";
    document.querySelector("p").style.display = "block";
    window.location.href = "game.html";
    let sound = document.getElementById("clickSound");
        sound.play();
});

let clickSound = document.getElementById("clickSound");
clickSound.volume = 0.3; // 30% 볼륨으로 설정

let dogSound = document.getElementById("dogSound");
dogSound.volume = 0.4; // 60% 볼륨으로 설정

let wrongSound = document.getElementById("wrongSound");
wrongSound.volume = 0.3; // 50% 볼륨으로 설정

let successSound = document.getElementById("successSound");
successSound.volume = 0.4; // 성공 효과음 70% 볼륨

let failSound = document.getElementById("failSound");
failSound.volume = 0.2;

/* 버튼 클릭 시 효과음 + 페이지 이동 */
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function () {
        let sound = document.getElementById("clickSound");
        
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(error => console.warn("사운드 재생 오류:", error));
        }
    });
});

/* 타이머 시작 */
startTimer();