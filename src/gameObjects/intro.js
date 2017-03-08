function Intro(gameObjects, stage, renderer, keyboard, startGame) { 

    var self = this;

    var _width;
    var _height;
    var _style;
    var _text;
    var _richText;
    var _displayTime = 2000;

    var init = function () {

        gameObjects.push(self);

        _width = renderer.view.clientWidth;
        _height = renderer.view.clientHeight;

        _style = new PIXI.TextStyle({
            fontFamily: 'Courier',
            fontSize: 36,
            fontWeight: 'bold',
            fill: ['#008000', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5
        });

        _richText = new PIXI.Text('', _style);
        stage.addChild(_richText);
    }

    self.update = function (ticks) {
        stage.removeChild(_richText);
        _richText = new PIXI.Text('Welcome to Matts awesome ASTEROIDS!!!\n\nKeys:\n To Move: Up/Down/Left/Right\n Space to shoot\n\nPress Enter to Start!!!', _style);
        _richText.x = (_width / 2) - 398;
        _richText.y = (_height / 2) - 140;
        stage.addChild(_richText);

        if (keyboard.isEnter()) {
            stage.removeChild(_richText);
            self.isDelete = true;
            startGame();
        }
    };

    init();
}