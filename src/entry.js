


function Game() {

    var loadRenderer = new LoadRenderer();
    var loadResources = new LoadResources();
    var stage = new PIXI.Container();

    var gameObjects = [];

    var renderer;
    var keyboard;
    var sprites;
    var _level = 1;
    var _asteroidFactory;

    var _asteroidCollisions = null;
    var _asteroidBulletCollisions = null;
    var _playerAsteroidCollisions = null;

    var _scoreCounter = null;
    var _playerShipFactory = null;
    var _backgroundPainter = null;

    var init = function() {

        keyboard = new Keyboard();

        Promise.all([
            loadRenderer.Load(), 
            loadResources.Load(loadResourcesProgressHandler)
        ])
        .then(function (res) {
            renderer = res[0];
            sprites = res[1];

            entry();
        });
    }

    var entry = function () {
        _backgroundPainter = new BackgroundPainter(renderer, stage);
        _backgroundPainter.paint();

        new Intro(gameObjects, stage, renderer, keyboard, startGame);

        requestAnimationFrame(gameLoop);
    }

    var startGame = function () {     
        gameObjects = [];   
        _playerAsteroidCollisions = new PlayerAsteroidCollisions(gameObjects);
        _asteroidCollisions = new AsteroidCollisions(gameObjects);
        _asteroidBulletCollisions = new AsteroidBulletCollisions(gameObjects);       
        _scoreCounter = new ScoreCounter(gameObjects, stage, renderer);
        
        _playerShipFactory = new PlayerShipFactory(_asteroidBulletCollisions, _playerAsteroidCollisions, endGame);        
        _playerShipFactory.start(sprites, renderer, stage, keyboard, gameObjects);

        _asteroidFactory = new AsteroidFactory(_asteroidCollisions, _asteroidBulletCollisions, _playerAsteroidCollisions, _scoreCounter);
        _asteroidFactory.start(sprites, renderer, stage, gameObjects, _level, levelCompleted);
    }

    var levelCompleted = function (level) {
        _level = level + 1;
        new Level(gameObjects, stage, renderer, _level, Date.now(), startNextLevel);
    };

    var startNextLevel = function (level) {
        _asteroidFactory.start(sprites, renderer, stage, gameObjects, _level, levelCompleted);
    }

    var endGame = function () {
        _asteroidFactory.stop();
        _scoreCounter.stop();

        _scoreBoard = new ScoreBoard(gameObjects, stage, renderer, keyboard, startGame);
        _scoreBoard.addScore(_scoreCounter.getScore());
        _scoreBoard.start();
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