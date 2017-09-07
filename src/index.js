require('./main.scss');

import ball from './assets/ball.png'
import coin from './assets/coin.png'
import obstacle01 from './assets/obstacle01.png'

import 'pixi';
import 'p2';
import * as Phaser from 'phaser';

const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

let player, cursors, coins, obstacles, score, scoreText, winText, loseText;

function preload () {
  game.load.image('ball', ball);
  game.load.spritesheet('coin', coin, 32, 29);
  game.load.image('obstacle01', obstacle01);
}

function create () {
  score = 0;
  game.stage.backgroundColor = "#CCC";
  scoreText = game.add.text(16, 16, 'Collected 0 coins.', { fontSize: '32px', fill: '#000' });
  player = game.add.sprite(400, 200, 'ball');

  obstacles = game.add.group();
  obstacles.enableBody = true;

  for (let o = 1; o<=12; o++) {

    const obstacle = obstacles.create(Math.floor(Math.random()*700)+1,(Math.floor(Math.random()*500)+50),'obstacle01');
    game.physics.arcade.overlap(obstacle, obstacles, ()=>{
      obstacle.kill();
      o--
    }, null, this);
    // coin.body.gravity.y = 300;
    // coin.body.bounce.y = 0.7 + Math.random() * 0.2;
    // coin.body.collideWorldBounds = true;
  }

  coins = game.add.group();
  coins.enableBody = true;

  for (let i = 1; i<=10; i++) {

    const coin = coins.create(Math.floor(Math.random()*700)+1,(Math.floor(Math.random()*500)+1),'coin');
    coin.animations.add('spin');
    coin.animations.play('spin', 30, true)

    game.physics.arcade.overlap(coin, obstacles, ()=>{
      coin.kill();
      i--
    }, null, this);

    // coin.body.gravity.y = 300;
    // coin.body.bounce.y = 0.7 + Math.random() * 0.2;
    // coin.body.collideWorldBounds = true;
  }


  game.physics.arcade.enable(player);

  // player.body.bounce.y = .5;
  player.body.gravity.y = 500;
  player.body.collideWorldBounds = true;

  cursors = game.input.keyboard.createCursorKeys();
}

let pressedDown;
function update () {
  player.body.velocity.x = 0;

  game.physics.arcade.overlap(player, coins, getCoin, null, this);
  game.physics.arcade.overlap(player, obstacles, boundsKills, null, this);

  if (cursors.left.isDown)
  {
    player.body.velocity.x = -150;
  }
  else if (cursors.right.isDown)
  {
    player.body.velocity.x = 150;
  }
  if (cursors.up.isDown && !pressedDown)
  {
    pressedDown = true;
    player.body.velocity.y = -300;
  }
  if (cursors.up.isUp && pressedDown)
  {
    pressedDown = false;
  }

  if (player.body.blocked.down || player.body.blocked.up || player.body.blocked.left || player.body.blocked.right) {
    boundsKills ();
  }
}

function getCoin (player, coin) {
  coin.kill();
  score += 1;
  scoreText.text = `Collected ${score} coins.`;
  if (score === 10) {
    game.add.text(250, 250, 'YOU WIN!', { fontSize: '64px', fill: '#000' });
  }
}

function boundsKills () {
  game.stage.backgroundColor = "#F00";
  game.state.restart();
}

function checkIfOverlap (obstacle) {

}