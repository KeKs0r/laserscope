import FocusNode from "./FocusNode";
import { DIRECTIONS } from "./constants";

export default class HorizontalList extends FocusNode {
  vertical = true;
  supportsDirection(direction) {
    return [DIRECTIONS.LEFT, DIRECTIONS.RIGHT].indexOf(direction) > -1;
  }
  isLeaf() {
    return false;
  }
}
