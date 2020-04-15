import {
  updateActiveInSubtree,
  getNodeByPath,
  getPathToNode,
} from "./tree-utils";
import { DIRECTIONS } from "./constants";
import navigateTree from "./tree-navigation";
import { logTree } from "./debug-utils";

export default class FocusManager {
  constructor(rootNode, focusedPath) {
    this.rootNode = rootNode;
    this.focusedPath = focusedPath || [];
  }

  setFocusPath(focusedPath) {
    this.focusedPath = focusedPath;
    updateActiveInSubtree(this.rootNode, this.focusedPath);
  }
  getFocusPath() {
    return this.focusedPath;
  }
  moveUp() {
    this.moveFocusInDirection(DIRECTIONS.UP);
  }
  moveDown() {
    this.moveFocusInDirection(DIRECTIONS.DOWN);
  }
  moveRight() {
    this.moveFocusInDirection(DIRECTIONS.RIGHT);
  }
  moveLeft() {
    this.moveFocusInDirection(DIRECTIONS.RIGHT);
  }

  moveFocusInDirection(direction) {
    if (!this.rootNode) return;
    const focusOrigin = getNodeByPath(this.focusedPath, this.rootNode);
    if (!focusOrigin) {
      logTree(this.rootNode);
      throw new Error(
        `focusOrigin is not found, looks like the focusPath: ${this.focusedPath} is invalid`
      );
    }
    const bestCandidate = navigateTree(focusOrigin, direction);
    if (!bestCandidate) return;
    const nextPath = getPathToNode(bestCandidate);
    this.setFocusPath(nextPath);
  }
}
