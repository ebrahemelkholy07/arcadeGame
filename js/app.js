'use strict';
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    }
    
    if (player.x < this.x + 50 && player.x + 50 > this.x
        && player.y < this.y + 50 && player.y + 50 > this.y) {
        player.x = 202;
        player.y = 405; 
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}
Player.prototype.update = function() {
    // to prevent player of moving down out canvas 
    if (this.y > 385) {
        this.y = 385;
    }
    // to prevent player of moving right out canvas 
    if (this.x > 400) {
        this.x = 400;
    }
    // to prevent player of moving left out canvas 
    if (this.x < 0) {
        this.x = 0;
    }
    // Check if player win and reach water , reset player position
    if (this.y < 0) {
        this.x = 205;
        this.y = 385;            
    }
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(userInput) {
    if(userInput == 'left' && this.x > 0) {
        this.x -= 101;
    } else if(userInput == 'right' && this.x < 400) {
        this.x += 101;
    } else if(userInput == 'up' && this.y > 0) {
        this.y -= 85;
    } else if(userInput == 'down' && this.y < 400) {
        this.y += 85;
    }
    if (this.y < 65) {
        this. y = 405;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemyLocation = [60, 145, 225]
enemyLocation.forEach((Y) => {
    var enemy = new Enemy(0, Y, 200);
    allEnemies.push(enemy);
})
var player = new Player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
