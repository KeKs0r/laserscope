import FocusNode from "./FocusNode";

export default class FocusLock extends FocusNode {
  isLocked = false;
  constructor(id, options) {
    super(id, options);
    if (options && options.disabled) {
      this.isLocked = false;
    } else {
      this.isLocked = true;
    }
  }
  setDisabled(disabled) {
    this.isLocked = !disabled;
  }
}
