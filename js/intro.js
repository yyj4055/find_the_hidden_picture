document.getElementById("startBtn").addEventListener("click", function() {
    let sound = document.getElementById("clickSound");
    sound.currentTime = 0;
    sound.play();

    setTimeout(() => {
        window.location.href = "game.html";
    }, 300);
});