export function updateActiveInSubtree(root, focusedPath) {
  if (!root) {
    console.warn("updating without root");
    return;
  }
  const [currentPath, ...restPath] = focusedPath;
  const isMatch = currentPath === root.id;
  if (isMatch) {
    root.setFocused(true);
  } else {
    root.setFocused(false);
  }
  const continuePath = isMatch ? restPath : [];
  const children = root.getChildren();
  children.forEach((child) => {
    updateActiveInSubtree(child, continuePath || []);
  });
}

export function getNodeByPath(path, treeRoot) {
  const [root, ...rest] = path;
  return rest.reduce((node, focusKey) => {
    if (node === undefined) return undefined;
    return node.children.get(focusKey);
  }, treeRoot);
}

export function nodeContainsChild(root, needle) {
  const rootPath = getPathToNode(root);
  const needlePath = getPathToNode(needle);
  for (let i = 0; i < rootPath.length; i++) {
    if (rootPath[i] !== needlePath[i]) {
      return false;
    }
  }
  return true;
}

export function getPathToNode(treeNode) {
  const path = [];
  let currentNode = treeNode;
  while (currentNode) {
    const { id } = currentNode;
    path.unshift(id);
    currentNode = currentNode.getParent();
  }
  return path;
}
