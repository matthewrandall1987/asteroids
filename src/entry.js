


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
        
        PlayerShipFactory.make(sprites, renderer, stage, keyboard, gameObjects, asteroidBulletCollisions);

        var asteroidFactory = new AsteroidFactory(asteroidCollisions, asteroidBulletCollisions);
        asteroidFactory.start(sprites, renderer, stage, gameObjects);

        requestAnimationFrame(gameLoop)
    }

    var gameLoop = function () {        

        var toDel = [];
        var tick = Date.now();
        
        for (var i = 0; i < gameObjects.length; i++) {
            gameObjects[i].update(tick);

            if (gameObjects[i].isDelete)
                toDel.push({ 
                    index: i, 
                    obj: gameObjects[i] 
                });
        }

        for (var i = 0; i < toDel.length; i++) {
            gameObjects.splice(toDel[i].index, 1);
        }

        renderer.render(stage);
        requestAnimationFrame(gameLoop);
    }

    var loadResourcesProgressHandler = function (ev, resource) {
    }

    init();
}