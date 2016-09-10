import GameState from './GameState';

window.onload = () => { 
    let game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', this);
    let gameState = new GameState();
    game.state.add('GameState', gameState);
    game.state.start('GameState');
}
