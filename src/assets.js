import ball from './assets/ball.png'
import coin from './assets/coin.png'
import obstacle01 from './assets/obstacle01.png'

class AssetsLoader {
  constructor (game) {
    this.game = game;
  }

  playerLoader () {
    this.game.load.image('ball', ball);
  }

  coinLoader () {
    this.game.load.spritesheet('coin', coin, 32, 29);
  }

  obstacleLoader () {
    this.game.load.image('obstacle01', obstacle01);
  }

  loadEmAll () {
    this.playerLoader();
    this.coinLoader();
    this.obstacleLoader();
  }
}

export default AssetsLoader;