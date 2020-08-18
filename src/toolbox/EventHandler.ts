export default class EventHandler {
  events: any = {};
  pattern: RegExp = /([a-z]+)\.?(.*)?/;
  private isUndefined = (value) => value === undefined;

  on(target: EventTarget, name: string, event: () => void) {
    const match = name.match(this.pattern);
    if (!this.isUndefined(match)) {
      this.events[name] = function (evt) {
        event.call(this, evt);
      };
      let eventName = match[1];
      target.addEventListener(eventName, this.events[name], false);
    }
  }

  off(target: EventTarget, name: string) {
    const event = this.events[name];
    const match = name.match(this.pattern);
    if (!this.isUndefined(match) && !this.isUndefined(event)) {
      let eventName = match[1];
      target.removeEventListener(eventName, event, false);
    }
  }

  once(target: EventTarget, name: string, event: () => void) {
    const match = name.match(this.pattern);
    const _this = this;
    if (!this.isUndefined(match)) {
      this.events[name] = function (evt) {
        event.call(this, evt);
        _this.off(target, name);
      };
      var eventName = match[1];
      target.addEventListener(eventName, this.events[name], false);
    }
  }
}
