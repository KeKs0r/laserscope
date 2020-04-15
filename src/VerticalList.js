import FocusNode from "./FocusNode";
import { DIRECTIONS } from "./constants";

export default class VerticalList extends FocusNode {
  vertical = true;
  supportsDirection(direction) {
    return [DIRECTIONS.UP, DIRECTIONS.DOWN].indexOf(direction) > -1;
  }
  isLeaf() {
    return false;
  }
}
