function BackgroundPainter(renderer, stage) {
    var self = this;
    
    var init = function () {

    };

    self.paint = function () {
        var graphics = new PIXI.Graphics();

        var maxWidth = renderer.view.clientWidth;
        var maxHeight = renderer.view.clientHeight;
        var maxRadius = 3;
        
        for (var i = 0; i < 1000; i++) {            
            var x = Math.floor(Math.random() * (maxWidth + 1));
            var y = Math.floor(Math.random() * (maxHeight + 1));
            var radius = Math.floor(Math.random() * (maxRadius + 1));

            graphics.beginFill(0xFFFFFF);
            graphics.drawCircle(x, y, radius);
            graphics.endFill();
        }

        stage.addChild(graphics);
    }

    init();
}