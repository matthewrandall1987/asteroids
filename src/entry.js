


function Game() {

    var loadRenderer = new LoadRenderer();
    var loadResources = new LoadResources();
    var stage = new PIXI.Container();

    var gameObjects = [];

    var renderer;
    var keyboard;
    var sprites;

    var init = function() {

        keyboard = new Keyboard();

        Promise.all([
            loadRenderer.Load(), 
            loadResources.Load(loadResourcesProgressHandler)
        ])
        .then(isLoaded);
    }

    var isLoaded = function (res) {
        renderer = res[0];
        sprites = res[1];
        
        var asteroidCollisions = new AsteroidCollisions(gameObjects);
        var asteroidBulletCollisions = new AsteroidBulletCollisions(gameObjects);        
        
        var playerShipFactory = new PlayerShipFactory(asteroidBulletCollisions);        
        playerShipFactory.start(sprites, renderer, stage, keyboard, gameObjects);

        var asteroidFactory = new AsteroidFactory(asteroidCollisions, asteroidBulletCollisions);
        asteroidFactory.start(sprites, renderer, stage, gameObjects);

        requestAnimationFrame(gameLoop)
    }

    var gameLoop = function () {        

        var toDel = [];
        var tick = Date.now();
        
        for (var i = 0; i < gameObjects.length; i++) {  
            if (gameObjects[i].isDelete) 
                toDel.push(gameObjects[i]);
            else
                gameObjects[i].update(tick);            
        }

        for (var i = 0; i < toDel.length; i++) {
            var index = gameObjects.indexOf(toDel[i]);
            gameObjects.splice(index, 1);
        }

        renderer.render(stage);
        requestAnimationFrame(gameLoop);
    }

    var loadResourcesProgressHandler = function (ev, resource) {
    }

    init();
}