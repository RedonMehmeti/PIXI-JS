let app;
let player;
let keys = {};
let bullets = [];
let challenges = []; // Array to store challenges

let bulletTexture = PIXI.Texture.from("2.png");
let challengeTexture = PIXI.Texture.from("3.png"); // texture per challenge

function shootBullet() {
    let bullet = new PIXI.Sprite(bulletTexture);
    bullet.anchor.set(0.5);
    bullet.scale.set(0.3);
    bullet.x = player.x;
    bullet.y = player.y;
    app.stage.addChild(bullet);
    bullets.push(bullet);
}

//Added

function createChallenge() {
    let challenge = new PIXI.Sprite(challengeTexture);
    challenge.anchor.set(0.5);
    challenge.x = Math.random() * app.view.width; // Random pozicioni ne horizontal
    challenge.y = -50; // Start above the screen
    app.stage.addChild(challenge);
    challenges.push(challenge);
}

function moveChallenges() {
    challenges.forEach(challenge => {
        challenge.y += 3; // Move challenges downward
        if (challenge.y > app.view.height) {
            // Remove challenges that are out of the screen
            app.stage.removeChild(challenge);
            challenges.splice(challenges.indexOf(challenge), 1);
        }
    });
}

function moveBullets() {
bullets.forEach(bullet => {
bullet.y -= 5; // Move bullets upward
if (bullet.y < 0) {
    // Remove bullets that are above the screen
    app.stage.removeChild(bullet);
    bullets.splice(bullets.indexOf(bullet), 1);
}
});
}


window.onload = function() {
    app = new PIXI.Application({
        width: 500,
        height: 500,
        backgroundColor: 0xAAAAAA
    });

    document.body.appendChild(app.view);

    let texture = PIXI.Texture.from("1.png");

    player = new PIXI.Sprite(texture);
    player.anchor.set(0.5);
    player.x = app.view.width / 2;
    player.y = app.view.height / 2;
    app.stage.addChild(player);

    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

    app.ticker.add(gameLoop);
}

function keysDown(e) {
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}

function gameLoop() {
    if (keys["38"]) {
        player.y -= 5;
    }
    if (keys["40"]) {
        player.y += 5;
    }
    if (keys["37"]) {
        player.x -= 5;
    }
    if (keys["39"]) {
        player.x += 5;
    }
    if (keys["65"]) {
        shootBullet();
    }
    moveBullets();

    // Randomly create challenges
    if (Math.random() < 0.01) {
        createChallenge();
    }
    moveChallenges();
}