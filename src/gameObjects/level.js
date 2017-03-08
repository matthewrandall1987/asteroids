function Level(gameObjects, stage, renderer, level, initTicks, startNextLevel) { 

    var self = this;

    var _level = 0;
    var _width;
    var _height;
    var _style;
    var _text;
    var _richText;
    var _displayTime = 2000;
    var _initTicks = 0;

    var init = function () {
        _level = level;

        gameObjects.push(self);

        _width = renderer.view.clientWidth;
        _height = renderer.view.clientHeight;
        _initTicks = initTicks;

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
        _richText = new PIXI.Text('level: ' + _level, _style);
        _richText.x = (_width / 2) - 50;
        _richText.y = (_height / 2) - 13;
        stage.addChild(_richText);

        if (_initTicks + _displayTime < ticks) {
            stage.removeChild(_richText);
            self.isDelete = true;
            startNextLevel(_level);
        }
    };

    init();
}