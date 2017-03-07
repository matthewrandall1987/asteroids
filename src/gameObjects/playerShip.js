

function PlayerShipFactory(asteroidBulletCollisions) {

    var self = this;

    var init = function () {};

    self.start = function (sprites, renderer, stage, keyboard, gameObjects) {

        var y = (renderer.view.clientHeight / 2);
        var x = (renderer.view.clientWidth / 2);

        var sprite = sprites.ship();

        stage.addChild(sprite);
        
        var bullets = new PlayerBullets(stage, sprites.bullet, gameObjects, asteroidBulletCollisions, renderer.view.clientWidth, renderer.view.clientHeight);
        var ship = new PlayerShip(sprite, { x: x, y: y }, keyboard, bullets, renderer.view.clientWidth, renderer.view.clientHeight);        
        
        gameObjects.push(ship);

        return ship;
    };
    
    init();
};

function PlayerShip(sprite, position, keyboard, bullets, clientWidth, clientHeight) {

    var self = this;
    var lastSpeedTick = 0;

    self.sprite = sprite;
    self.speed = 0;
    self.rotationSpeed = 4.71239;

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
            updateUpKey(tick);
        else if (keyboard.isDown())
            updateBackKey(tick);
        else
            updateNoKey(tick);

        if (keyboard.isSpace()) 
        {
            bullets.fire(
                self.sprite.x,
                self.sprite.y,
                self.sprite.rotation,
                tick
            );
        }

        self.sprite.x += self.speed * Math.cos(self.rotationSpeed);
        self.sprite.y += self.speed * Math.sin(self.rotationSpeed);

        if (tick - lastSpeedTick > 100)
            lastSpeedTick = tick;
            
        repositionIfOutsideBounds();
    }

    var updateUpKey = function (tick) {

        if (tick - lastSpeedTick > 100 && self.speed < 7) {
            self.speed++;
            
            if (self.speed > 7)
                self.speed = 7;
        }

        if (self.sprite.rotation > self.rotationSpeed) 
            self.rotationSpeed += 0.05;
        else if (self.sprite.rotation < self.rotationSpeed)
            self.rotationSpeed -= 0.05;
    }

    var updateNoKey = function (tick) {

        if (tick - lastSpeedTick > 100 && self.speed > 0) {
            self.speed -= 0.5;
        }
            
        if (self.sprite.rotation > self.rotationSpeed) 
            self.rotationSpeed += 0.05;
        else if (self.sprite.rotation < self.rotationSpeed)
            self.rotationSpeed -= 0.05;
    }

    var updateBackKey = function (tick) {

        if (tick - lastSpeedTick > 100 && self.speed > 0) {
            self.speed -= 1.5;

            if (self.speed < 0)
                self.speed = 0;
        }
            
        if (self.sprite.rotation > self.rotationSpeed) 
            self.rotationSpeed += 0.05;
        else if (self.sprite.rotation < self.rotationSpeed)
            self.rotationSpeed -= 0.05;
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