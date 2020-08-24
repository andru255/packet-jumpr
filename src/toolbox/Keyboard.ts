export enum KeyName {
  ARROW_UP = 38,
  ARROW_DOWN = 40,
  ENTER = 13,
  ESC = 27,
}
export function Keyboard(keyName: KeyName) {
  var key = {
    code: keyName,
    isDown: false,
    isUp: true,
    press: undefined,
    release: undefined,
    downHandler: function (event) {
      if (event.keyCode == key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    },
    upHandler: function (event) {
      if (event.keyCode == key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    },
  };
  window.addEventListener("keydown.keyboard", key.downHandler.bind(key), false);
  window.addEventListener("keyup.keyboard", key.upHandler.bind(key), false);
  return key;
}
