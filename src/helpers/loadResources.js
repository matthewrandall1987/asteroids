function LoadResources() {

    var ship = "images/ship.png";
    var bullet = "images/bullet.png";
    var asteroid_sprites_large = "images/asteroid_sprites_large.png";

    var init = function () {
        
    }

    this.Load = function (loadProgressHandler) {
        
        var promise = new Promise(function (resolve, reject) {

            PIXI.loader.add([ship, bullet, asteroid_sprites_large])
                .on("progress", loadProgressHandler)
                .load(function () {
                    resolve({
                        ship: setup_ship,
                        large_asteroids : setup_asteroids_large,
                        bullet: setup_bullet
                    });

                });
        });

        return promise;
    }

    var setup_ship = function () {

        var mySpriteSheetImage  = PIXI.BaseTexture.fromImage(ship);

        var texture = new PIXI.Texture(mySpriteSheetImage, new PIXI.Rectangle(0, 0, 75, 75));
        var texture_acc = new PIXI.Texture(mySpriteSheetImage, new PIXI.Rectangle(75, 0, 75, 75));
        var texture_dcc = new PIXI.Texture(mySpriteSheetImage, new PIXI.Rectangle(150, 0, 75, 75));

        return {
            sprite: new PIXI.Sprite(texture),
            ship_texture: texture,
            ship_accelerate_texture: texture_acc,
            ship_deccelerate_texture: texture_dcc
        };
    }

    var setup_ship_accelerate = function () {
        var texture = PIXI.loader.resources[ship].texture;
        
        texture.frame = rectangle;

        return new PIXI.Sprite(texture);
    }
    

    var setup_ship_deccelerate = function () {
        var texture = PIXI.loader.resources[ship].texture;
        
        texture.frame = rectangle;

        return new PIXI.Sprite(texture);
    }

    var setup_asteroids_large = function () {
        return new PIXI.Sprite(PIXI.loader.resources[asteroid_sprites_large].texture)
    }

    var setup_bullet = function () {
        return new PIXI.Sprite(PIXI.loader.resources[bullet].texture);
    }

    init();


}