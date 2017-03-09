function Keyboard () {

    var self = this;
    var keys = [];

    self.isUp = function () { 
        return keys["87"] == true; 
    };

    self.isDown = function () {
        return keys["83"] == true; 
    };

    self.isLeft = function () { 
        return keys["65"] == true; 
    };

    self.isRight = function () { 
        return keys["68"] == true; 
    };

    self.isSpace = function () { 
        return keys["32"] == true; 
    };

    self.isEnter = function () {
        return keys["13"] == true;
    }

    self.isEsc = function () {
        return keys["27"] == true;
    }

    document.onkeydown = function (event) {
        var charCode = event.keyCode || event.which;
        keys[charCode.toString()] = true;
        
        event.preventDefault();
    };

    
    document.onkeyup = function (event) {
        var charCode = event.keyCode || event.which;
        keys[charCode.toString()] = false;
        
        event.preventDefault();
    };
}