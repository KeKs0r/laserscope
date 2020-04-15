import { DIRECTIONS } from "./constants";

export default class FocusNode {
  constructor(id, { disabled, autoFocus, children = [] } = {}) {
    this.id = id;
    this.disabled = disabled;
    this.autoFocus = autoFocus;
    this.isFocused = false;
    this.setChildren(children);
  }

  setChildren(children) {
    this.children = new Map();
    children.forEach((child) => this.addChild(child));
  }
  addChild(child) {
    if (this.children.has(child.id)) {
      throw new Error("Id already exists as child of this Node");
    }
    child.setParent(this);
    const highestIndex = this.getChildren().reduce((max, child) => {
      if (!child.parentIndex || max < child.parentIndex) {
        return child.parentIndex;
      }
      return max;
    }, -1);
    const nextIndex = highestIndex + 1;
    child.setIndexInParent(nextIndex);
    this.children.set(child.id, child);
  }

  removeChild(id) {
    this.children.delete(id);
  }
  getChildren() {
    return Array.from(this.children.values()).filter((c) => !c.isIgnored());
  }
  getSortedChildren(direction) {
    const children = this.getChildren();
    const sorter = getSorter(direction);
    const sorted = children.sort(sorter);
    return sorted;
  }
  isLeaf() {
    return this.children.size === 0;
  }
  isIgnored() {
    return this.disabled;
  }
  setIndexInParent(index) {
    this.parentIndex = index;
  }

  setFocused(isFocused) {
    this.isFocused = isFocused;
  }
  setParent(parent) {
    this.parent = parent;
  }
  getParent() {
    return this.parent;
  }
  getRoot() {
    return this.getParent().getRoot();
  }

  getPath() {
    let node = this;
    let path = [];
    while (node) {
      path.push(node.id);
      node = node.getParent();
    }
  }
  supportsDirection() {
    return false;
  }
}

function getSorter(direction) {
  return [DIRECTIONS.DOWN, DIRECTIONS.RIGHT] ? sortForward : sortBackward;
}

function sortForward(a, b) {
  const aValue = a.parentIndex;
  const bValue = b.parentIndex;
  if (aValue < bValue) {
    return -1;
  } else if (aValue > bValue) {
    return 1;
  }
  return 0;
}

function sortBackward(a, b) {
  const aValue = a.parentIndex;
  const bValue = b.parentIndex;
  if (aValue < bValue) {
    return 1;
  } else if (aValue > bValue) {
    return -1;
  }
  return 0;
}
