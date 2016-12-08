window.onload = () => {
    //  Create your Phaser game and inject it into the gameContainer div.
    //  We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
    const game = new Phaser.Game(320, 416, Phaser.AUTO, 'gameContainer')
    //  Add the States your game has.
    //  You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
    game.state.add('Boot', BasicGame.Boot)
    game.state.add('Preloader', BasicGame.Preloader)
    game.state.add('MainMenu', BasicGame.MainMenu)
    game.state.add('GameOver', BasicGame.GameOver)
    game.state.add('Congratulations', BasicGame.Congratulations)
    game.state.add('Game', BasicGame.Game)

    //  Now start the Boot state.
    game.state.start('Boot')
}