document.addEventListener('DOMContentLoaded', function () {
    const maca = document.getElementById('maca');
    const scoreValue = document.getElementById('score-value');
    const timeValue = document.getElementById('time-value');
    const message = document.getElementById('message');

    let score = 0;
    let time = 60;

    function updateScore() {
        scoreValue.innerText = score;
    }

    function updateTime() {
        timeValue.innerText = time;
    }

    function dropGift() {
        const gifts = ['🍻', '🍷', '🧉', '💖', '🌿', '🚗'];
        const randomGift = gifts[Math.floor(Math.random() * gifts.length)];

        const gift = document.createElement('div');
        gift.className = 'gift';
        gift.style.left = Math.random() * 350 + 'px';
        gift.innerHTML = randomGift;

        document.getElementById('game-container').appendChild(gift);

        const fallInterval = setInterval(function () {
            const macaRect = maca.getBoundingClientRect();
            const giftRect = gift.getBoundingClientRect();

            if (
                giftRect.bottom > macaRect.top &&
                giftRect.top < macaRect.bottom &&
                giftRect.right > macaRect.left &&
                giftRect.left < macaRect.right
            ) {
                // Gift caught
                score += 10;
                updateScore();
                document.getElementById('game-container').removeChild(gift);
                clearInterval(fallInterval);
            } else if (giftRect.bottom > 600) {
                // Gift missed
                document.getElementById('game-container').removeChild(gift);
                clearInterval(fallInterval);
            }
        }, 10);
    }

    function startGame() {
        setTimeout(() => {
            message.style.display = 'none';
            const gameInterval = setInterval(function () {
                time--;
                updateTime();

                if (time <= 0) {
                    clearInterval(gameInterval);
                    alert('¡Juego terminado! Puntuación final: ' + score);
                } else {
                    dropGift();
                }
            }, 1000);
        }, 5000); // Mostrar el mensaje durante 5 segundos antes de empezar el juego
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft' && parseInt(maca.style.left) > 0) {
            maca.style.left = parseInt(maca.style.left) - 10 + 'px';
        } else if (event.key === 'ArrowRight' && parseInt(maca.style.left) < 350) {
            maca.style.left = parseInt(maca.style.left) + 10 + 'px';
        }
    });

    startGame();
});
