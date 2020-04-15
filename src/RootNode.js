import VerticalList from "./VerticalList";

export default class RootNode extends VerticalList {
  root = true;

  constructor(id, options) {
    super(id || "root", options);
  }
  getRoot() {
    return this;
  }
}
