import { updateActiveInSubtree } from "../tree-utils";
import { RootNode, FocusNode, VerticalList } from "../index";

function getSimpleFixture() {
  const root = new RootNode("root");
  const item1 = new FocusNode("item-1");
  const item2 = new FocusNode("item-2");
  root.addChild(item1);
  root.addChild(item2);
  return { root, item1, item2 };
}

describe("tree-update-utils", () => {
  it("initially updates isFocused for 1 level", () => {
    const { root, item1, item2 } = getSimpleFixture();
    updateActiveInSubtree(root, ["root", "item-1"]);
    expect(root.isFocused).toBeTruthy();
    expect(item1.isFocused).toBeTruthy();
    expect(item2.isFocused).toBeFalsy();
  });

  it("Also sets previously focused to false", () => {
    const { root, item1, item2 } = getSimpleFixture();
    root.setFocused(true);
    item2.setFocused(true);
    updateActiveInSubtree(root, ["root", "item-1"]);
    expect(root.isFocused).toBeTruthy();
    expect(item1.isFocused).toBeTruthy();
    expect(item2.isFocused).toBeFalsy();
  });

  it("also updates orphan path", () => {
    const { root, item1, item2 } = getSimpleFixture();
    const item3 = new FocusNode("sub-item-3");
    item3.setFocused(true);
    item2.addChild(item3);
    const item4 = new FocusNode("sub-sub-item-4");
    item4.setFocused(true);
    item3.addChild(item4);
    updateActiveInSubtree(root, ["root", "item-1"]);
    expect(root.isFocused).toBeTruthy();
    expect(item1.isFocused).toBeTruthy();
    expect(item2.isFocused).toBeFalsy();
    expect(item3.isFocused).toBeFalsy();
    expect(item4.isFocused).toBeFalsy();
  });
});
