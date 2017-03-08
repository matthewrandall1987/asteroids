function ScoreCounter(gameObjects, stage, renderer) {
    var self = this;

    var score = 0;
    var width;
    var height;
    var style;
    var text;

    var init = function () {
        score = 0;
        gameObjects.push(self);

        width = renderer.view.clientWidth;
        height = renderer.view.clientHeight;

        style = new PIXI.TextStyle({
            fontFamily: 'Courier',
            fontSize: 36,
            fontWeight: 'bold',
            fill: ['#008000', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5
        });

        richText = new PIXI.Text('', style);
        stage.addChild(richText);
    }

    self.getScore = function () {
        return score;
    }

    self.increment = function () {
        score++;
    };

    self.update = function (ticks) {
        stage.removeChild(richText);
        richText = new PIXI.Text('Score: ' + score, style);
        richText.x = width - 250;
        richText.y = height - 50;
        stage.addChild(richText);
    };

    self.stop = function () {
        stage.removeChild(richText);
        self.isDelete = true;
    }

    init();
}