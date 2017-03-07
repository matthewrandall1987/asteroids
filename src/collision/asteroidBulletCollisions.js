
function AsteroidBulletCollisions(gameObjects) {
    
    var self = this;    
    var asteroids = [];
    var bullets = [];
    var collisionDetection = {};

    var init = function () {
        collisionDetection = new CollisionDetection();
        gameObjects.push(self);
    }

    self.addAsteroid = function (asteroid) {
        asteroids.push(asteroid);
    };

    self.addBullet = function (bullet) {
        bullets.push(bullet);
    }

    self.removeAsteroid = function (asteroid) {
        var index = asteroids.indexOf(asteroid);

        if (index > -1) {
            asteroids.splice(index, 1);
        }
    }

    self.removeBullet = function (bullet) {
        var index = bullets.indexOf(bullet);

        if (index > -1) {
            bullets.splice(index, 1);
        }
    }
    
    self.update = function () {
        for (var i = 0; i < bullets.length; i++)
            for (var j = 0; j < asteroids.length; j++)
                if (collisionDetection.isCollided(bullets[i].sprite, asteroids[j].sprite))
                {
                    var iobj = makeEventObject(bullets[i]);
                    var jobj = makeEventObject(asteroids[j]);

                    bullets[i].struck(jobj);
                    asteroids[j].struck(iobj);
                }
    }

    var makeEventObject = function (asteroid) {
        return {
            x: asteroid.sprite.x,
            y: asteroid.sprite.y,
            speed: asteroid.speed,
            direction: asteroid.direction
        };
    }

    init();
}