var Game = function() {
    //
}

Game.prototype.displayScoreLevel = function(aScore, aLevel) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // add player score and level
    scoreLevelDiv.innerHTML = 'Score: ' + aScore +
        ' / ' + 'Level: ' + aLevel;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

Game.prototype.update = function() {
    this.displayScoreLevel(score, gameLevel);
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.checkCollision = function() {

    if (player.y + 131 >= this.y + 90 &&
        player.x + 25 <= this.x + 88 &&
        player.y + 73 <= this.y + 135 &&
        player.x + 76 >= this.x + 11) {
        console.log('collided');
        player.x = 202.5;
        player.y = 383;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Enemies' loop to the left side of canvas
    if (this.x >= 505) {
        this.x = 0;
    }

    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // function does not need

    // call the Player's win method here
    // call the Player's stayOnBoard method here
    this.win();
};

// Make the player and display score

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// remove this function
Player.prototype.win = function() {

    // if the player reach the top,he/she will win
    // if the player wins, add 1 to the score and level
    // continue increasing the difficulty

    // add this code as a prototype method, with, for example, the name "win" to the Player class
    if (this.y + 63 <= 0) {
        this.x = 202.5;
        this.y = 383;
        console.log('Nice job!');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score += 1;
        gameLevel += 1;
        console.log('current score: ' + score + ', current level: ' + gameLevel);
        increaseDifficulty(score);

    }

    // player's running area of the canvas

    // add this code as a prototype method, with, for example, the name "stayOnBoard" to the Player class
    if (this.y > 383) {
        this.y = 383;
    }
    if (this.x > 402.5) {
        this.x = 402.5;
    }
    if (this.x < 2.5) {
        this.x = 2.5;
    }
};

Player.prototype.handleInput = function(key) {

    if (key === 'left') {
        this.x -= this.speed;
    }
    if (key === 'up') {
        this.y -= this.speed;
    }
    if (key === 'right') {
        this.x += this.speed;
    }
    if (key === 'down') {
        this.y += this.speed;
    }
    //console.log('KEY is: ' + KEY);
};
// Display score



var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

        allEnemies.push(enemy);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(202.5, 383, 50);
var game = new Game();
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    // console.log(allowedKeys[e.keyCode]);
});
