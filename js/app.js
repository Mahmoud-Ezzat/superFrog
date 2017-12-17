var canvasBorderTop = -11,
  canvasBorderLeft = 0,
  canvasBorderRight = 404,
  canvasBorderBottom = 404;
var playerStarting = {
  x: 202,
  y: 404
}
var directionX = 101,
  directionY = 83,
  sec = 0,
  firstClick = false,
  enemyWithCollide = 70;
// Enemies our player must avoid
class Enemy {
  constructor(enemyVerticalPosition, enemySpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.y = enemyVerticalPosition;
    this.x = 0;
    this.enemySpeed = enemySpeed;

  }
  //  multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // collide detect
  update(dt) {
    if (this.x > canvasBorderRight) {
      this.x = canvasBorderLeft;
    } else {
      this.x += this.enemySpeed * dt;
      if (this.y === player.currenPositionVertical()) {
        if (Math.abs(this.x - player.currenPositionHorizontal()) < enemyWithCollide) {
          player.returnToFirst();
        }
      }

    }
  }
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  }
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/*Player class for detecting all his movements*/
class Player {
  constructor() {
    this.userInput = null;
    this.playerCurrentCoordinates = playerStarting;
    this.sprite = 'images/char-horn-girl.png';
  }
  currenPositionHorizontal() {
    return this.playerCurrentCoordinates.x;
  }
  currenPositionVertical() {
    return this.playerCurrentCoordinates.y;
  }
  returnToFirst() {
    this.playerCurrentCoordinates.x = 202;
    this.playerCurrentCoordinates.y = 404;
    this.render();
  }

  update() {
    if (this.playerCurrentCoordinates.y == -11) {
      $('#gameWin-pop-up').modal('show');
    }
    if (this.userInput == null) {
      return
    } else if (this.userInput == 'up') {
      if (this.playerCurrentCoordinates.y !== canvasBorderTop) {
        this.playerCurrentCoordinates.y -= directionY;
      }
    } else if (this.userInput == 'down') {
      if (this.playerCurrentCoordinates.y !== canvasBorderBottom) {
        this.playerCurrentCoordinates.y += directionY;

      }
    } else if (this.userInput == 'right') {
      if (this.playerCurrentCoordinates.x !== canvasBorderRight) {
        this.playerCurrentCoordinates.x += directionX;
      }
    } else if (this.userInput == 'left') {
      if (this.playerCurrentCoordinates.x !== canvasBorderLeft) {
        this.playerCurrentCoordinates.x -= directionX;
      }
    }
    this.userInput = null;
  }
  render() {

    ctx.drawImage(Resources.get(this.sprite), this.playerCurrentCoordinates.x, this.playerCurrentCoordinates.y);
  }
  handleInput(allowedKeys) {

    this.userInput = allowedKeys;

  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [new Enemy(404 - 83 * 1, 150), new Enemy(404 - 83 * 2, 250), new Enemy(404 - 83 * 3, 200), new Enemy(404 - 83 * 4, 300)];
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var checkGameEnd = $('body').hasClass('modal-open');
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  if (!checkGameEnd) {
    player.handleInput(allowedKeys[e.keyCode]);

  } else {
    return;
  }
});




$('.restart').click(function () {
  player.returnToFirst();
  $('#gameWin-pop-up').modal('hide');
})