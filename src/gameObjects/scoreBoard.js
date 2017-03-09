function ScoreBoard(gameObjects, stage, renderer, keyboard, entry) {
    var self = this;

    var score = 0;
    var width;
    var height;
    var style;
    var text;
    var scores = ["0","0","0","0","0"];

    var init = function () {
        var s = getCookie();

        if (s !== null)
            scores = s;
    }

    self.addScore = function (score) {

        var highestIndex = -1;

        for (var i = scores.length; i >= 0; i--) {
            if (Number(scores[i]) <= score) {
                highestIndex = i;
            }
        }

        if (highestIndex != -1) {  

            scores.splice(highestIndex, 0, score.toString()); 
            scores.splice(5);    
            setCookie();
        }

    };

    self.start = function () {

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
        gameObjects.push(self);      
    };

    self.update = function (ticks) {
        stage.removeChild(richText);
        richText = new PIXI.Text(''+
            '         Game Over!!!\n\n' + 
            '           Scores:' +
            '\n            1st. ' + scores[0] +
            '\n            2nd. ' + scores[1] + 
            '\n            3rd. ' + scores[2] + 
            '\n            4th. ' + scores[3] + 
            '\n            5th. ' + scores[4] + 
            '\n\nPress Enter to start a new game!!!', style);
        richText.x = (width / 2) - 377;
        richText.y = (height / 2) - 204;
        stage.addChild(richText);

        if (keyboard.isEnter()) {
            stage.removeChild(richText);
            entry();
        }
    };

    var setCookie = function () {
        var d = new Date();
        var s = JSON.stringify(scores);

        d.setTime(d.getTime() + (20*365*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();

        document.cookie = "scores=" + s + ";" + expires + ";path=/";
    }

    function getCookie() {
        var name = "scores=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        var response = null;

        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            
            while (c.charAt(0) == ' ') 
                c = c.substring(1);
            
            if (c.indexOf(name) == 0) 
                response = JSON.parse(c.substring(name.length, c.length));
        }
        
        return response;
    }

    init();
}