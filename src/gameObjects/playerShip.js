

var PlayerShipFactory = (function () {

    this.make = function (sprites, renderer, stage, keyboard, gameObjects, asteroidBulletCollisions) {

        var y = (renderer.view.clientHeight / 2);
        var x = (renderer.view.clientWidth / 2);

        var sprite = sprites.ship();

        stage.addChild(sprite);
        
        var bullets = new PlayerBullets(stage, sprites.bullet, gameObjects, asteroidBulletCollisions);
        var ship = new PlayerShip(sprite, { x: x, y: y }, keyboard, bullets, renderer.view.clientWidth, renderer.view.clientHeight);        
        
        gameObjects.push(ship);

        return ship;
    }

    return this;
})();

function PlayerShip(sprite, position, keyboard, bullets, clientWidth, clientHeight) {

    var self = this;
    self.sprite = sprite;

    var init = function () {
        self.sprite.anchor.x = 0.5;
        self.sprite.anchor.y = 0.5;

        self.sprite.rotation = 4.71239;

        self.sprite.x = position.x;
        self.sprite.y = position.y;
    }

    self.update = function (tick) {

        if (keyboard.isLeft()) 
            self.sprite.rotation -= 0.1;
            
        if (keyboard.isRight()) 
            self.sprite.rotation += 0.1;
        
        if (keyboard.isUp()) 
            updateUpKey();

        if (keyboard.isSpace()) 
        {
            bullets.fire(
                self.sprite.x,
                self.sprite.y,
                self.sprite.rotation,
                tick
            );
        }

        repositionIfOutsideBounds();
    }

    var updateUpKey = function () {
        self.sprite.x += 5 * Math.cos(self.sprite.rotation);
        self.sprite.y += 5 * Math.sin(self.sprite.rotation);
    }
    
    var repositionIfOutsideBounds = function () {
        
        if (self.sprite.x <= 0)
            self.sprite.x = clientWidth;

        else if (self.sprite.x >= clientWidth)
            self.sprite.x = 0;

        if (self.sprite.y <= 0)
            self.sprite.y = clientHeight;

        else if (self.sprite.y >= clientHeight)
            self.sprite.y = 0;
    };

    init();
}