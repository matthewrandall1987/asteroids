function PlayerBullets(stage, spriteMaker, gameObjects, asteroidBulletCollision) {

    var self = this;
    self.canFire = true;
    var lastFire = 0;

    self.fire = function (x, y, rotation, tick) {

        if (tick > lastFire + 250) {
            lastFire = tick;
            var sprite = makeSprite(x, y, rotation);        
            stage.addChild(sprite);

            var bullet = new PlayerBullet(stage, sprite, onDestroyed);
            asteroidBulletCollision.addBullet(bullet);

            gameObjects.push(bullet); 
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
        
        if (self.sprite.x <= 0)
            deleteme();

        else if (self.sprite.x >= clientWidth)
            deleteme();

        if (self.sprite.y <= 0)
            deleteme();

        else if (self.sprite.y >= clientHeight)
            deleteme();
    };
}