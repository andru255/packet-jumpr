import Layer from "@abstract/Layer";
import { GameFeatures } from "src/Game";
import { rectangleFixture, textFixture } from "@toolbox/Fixture";
import EventHandler from "@toolbox/EventHandler";
import { isRectInsideOther, getMousePosition } from "@toolbox/MousePosition";

export default class LayerButton extends Layer {
  id: string;
  isHidden: boolean = false;
  label = <Layer>{};
  private eventHandler = new EventHandler();
  private events: any = {};
  canvas: HTMLCanvasElement;
  start(gameFeatures: GameFeatures): void {
    this.canvas = gameFeatures.canvas;
    if (!this.isHidden) {
      this.subscribe(gameFeatures.canvas);
    }
  }
  update(gameFeatures: GameFeatures): void {
    if (!this.isHidden) {
      this.subscribe(gameFeatures.canvas);
    }
  }
  render(gameFeatures: GameFeatures): void {
    if (this.isHidden) {
      return;
    }
    rectangleFixture(this, gameFeatures);
    textFixture(this.label, gameFeatures);
  }

  hide() {
    if (this.isHidden) {
      return;
    }
    this.isHidden = true;
    this.off(this.canvas);
  }

  show() {
    if (this.isHidden) {
      this.isHidden = false;
      this.subscribe(this.canvas);
    }
  }

  on(name: string, event: (evt) => void) {
    this.events[name] = event;
    return this;
  }

  private subscribe(canvas) {
    var _this = this;
    var eventList = {};
    eventList[`mousedown.${this.id}`] = function (evt) {
      const mousePos = getMousePosition(canvas, evt);
      if (isRectInsideOther(mousePos, this)) {
        _this.triggerEvent("pressed", this, [evt]);
      }
    };
    eventList[`mouseup.${this.id}`] = function (evt) {
      _this.triggerEvent("unpressed", this, [evt]);
    };
    eventList[`click.${this.id}`] = function (evt) {
      const mousePos = getMousePosition(canvas, evt);
      if (isRectInsideOther(mousePos, _this)) {
        _this.triggerEvent("click", this, [evt]);
        _this.triggerEvent("unpressed", this, [evt]);
      }
    };
    eventList[`mousemove.${this.id}`] = function (evt) {
      const mousePos = getMousePosition(canvas, evt);
      canvas.classList.remove("cursor");
      if (isRectInsideOther(mousePos, _this)) {
        canvas.classList.add("cursor");
        _this.triggerEvent("mouseinside", this, [evt]);
      }
    };
    eventList[`keyup.${this.id}`] = function (evt) {
      _this.triggerEvent("keyup", this, [evt]);
      _this.triggerEvent("unpressed", this, [evt]);
    };
    for (var event in eventList) {
      this.eventHandler.on(document, event, eventList[event]);
    }
  }

  public off(canvas: HTMLCanvasElement) {
    const names = ["mousedown", "mouseup", "click", "mousemove", "keyup"];
    names.forEach((name) => {
      this.eventHandler.off(document, `${name}.${this.id}`);
    });
    canvas.classList.remove("cursor");
  }
  private triggerEvent(name: string, context: any, params: any[]) {
    if (this.events[name] === undefined) {
      return;
    }
    this.events[name].apply(context, params);
  }
}
