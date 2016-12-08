Entropy.Entity({
    name: 'Counter',

    create(game) {
        const frames = [
            new Entropy.Frame(PIXI.utils.TextureCache['num_3.png']),
            new Entropy.Frame(PIXI.utils.TextureCache['num_2.png']),
            new Entropy.Frame(PIXI.utils.TextureCache['num_1.png'])
        ]

        const animation = new Entropy.Animation(frames, 1, false)

       // animation.reverse()

        const animationSprite = animation.getAnimationSprite()

        animationSprite.position.x = 0
        animationSprite.position.y = 0
        animationSprite.anchor.x = 0.5
        animationSprite.anchor.y = 0.5
        animationSprite.scale.y = -1 / Entropy.ZOOM
        animationSprite.scale.x = 1 / Entropy.ZOOM

        game.stage.addChild(animationSprite)

        animation.on('start', () => game.sounds.countdownBlip.play())

        animation.on('frameChange', () => game.sounds.countdownBlip.play())

        this.add('Animation', animation)
    },

    remove(game) {
        const animationSprite = this.components.animation.animation.getAnimationSprite()

        game.stage.removeChild(animationSprite)
    }
})