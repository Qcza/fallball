class Coins {
  constructor (game, obstacles) {
    this.game = game;
    this.coins = this.createCoins(obstacles);
    this.score = 0;
    this.scoreText = this.setDialog();
    this.obstacles = obstacles;
  }

  createCoins (obstacles) {
    let coins = this.game.add.group();
    coins.enableBody = true;
    for (let i = 1; i<=Number(this.game.width/100); i++) {
      const coin = this.addCoin(coins, obstacles);
    }
    return coins;
  }

  addCoin (coins, obstacles) {
    const coin = coins.create(Math.floor(Math.random()*(this.game.width-100))+1,(Math.floor(Math.random()*(this.game.height-100))+1),'coin');
    coin.animations.add('spin');
    coin.animations.play('spin', 30, true);
    this.game.physics.arcade.overlap(coin, obstacles, ()=>{
      coins.remove(coin);
      this.addCoin(coins, obstacles)
    }, null, this);
    return coin;
  }

  getCoin (player, coin) {
    coin.kill();
    this.score += 1;
    this.scoreText.text = `Collected ${this.score} coins.`;
    if (this.score === this.coins.length) {
      this.game.add.text(250, 250, 'YOU WIN!', { fontSize: '64px', fill: '#000' });
    }
    this.addCoin(this.coins, this.obstacles)
  }

  setDialog () {
    return this.game.add.text(16, 16, 'Collected 0 coins.', { fontSize: '32px', fill: '#000' });
  }

  checkPlayerCollision (player) {
    this.game.physics.arcade.overlap(player, this.coins, this.getCoin, null, this);
  }
}

export default Coins;