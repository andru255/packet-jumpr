import Layer from "@abstract/Layer";

enum LayerStackState {
  Started,
  Stopped,
}

export class LayerStack {
  currentState: LayerStackState = LayerStackState.Stopped;
  layers: { [key: string]: Layer } = {};

  addLayer(name: string, layer: Layer): void {
    this.layers[name] = layer;
  }

  removeLayer(name: string): void {
    // TODO
  }

  getLayers(): { [key: string]: Layer } {
    return this.layers;
  }

  startOnce(features): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.currentState == LayerStackState.Stopped) {
        this.currentState = LayerStackState.Started;
        this.runLayersWithMethod("start", features);
        resolve();
      }
      reject();
    });
  }

  stop() {
    this.currentState = LayerStackState.Stopped;
  }

  runLayersWithMethod(methodName: string, features = {}) {
    Object.keys(this.layers).forEach((layerName) => {
      const layer = this.layers[layerName];
      layer[methodName](features);
    });
  }
}
