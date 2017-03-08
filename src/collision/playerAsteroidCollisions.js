
function PlayerAsteroidCollisions(gameObjects) {
    
    var self = this;    
    var asteroids = [];
    var _player = null;
    var collisionDetection = {};

    var init = function () {
        collisionDetection = new CollisionDetection();
        gameObjects.push(self);
    }

    self.addAsteroid = function (asteroid) {
        asteroids.push(asteroid);
    };

    self.removeAsteroid = function (asteroid) {
        var index = asteroids.indexOf(asteroid);
        asteroids.splice(index, 1);
    }

    self.setPlayer = function (player) {
        _player = player;
    }

    self.clearAsteroids = function (){
        asteroids = [];
    };
    
    self.update = function () {
            for (var i = 0; i < asteroids.length; i++) {

                if (_player == undefined || asteroids[i] == undefined)
                    continue;

                if (window.die || collisionDetection.isCollided(_player.sprite, asteroids[i].sprite))
                {
                    var jobj = makeEventObject(asteroids[i]);
                    _player.struck(jobj);         
                }
            }
    }

    var makeEventObject = function (gameObj) {
        return {
            x: gameObj.sprite.x,
            y: gameObj.sprite.y,
            speed: gameObj.speed,
            direction: gameObj.direction
        };
    }

    init();
}