/**
 * CSS styles
 */
require('./main.scss');

/**
 * Dependencies
 */
import 'pixi';
import 'p2';
import * as Phaser from 'phaser';

/**
 * Classes
 */
import Player from './player';
import AssetsLoader from './assets';
import Stage from './stage';
import Obstacles from './obstacles';
import Coins from './coins'

const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

let player, obstacles, coins, stage, score;

function preload () {
  const assets = new AssetsLoader(game);
  assets.loadEmAll();
}

function create () {
  stage = new Stage(game);
  player = new Player(game);
  obstacles = new Obstacles(game);
  coins = new Coins(game);
}

function update () {
  coins.checkPlayerCollision(player.player);
  obstacles.checkPlayerCollision(player.player);
  player.playerMovement();
}