function PlayerBullets(stage, spriteMaker, gameObjects, asteroidBulletCollision, clientWidth, clientHeight) {

    var self = this;
    self.canFire = true;
    var lastFire = 0;
    var _gameObjects = [];

    var init = function () {
        _gameObjects = gameObjects;
    }

    self.fire = function (x, y, rotation, tick) {

        if (tick > lastFire + 250) {
            lastFire = tick;
            var sprite = makeSprite(x, y, rotation);        
            stage.addChild(sprite);

            var bullet = new PlayerBullet(stage, sprite, onDestroyed, clientWidth, clientHeight);
            gameObjects.push(bullet); 
            asteroidBulletCollision.addBullet(bullet);
        }
    }
 
    var onDestroyed = function (bullet) {
        asteroidBulletCollision.removeBullet(bullet);
    }

    var makeSprite = function (x, y, rotation) {
        var sprite = spriteMaker();
        
        sprite.x = x;
        sprite.y = y;
        sprite.rotation = rotation;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;

        return sprite;
    }

    init();
}

function PlayerBullet(stage, sprite, onDestroyed, clientWidth, clientHeight) {

    var self = this;
    var onDestroyedDelegates = [];

    self.sprite = sprite;
    self.isDelete = false;

    var init = function () {
        onDestroyedDelegates.push(onDestroyed);
    };

    self.update = function () {
        self.sprite.x += 20 * Math.cos(self.sprite.rotation);
        self.sprite.y += 20 * Math.sin(self.sprite.rotation);

        deleteIfOutsideBounds();
    }
    
    self.struck = function (asteroid) {
        deleteme();
    };    

    var deleteme = function () {  
        self.isDelete = true;
        stage.removeChild(self.sprite);

        for (var i = 0; i < onDestroyedDelegates.length; i++)
            onDestroyedDelegates[i](self);       
    }

    var deleteIfOutsideBounds = function () {
        
        if (self.sprite.x <= -50)
            deleteme();

        else if (self.sprite.x >= clientWidth + 50)
            deleteme();

        if (self.sprite.y <= -50)
            deleteme();

        else if (self.sprite.y >= clientHeight + 50)
            deleteme();
    };

    init();
}