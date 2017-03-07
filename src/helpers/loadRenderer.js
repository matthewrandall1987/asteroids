function LoadRenderer() {

    var renderer = {};

    var init = function () {

        renderer = PIXI.autoDetectRenderer(256, 256, {
            antialias: false, 
            transparent: false, 
            resolution: 1
        });

        renderer.backgroundColor = 0x000000
        renderer.view.style.position = "absolute";
        renderer.view.style.display = "block";
        renderer.autoResize = true;
        renderer.resize(window.innerWidth, window.innerHeight);
    }

    this.Load = function () {

        return new Promise(function (resolve, reject) {

            var type = "WebGL";

            if (PIXI.utils.isWebGLSupported()) {
                type = "canvas"
            }

            document.body.appendChild(renderer.view);

            console.log(renderer);
            resolve(renderer);

        });
    }

    init();
}