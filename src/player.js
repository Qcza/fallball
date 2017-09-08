import Obstacles from './obstacles';

class Player {
  constructor (game) {
    this.game = game;
    this.player = this.createPlayer('ball');
    this.pressedDown = false;
  }

  createPlayer (sprite) {
    let player = this.game.add.sprite((this.game.width/2)-16, (this.game.height/2)-16, sprite);
    this.game.physics.arcade.enable(player);
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;
    return player;
  }

  playerMovement () {
    const cursors = this.game.input.keyboard.createCursorKeys();
    this.player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
      this.player.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
      this.player.body.velocity.x = 150;
    }
    if (cursors.up.isDown && !this.pressedDown)
    {
      this.pressedDown = true;
      this.player.body.velocity.y = -300;
    }
    if (cursors.up.isUp && this.pressedDown)
    {
      this.pressedDown = false;
    }

    if (this.player.body.blocked.down || this.player.body.blocked.up || this.player.body.blocked.left || this.player.body.blocked.right) {
      this.game.stage.backgroundColor = "#F00";
      this.game.state.restart();
    }
  }

}

export default Player;