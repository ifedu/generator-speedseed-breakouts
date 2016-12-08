{
    let spritesCreated = false

    function createSprites() {
        if (!spritesCreated) {
            spritesCreated = true

            Crafty.sprite(breakout.TILE_SIZE, 'assets/tiles.png', {
                ball: [3, 4, 1, 1]
            })
        }
    }

    Crafty.c('Ball', {
        _checkWallCollision() {
            // hit a vertical wall?
            if (this.hit('v')) {
                this.x = this.prevX
                this.vel.x *= - 1

                return
            }

            // or the top horizontal wall?
            if (this.hit('h')) {
                this.y = this.prevY
                this.vel.y *= - 1

                return
            }
        },

        _checkPaddleCollision() {
            if (this.vel.y > 0) {
                const hit = this.hit('Paddle')[0]

                if (hit) {
                    this.vel.x = this._determineBounceVelocity(hit.obj)
                    this.vel.y *= - 1
                }
            }
        },

        _determineBounceVelocity(paddle) {
            const distance = Crafty.math.distance(paddle.centerX, paddle.centerY, this.centerX, this.centerY)

            const magnitude = distance - this.h / 2 - paddle.h / 2

            let ratio = magnitude / (paddle.w / 2) * 2.5

            if (this.centerX < paddle.centerX) ratio = -ratio

            return this.speed * ratio
        },

        _checkBrickCollision() {
            const hit = this.hit('Brick')[0]

            if (!hit) return

            const brick = hit.obj
            brick.onDeath()

            let dx = brick.x - this.x
            if (this.centerX < brick.centerX) {
                dx -= this.w
            } else {
                dx += brick.w
            }

            let dy = brick.y - this.y
            if (this.centerY < brick.centerY) {
                dy -= this.h
            } else {
                dy += brick.h
            }

            if (Math.abs(dx) < Math.abs(dy)) {
                this.x = this.prevX
                this.vel.x *= -1
            } else {
                this.y = this.prevY
                this.vel.y *= -1
            }
        },

        _enterFrame() {
            if (!this.active) return

            this.prevX = this.x
            this.prevY = this.y

            this.x += this.vel.x
            this.y += this.vel.y

            // did the ball get past the paddle?
            if (this.y > Crafty.stage.elem.clientHeight) {
                this.destroy()

                Crafty.trigger('BallDeath')

                return
            }

            this._checkWallCollision()
            this._checkBrickCollision()
            this._checkPaddleCollision()
        },

        init() {
            createSprites()

            this.requires('SpriteAnimation, ball, Collision, Edges')
        },

        ball(active) {
            this.speed = 170 / 60

            return this.attr({
                active: active,
                vel: {
                    x: this.speed,
                    y: this.speed
                }
            })
            .reel('spin', 400, 3, 4, 5)
            .animate('spin', -1)
            .bind('EnterFrame', this._enterFrame)
        }
    })
}