import GameState from './GameState';

window.onload = () => { 
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', this);
    var gameState = new GameState(game);
    game.state.add('GameState', gameState);
    game.state.start('GameState');
}
