export function logTree(root) {
  logRecursive(root);
}

function logRecursive(node, level = 1) {
  const { id } = node;

  const spacer = new Array(level).join("  ");
  //   let output = [focusKey, isFocused ? "XXX" : isInPath ? "X" : ""];
  //   // if (isDisabled) {
  //   //   output = ["(", ...output, ")"];
  //   // }
  console.log(spacer, id);
  const children = node.getChildren();
  children.forEach((child) => logRecursive(child, level + 1));
}
