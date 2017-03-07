
function AsteroidCollisions(gameObjects) {
    
    var self = this;    
    var asteroids = [];
    var collisionDetection = {};

    var init = function () {
        collisionDetection = new CollisionDetection();
        gameObjects.push(self);
    }

    self.add = function (asteroid) {
        asteroids.push(asteroid);
    }

    self.remove = function (asteroid) {
        var index = asteroids.indexOf(asteroid);

        if (index > -1) {
            asteroids.splice(index, 1);
        }
    }
    
    self.update = function () {
        for (var i = 0; i < asteroids.length; i++)
            for (var j = (i + 1); j < asteroids.length; j++)
                if (collisionDetection.isCollided(asteroids[i].sprite, asteroids[j].sprite))
                {
                    var iobj = makeEventObject(asteroids[i]);
                    var jobj = makeEventObject(asteroids[j]);

                    asteroids[i].bounce(jobj);
                    asteroids[j].bounce(iobj);
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