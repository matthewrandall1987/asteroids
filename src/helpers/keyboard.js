function Keyboard () {

    var self = this;
    var keys = [];

    self.isUp = function () { 
        return keys["38"] == true; 
    };

    self.isDown = function () {
        return keys["40"] == true; 
    };

    self.isLeft = function () { 
        return keys["37"] == true; 
    };

    self.isRight = function () { 
        return keys["39"] == true; 
    };

    self.isSpace = function () { 
        return keys["32"] == true; 
    };

    document.onkeydown = function (key) {
        var charCode = key.keyCode || key.which;
        keys[charCode.toString()] = true;
    };

    
    document.onkeyup = function (key) {
        var charCode = key.keyCode || key.which;
        keys[charCode.toString()] = false;
    };
}