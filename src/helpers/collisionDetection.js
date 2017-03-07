function CollisionDetection () {

    var self = this;

    self.isCollided = function(r1, r2) {                
        var vx = (r1.x + halfWidth(r1) - xAnchorOffset(r1)) - (r2.x + halfWidth(r2) - xAnchorOffset(r2));
        var vy = (r1.y + halfHeight(r1) - yAnchorOffset(r1)) - (r2.y + halfHeight(r2) - yAnchorOffset(r2));
        
        var combinedHalfWidths = halfWidth(r1) + halfWidth(r2);
        var combinedHalfHeights = halfHeight(r1) + halfHeight(r2);

        return Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights;
    };

    var halfWidth = function (r) {
        return r.width / 2
    }

    var halfHeight = function (r) {
        return r.height / 2
    }

    var xAnchorOffset = function (r) {
        return r.width * r.anchor.x;
    }

    var yAnchorOffset = function (r) {
        return r.height * r.anchor.y;
    }

}