class Coins {
  constructor (game) {
    this.game = game;
    this.coins = this.createCoins();
    this.score = 0;
    this.scoreText = this.setDialog();
  }

  createCoins (obstacles) {
    let coins = this.game.add.group();
    coins.enableBody = true;
    for (let i = 1; i<=10; i++) {

      const coin = coins.create(Math.floor(Math.random()*700)+1,(Math.floor(Math.random()*500)+1),'coin');
      coin.animations.add('spin');
      coin.animations.play('spin', 30, true);

      this.game.physics.arcade.overlap(coin, obstacles, ()=>{
        coins.remove(coin);
        i--
      }, null, this);
    }
    return coins;
  }

  getCoin (player, coin) {
    coin.kill();
    this.score += 1;
    this.scoreText.text = `Collected ${this.score} coins.`;
    if (this.score === this.coins.length) {
      this.game.add.text(250, 250, 'YOU WIN!', { fontSize: '64px', fill: '#000' });
    }
  }

  setDialog () {
    return this.game.add.text(16, 16, 'Collected 0 coins.', { fontSize: '32px', fill: '#000' });
  }

  checkPlayerCollision (player) {
    this.game.physics.arcade.overlap(player, this.coins, this.getCoin, null, this);
  }
}

export default Coins;