const PASSWORD = "05042025";
let currentRoomIndex = 1;
const totalRooms = 3; // Updating as we build

// DOM Elements
const rooms = document.querySelectorAll('.room');
const passwordInput = document.getElementById('password');
const enterBtn = document.getElementById('enter-btn');
const loginMessage = document.getElementById('login-message');
const quizFeedback = document.getElementById('quiz-feedback');

// Init
document.addEventListener('DOMContentLoaded', () => {
    // Background music initialization could go here if requested
});

// Navigation Logic
function nextRoom() {
    const currentRoom = document.querySelector(`.room[data-room="${currentRoomIndex}"]`);

    // Zoom out/Fade out effect (Doorway)
    currentRoom.classList.add('exit');
    currentRoom.classList.remove('active');

    currentRoomIndex++;

    // Check if next room exists
    const nextRoomEl = document.querySelector(`.room[data-room="${currentRoomIndex}"]`);
    if (nextRoomEl) {
        setTimeout(() => {
            nextRoomEl.classList.add('active');
        }, 300); // Slight delay for the exit animation to process
    } else {
        console.log("End of current build");
    }
}

// Room 1: Password Logic
enterBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
});

function checkPassword() {
    const val = passwordInput.value.trim();
    if (val === PASSWORD) {
        loginMessage.textContent = "Access Granted. Welcome home, love.";
        loginMessage.className = "message-area success";
        setTimeout(() => {
            nextRoom();
            // Start playing music here if added
        }, 1500);
    } else {
        loginMessage.textContent = "Oye? Date bhool gayi? Try again baby!";
        loginMessage.className = "message-area error";
        passwordInput.classList.add('shake');
        setTimeout(() => passwordInput.classList.remove('shake'), 500);
    }
}

// Room 3: Quiz Logic
let currentQuestion = 1;

function checkAnswer(btn, isCorrect, msg) {
    quizFeedback.textContent = msg;

    if (isCorrect) {
        quizFeedback.style.color = "#51cf66"; // Green

        // Show fireworks or happy animation via CSS class trigger?
        // For now, proceed to next question
        setTimeout(() => {
            const currentCard = document.getElementById(`q${currentQuestion}`);
            currentCard.classList.remove('active');
            currentCard.classList.add('passed'); // Fly away

            currentQuestion++;
            const nextCard = document.getElementById(`q${currentQuestion}`);

            quizFeedback.textContent = "";

            if (nextCard) {
                setTimeout(() => nextCard.classList.add('active'), 200);
            } else {
                // Quiz finished, go to next Room
                setTimeout(() => {
                    nextRoom(); // To Room 4
                }, 1000);
            }
        }, 1500);

    } else {
        quizFeedback.style.color = "#ff6b6b"; // Red
        btn.classList.add('shake');
        setTimeout(() => btn.classList.remove('shake'), 500);
    }
}

// Room 4: Favorites Logic
function toggleFav(card) {
    card.classList.toggle('expanded');
}

// Room 6: Typewriter Logic
const letterContent = `Meri Jaan,

5 April 2025. Shayad calendar ke liye ye ek normal date ho, par mere liye ye wo din hai jab meri asli life shuru hui.

Pata hai, log puchte hain main itna motivated kaise rehta hoon? Unhe nahi pata ki mera secret source tum ho. Pichle 10 mahino mein, tumne mujhe tutne se bachaya hai, mujhe khud pe vishwas karna sikhaya hai.

Main promise karta hoon, chahe life mein kitne bhi bugs aayein, kitne bhi system failures hon, main hamesha tumhare saath khada rahunga. Jaise tum meri mental peace ho, main tumhari shield banunga.

I love you, aaj, kal, aur hamesha.

Yours,
Pratyush`;

function startTypewriter() {
    const el = document.getElementById('typewriter-text');
    const btn = document.getElementById('finish-letter-btn');
    el.textContent = "";

    let i = 0;
    const speed = 50; // ms per char

    function type() {
        if (i < letterContent.length) {
            el.textContent += letterContent.charAt(i);
            i++;
            // Scroll to bottom if needed
            // el.scrollTop = el.scrollHeight; 
            setTimeout(type, speed);
        } else {
            // Finished
            setTimeout(() => {
                btn.style.opacity = 1;
            }, 1000);
        }
    }
    type();
}

// Hook into nextRoom to trigger Typewriter when Room 6 becomes active
const originalNextRoom = nextRoom;
nextRoom = function () {
    originalNextRoom();

    // Check if we are entering Room 6 (index 6, effectively)
    // Note: currentRoomIndex was incremented inside originalNextRoom
    // But originalNextRoom logic is "currentRoomIndex++", so it's ALREADY 6.

    if (currentRoomIndex === 6) {
        setTimeout(startTypewriter, 1000); // Start after transition
    }
};

// Room 7: Future Logic
function revealFuture(el, text) {
    el.classList.add('revealed');
    el.querySelector('.future-text').textContent = text;
}

// Room 8: Patch Notes Logic
function forgiveBugs(btn) {
    btn.innerHTML = "Saved! <i class='fa-solid fa-check'></i>";
    btn.style.background = "#51cf66";

    // Trigger Hug Rain
    for (let i = 0; i < 50; i++) {
        createEmoji();
    }

    setTimeout(() => {
        nextRoom();
    }, 3000);
}

function createEmoji() {
    const emoji = document.createElement('div');
    emoji.textContent = "🤗";
    emoji.style.position = "fixed";
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.top = "-50px";
    emoji.style.fontSize = Math.random() * 20 + 20 + "px";
    emoji.style.transition = "top 3s ease-in, opacity 3s";
    emoji.style.zIndex = "100";

    document.body.appendChild(emoji);

    setTimeout(() => {
        emoji.style.top = "110vh";
        emoji.style.opacity = "0";
    }, 100);

    setTimeout(() => {
        emoji.remove();
    }, 3000);
}

/* Room 10: Promise Bridge Logic */
const scanner = document.getElementById('fingerprint-btn');
const circle = document.querySelector('.progress-ring__circle');
const totalLength = 326; // Circumference
let holdTimer;

if (scanner && circle) {
    scanner.addEventListener('mousedown', startHold);
    scanner.addEventListener('touchstart', startHold);

    scanner.addEventListener('mouseup', endHold);
    scanner.addEventListener('mouseleave', endHold);
    scanner.addEventListener('touchend', endHold);
}

function startHold(e) {
    e.preventDefault();
    circle.style.strokeDashoffset = 0; // Animate to full

    holdTimer = setTimeout(() => {
        // Success
        scanner.classList.add('sealed');
        scanner.innerHTML = "<i class='fa-solid fa-check'></i>";

        setTimeout(() => {
            nextRoom();
        }, 1000);
    }, 2000); // 2 seconds hold
}

function endHold() {
    clearTimeout(holdTimer);
    if (!scanner.classList.contains('sealed')) {
        circle.style.strokeDashoffset = totalLength; // Reset
    }
}

/* Utils */
// Simple Shake Animation injector
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
}
.shake { animation: shake 0.3s; }
`;
document.head.appendChild(styleSheet);
