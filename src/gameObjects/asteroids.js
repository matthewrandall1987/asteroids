
function AsteroidFactory(asteroidCollision, asteroidBulletCollision) {

    var self = this;

    var _clientHeight;
    var _clientWidth;

    var _maxspeed = 4;
    var _minspeed = 3;

    var _stage;
    var _gameObjects;
    var _make_large;

    var asteroidsToMake = [];

    self.start = function (sprites, renderer, stage, gameObjects) {    

        _clientHeight = renderer.view.clientHeight;
        _clientWidth = renderer.view.clientWidth;
        
        _make_large = sprites.large_asteroids;
                
        _stage = stage;
        _gameObjects = gameObjects;
        _gameObjects.push(self);
          
        for (var i = 0; i < 3; i ++) {
            asteroidsToMake.push({ type: "large", position: nextRandomAsteroid() });
        }
    };

    self.update = function () {  

        for (var i = 0; i < asteroidsToMake.length; i++) {
            makeAsteroid(asteroidsToMake[i].type, asteroidsToMake[i].position);
        }

        asteroidsToMake = [];
    };

    var makeAsteroid = function (type, position) {       

            var asteroid = new Asteroid(
                _make_large(),
                position,
                _clientWidth, 
                _clientHeight, 
                _stage,
                type);

            asteroid.addOnDestroyed(onDestroyed);
            asteroidCollision.add(asteroid);
            asteroidBulletCollision.addAsteroid(asteroid);

            _gameObjects.push(asteroid);
    }

    self.stop = function () {

    };
    

    var nextAsteroid = function (asteroid, type, i) {
        var speed = Math.floor(Math.random() * (_maxspeed - _minspeed + 1) + _minspeed);
        
        var width = type == "medium" ? asteroid.sprite.width / 2 : asteroid.sprite.width / 4;
        var height = type == "medium" ? asteroid.sprite.height / 2 : asteroid.sprite.height / 4;

        var randomRotation = Math.random() * (0.349066 + 1);

        var direction = 6.28319 + randomRotation;
        if (i == 1) 
            direction = 1.5708 + randomRotation;
        else if (i == 2) 
            direction = 3.14159 + randomRotation;
        else if ( i == 3)
            direction = 4.71239 + randomRotation;

        return {
            y : asteroid.sprite.y + (height * Math.sin(direction)),
            x : asteroid.sprite.x + (width * Math.cos(direction)),
            rotation : direction,
            speed : speed
        }
    }

    var nextRandomAsteroid = function () {

        var useX = Math.random() >= 0.5;

        var x = Math.floor(Math.random() * (_clientWidth + 1));
        var y = Math.floor(Math.random() * (_clientHeight + 1));

        return {
            y : useX ? x : 0,
            x : useX ? 0 : y,
            rotation : (Math.random() * 6.28319).toPrecision(5),
            speed : Math.floor(Math.random() * (_maxspeed - _minspeed + 1) + _minspeed),   
        }
    }

    var onDestroyed = function (asteroid) {
        asteroidCollision.remove(asteroid);         
        asteroidBulletCollision.removeAsteroid(asteroid);
 
        var type = asteroid.type == "large" ? "medium" : "small";

        switch (asteroid.type)
        {
            case "large":
            case "medium":
                for (var i = 0; i < 4; i++) {
                    asteroidsToMake.push({ type: type, position: nextAsteroid(asteroid, type, i) });
                }
                break;
            case "small":
                break;            
        }
    }
};

function AsteroidExplosion() {
    var self = this;

    self.update = function (ticks) {

    };
}


function Asteroid(sprite, values, clientWidth, clientHeight, stage, type) {

    var self = this;

    self.sprite = sprite;
    self.rotationSpeed = 0;
    self.rotationReverse = false;
    self.velocity = 0;
    self.type = type;
    self.isDelete = false;

    self.direction = 0;

    var onDestroyedDelegates = [];

    var init = function () {
        self.sprite.x = values.x;
        self.sprite.y = values.y;

        self.sprite.anchor.x = 0.5;
        self.sprite.anchor.y = 0.5;

        self.rotationSpeed = Math.random() / 10;
        self.rotationReverse = Math.random() > 0.5;

        self.speed = values.speed;
        self.direction = values.rotation;

        if (self.type == "medium") {
            self.sprite.width = self.sprite.width / 2;
            self.sprite.height = self.sprite.height / 2;
        }
        if (self.type == "small") {
            self.sprite.width = self.sprite.width / 4;
            self.sprite.height = self.sprite.height / 4;
        }
        
        stage.addChild(self.sprite);  
    };

    self.addOnDestroyed = function (callback) {
        onDestroyedDelegates.push(callback);
    }
    
    self.update = function () {

        if (self.isDelete) {                
            return;
        }

        if (self.rotationReverse)
            self.sprite.rotation -= self.rotationSpeed;
        else 
            self.sprite.rotation += self.rotationSpeed;

        self.sprite.x += self.speed * Math.cos(self.direction);
        self.sprite.y += self.speed * Math.sin(self.direction);

        repositionIfOutsideBounds();
    };

    self.bounce = function (offObj) {        
        
        var ydiff = offObj.y - self.sprite.y;
        var xdiff = offObj.x - self.sprite.x;  
        var angle = Math.atan2(ydiff, xdiff);
        
        self.direction = 3.14159 + angle;
        self.speed = offObj.speed;
    }

    self.struck = function (bullet) {
        self.isDelete = true;
        stage.removeChild(self.sprite);

        for (var i = 0; i < onDestroyedDelegates.length; i++)
            onDestroyedDelegates[i](self);
    };

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