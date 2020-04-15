import FocusManager from "../FocusManager";
import RootNode from "../RootNode";
import VerticalList from "../VerticalList";
import HorizontalList from "../HorizontalList";
import FocusNode from "../FocusNode";
import FocusLock from "../FocusLock";

class FocusIgnore extends FocusNode {
  constructor(id, props) {
    super(id, { ...props, disabled: true });
  }
}

describe("Basic Navigation", () => {
  it("Can Navigate normally", () => {
    const root = new RootNode("root", {
      children: [
        new VerticalList("list", {
          children: [
            new FocusNode("item-1"),
            new FocusNode("item-2"),
            new FocusNode("item-3"),
          ],
        }),
      ],
    });

    const focusManager = new FocusManager(root);
    focusManager.setFocusPath(["root", "list", "item-2"]);
    expect(focusManager.getFocusPath()).toContain("item-2");

    focusManager.moveUp();
    expect(focusManager.getFocusPath()).toContain("item-1");
    focusManager.moveDown();
    focusManager.moveDown();
    expect(focusManager.getFocusPath()).toContain("item-3");
  });

  it("Navigation skips empty containers", () => {
    const root = new RootNode("root", {
      children: [
        new FocusNode("item-1"),
        new FocusNode("item-2"),
        new VerticalList("list"),
        new FocusNode("item-3"),
      ],
    });

    const focusManager = new FocusManager(root);
    focusManager.setFocusPath(["root", "item-2"]);
    focusManager.moveDown();
    expect(focusManager.getFocusPath()).toContain("item-3");
  });
});

describe("Horizontal and Vertical Lists", () => {
  const root = new RootNode("root", {
    children: [
      new HorizontalList("top-menu", {
        children: [
          new FocusNode("menu-1"),
          new FocusNode("menu-2"),
          new FocusNode("menu-3"),
        ],
      }),
      new VerticalList("main", {
        children: [
          new FocusNode("item-1"),
          new FocusNode("item-2"),
          new HorizontalList("inner-horizontal", {
            children: [
              new FocusNode("hor-1"),
              new FocusNode("hor-2"),
              new FocusNode("hor-3"),
            ],
          }),
          new FocusNode("item-3"),
        ],
      }),
    ],
  });

  const focusManager = new FocusManager(root);
  focusManager.setFocusPath(["root", "main", "item-1"]);

  it("Can not move horizontal when only in vertical context", () => {
    expect(focusManager.getFocusPath()).toContain("item-1");
    focusManager.moveRight();
    expect(focusManager.getFocusPath()).toContain("item-1");
    focusManager.moveLeft();
    expect(focusManager.getFocusPath()).toContain("item-1");
  });
  it("Can move to first Item in Horizontal List", () => {
    expect(focusManager.getFocusPath()).toContain("item-1");
    focusManager.moveUp();
    expect(focusManager.getFocusPath()).toContain("menu-1");
  });
  it("Can move within horizontal list", () => {
    expect(focusManager.getFocusPath()).toContain("menu-1");
    focusManager.moveRight();
    focusManager.moveRight();
    expect(focusManager.getFocusPath()).toContain("menu-3");
  });
  it("Can move off Horizontal List", () => {
    expect(focusManager.getFocusPath()).toContain("menu-3");
    focusManager.moveDown();
    expect(focusManager.getFocusPath()).toContain("item-1");
    focusManager.moveDown();
    expect(focusManager.getFocusPath()).toContain("item-2");
  });
  it("can move to intermediate horizontal", () => {
    expect(focusManager.getFocusPath()).toContain("item-2");
    focusManager.moveDown();
    expect(focusManager.getFocusPath()).toContain("hor-1");
    focusManager.moveDown();
    expect(focusManager.getFocusPath()).toContain("item-3");
  });
});

describe("Focus Ignore", () => {
  it("Skips Ignored Focus Container", () => {
    const root = new RootNode("root", {
      children: [
        new FocusNode("item-1"),
        new FocusNode("item-2"),
        new VerticalList("list-1", {
          children: [
            new FocusIgnore("ignore", {
              children: [new FocusNode("ignored-item")],
            }),
          ],
        }),
        new FocusNode("item-3"),
      ],
    });

    const focusManager = new FocusManager(root);
    focusManager.setFocusPath(["root", "item-2"]);

    expect(focusManager.getFocusPath()).toContain("item-2");
    focusManager.moveDown();
    expect(focusManager.getFocusPath()).toContain("item-3");
  });

  it("Skips ignored Focus Container (edge-case)", () => {
    const root = new RootNode("root", {
      children: [
        new FocusNode("PersonHeader"),
        new VerticalList("PersonActivities", {
          children: [
            new VerticalList("PersonActivities", {
              children: [
                new VerticalList("vert-1", {
                  children: [
                    new FocusIgnore("ignore", {
                      children: [new FocusNode("ignored-item")],
                    }),
                  ],
                }),
              ],
            }),
            new FocusNode("item-2"),
          ],
        }),
      ],
    });

    const focusManager = new FocusManager(root);
    focusManager.setFocusPath(["root", "PersonHeader"]);

    expect(focusManager.getFocusPath()).toContain("PersonHeader");
    focusManager.moveDown();
    expect(focusManager.getFocusPath()).toContain("item-2");
  });

  it("Navigates correctly out of an Ignored Item", () => {
    const root = new RootNode("root", {
      children: [
        new FocusNode("item-1"),
        new FocusNode("item-2"),
        new VerticalList("list-1", {
          children: [
            new FocusIgnore("ignore", {
              children: [new FocusNode("ignored-item")],
            }),
          ],
        }),
        new FocusNode("item-3"),
      ],
    });

    const focusManager = new FocusManager(root);
    focusManager.setFocusPath(["root", "list-1", "ignore", "ignored-item"]);

    expect(focusManager.getFocusPath()).toContain("ignored-item");
    focusManager.moveUp();
    expect(focusManager.getFocusPath()).not.toContain("ignored-item");
    expect(focusManager.getFocusPath()).toContain("item-2");
  });
});

describe("Focus Lock", () => {
  const root = new RootNode("root", {
    children: [
      new FocusNode("item-1"),
      new FocusNode("item-2"),
      new VerticalList("list-1", {
        children: [
          new FocusLock("my-lock", {
            children: [
              new FocusNode("locked-1"),
              new FocusNode("locked-2"),
              new FocusNode("locked-3"),
            ],
          }),
        ],
      }),
      new FocusNode("item-3"),
    ],
  });

  it("Can not move out of FocusLock", () => {
    const focusManager = new FocusManager(root);
    focusManager.setFocusPath(["root", "list-1", "my-lock", "locked-2"]);

    expect(focusManager.getFocusPath()).toContain("locked-2");
    focusManager.moveUp();
    expect(focusManager.getFocusPath()).toContain("locked-1");
    focusManager.moveUp();
    expect(focusManager.getFocusPath()).toContain("locked-1");
    focusManager.moveDown();
    focusManager.moveDown();
    focusManager.moveDown();
    focusManager.moveDown();
    focusManager.moveDown();
    expect(focusManager.getFocusPath()).toContain("locked-3");
  });
});
