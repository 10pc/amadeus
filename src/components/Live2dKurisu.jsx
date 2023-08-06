import { useEffect } from "react";
import * as PIXI from "pixi.js";
import { Live2DModel } from "pixi-live2d-display/lib/cubism4";

window.PIXI = PIXI;

Live2DModel.registerTicker(PIXI.Ticker);
// register InteractionManager to make Live2D models interactive
PIXI.Renderer.registerPlugin("interaction", PIXI.InteractionManager);

function Live2dKurisu() {
  useEffect(() => {
    const app = new PIXI.Application({
      view: document.getElementById("canvas"),
      autoStart: true,
      resizeTo: window,
      backgroundAlpha: 0,
      antialias: true
    });

    Live2DModel.from("runtime/amadeus expressions.model3.json", {
      idleMotionGroup: "Idle"
    }).then((model) => {
      app.stage.addChild(model);
      model.anchor.set(0.5, 0.2);
  
      if (window.innerWidth <= 768) { // mobile device
        let scale = window.innerWidth / 1500;
        model.scale.set(scale, scale);
      } else { // PC
        let scale = window.innerWidth / 4000;
        model.scale.set(scale, scale);
      }
      model.position.set(window.innerWidth / 2, window.innerHeight / 4);

      model.on("pointertap", () => {
        model.motion("Tap@Body");
      });

      // respond to resizing
      window.onresize = function(event) {
        if (window.innerWidth <= 768) { // mobile device
          let scale = window.innerWidth / 2000;
          model.scale.set(scale, scale);
        } else { // PC
          let scale = window.innerWidth / 2500;
          model.scale.set(scale, scale);
        }
        model.position.set(window.innerWidth / 2, window.innerHeight / 4);
      };
    });
  }, []);

  return <canvas id="canvas" />;
}

export default Live2dKurisu;
