function LoadResources() {

    var ship = "images/ship.png";
    var bullet = "images/bullet.png";
    var asteroid_sprites_large = "images/asteroid_sprites_large.png";
    var asteroid_sprites_medium = "images/asteroid_sprites_medium.png";
    var asteroid_sprites_small = "images/asteroid_sprites_small.png";

    var init = function () {
        
    }

    this.Load = function (loadProgressHandler) {
        
        var promise = new Promise(function (resolve, reject) {

            PIXI.loader.add([ship, bullet, asteroid_sprites_large, asteroid_sprites_medium, asteroid_sprites_small])
                .on("progress", loadProgressHandler)
                .load(function () {
                    resolve({
                        ship: setup_ship,
                        large_asteroids : setup_asteroids_large,
                        medium_asteroids : setup_asteroids_medium,
                        small_asteroids : setup_asteroids_small,
                        bullet: setup_bullet
                    });

                });
        });

        return promise;
    }

    var setup_ship = function () {
        return new PIXI.Sprite(PIXI.loader.resources[ship].texture);
    }

    var setup_asteroids_large = function () {

        var texture = PIXI.loader.resources[asteroid_sprites_large].texture;
        texture.frame = new PIXI.Rectangle(0,0, 201, 166);       

        return new PIXI.Sprite(texture)
    }

    var setup_asteroids_medium = function () {
        return new PIXI.Sprite(PIXI.loader.resources[asteroid_sprites_large].texture);
    }

    var setup_asteroids_small = function () {
        return new PIXI.Sprite(PIXI.loader.resources[asteroid_sprites_large].texture);
    }

    var setup_bullet = function () {
        return new PIXI.Sprite(PIXI.loader.resources[bullet].texture);
    }

    init();


}