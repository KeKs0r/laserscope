import FocusManager from "../FocusManager";
import RootNode from "../RootNode";
import VerticalList from "../VerticalList";
import FocusNode from "../FocusNode";

function makeFixtures() {
  const root = new RootNode("root");
  const list = new VerticalList("list");
  const item1 = new FocusNode("item-1");
  const item2 = new FocusNode("item-2");
  const item3 = new FocusNode("item-3");
  list.addChild(item1);
  list.addChild(item2);
  list.addChild(item3);
  root.addChild(list);
  return {
    root,
    list,
    item1,
    item2,
    item3,
  };
}

describe("Focus Node", () => {
  // it("Can get nodes path", () => {
  //     const { }
  // })

  it("Updates the isActive", () => {
    const { root, item1, item2 } = makeFixtures();
    const focusManager = new FocusManager(root);

    expect(item1.isFocused).toBeFalsy();
    focusManager.setFocusPath(["root", "list", "item-1"]);
    expect(item1.isFocused).toBeTruthy();
    expect(item2.isFocused).toBeFalsy();
  });

  /*
   * root
   * - list
   *   - item-1
   * - list-2
   *   - item-1
   */
  it("IsActive is path dependant and not only single key", () => {
    const root = new RootNode("root");
    const list = new VerticalList("list");
    const item1 = new FocusNode("item-1");
    const list2 = new VerticalList("list-2");
    const item2 = new FocusNode("item-1");
    list.addChild(item1);
    list2.addChild(item2);
    root.addChild(list);
    root.addChild(list2);

    const focusManager = new FocusManager(root);
    focusManager.setFocusPath(["root", "list", "item-1"]);
    expect(item1.isFocused).toBeTruthy();
    expect(item2.isFocused).toBeFalsy();
  });

  it("Keeps Items in Order", () => {
    const { item1, item2, item3 } = makeFixtures();
    expect(item1).toHaveProperty("parentIndex", 0);
    expect(item2).toHaveProperty("parentIndex", 1);
    expect(item3).toHaveProperty("parentIndex", 2);
  });
});
