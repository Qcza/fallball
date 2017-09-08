class Obstacles {
  constructor (game) {
    this.game = game;
    this.obstacles = this.createObstacles();
  }

  createObstacles () {
    let obstacles = this.game.add.group();
    obstacles.enableBody = true;
    for (let o = 1; o<=Number(this.game.width/100); o++) {
      const obstacle = obstacles.create(Math.floor(Math.random()*(this.game.width-100))+1,(Math.floor(Math.random()*(this.game.height-100))+50),'obstacle01');
      this.game.physics.arcade.overlap(obstacle, obstacles, ()=>{
        obstacles.remove(obstacle);
        o--
      }, null, this);
    }
    return obstacles;
  }

  checkPlayerCollision (player) {
    this.game.physics.arcade.overlap(player, this.obstacles, this.obstacleKills, null, this);
  }

  obstacleKills () {
    this.game.stage.backgroundColor = "#F00";
    this.game.state.restart();
  }
}

export default Obstacles;