import { DIRECTIONS } from "./constants";
import { nodeContainsChild } from "./tree-utils";

export default function navigateTree(focusOrigin, direction) {
  if (!focusOrigin || !direction) {
    return;
  }
  const found = searchFrom(focusOrigin, focusOrigin, direction);
  return found;
}

function searchFrom(start, origin, direction) {
  const parent = start.getParent();
  if (!parent) {
    return;
  }
  const directionParent = getDirectionParent(parent, direction);
  if (!directionParent) {
    return;
  }
  const children = directionParent.getSortedChildren(direction);

  const currentIndex = children.findIndex((node) => {
    const contains = nodeContainsChild(node, origin);
    return contains;
  });
  const found = findFocusableNodeFromIndex(children, currentIndex, direction);
  if (found) {
    return found;
  }
  if (parent.isLocked) {
    return;
  }
  return searchFrom(parent, origin, direction);
}

function getDirectionParent(node, direction) {
  if (node.supportsDirection(direction)) {
    return node;
  } else if (node.isLocked) {
    return node;
  }
  const parent = node.getParent();
  if (parent) {
    return getDirectionParent(parent, direction);
  }
}

function findFocusableNodeFromIndex(children, index, direction) {
  const modifier = isForward(direction) ? 1 : -1;
  let nextIndex = index + modifier;

  while (children[nextIndex]) {
    const currentRoot = children[nextIndex];
    const focusableChild = getFirstFocusableChild(currentRoot, direction);
    if (focusableChild) {
      return focusableChild;
    }
    nextIndex = nextIndex + modifier;
  }
}

function getFirstFocusableChild(node, direction) {
  if (node.isLeaf()) {
    return node;
  }
  if (node.isIgnored()) {
    return;
  }

  const sortedPotentialChildren = node.getSortedChildren(direction);
  for (let child of sortedPotentialChildren) {
    const focusedChild = getFirstFocusableChild(child, direction);
    if (focusedChild) {
      return focusedChild;
    }
  }
}

function isForward(direction) {
  return [DIRECTIONS.DOWN, DIRECTIONS.RIGHT].indexOf(direction) > -1;
}
