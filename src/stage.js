class Stage {
  constructor (game) {
    this.game = game;
    this.stage = this.createStage();
  }

  createStage () {
    this.game.stage.backgroundColor = "#CCC";
  }
}

export default Stage;