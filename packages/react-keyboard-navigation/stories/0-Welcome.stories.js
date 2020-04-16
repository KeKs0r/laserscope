import React, { useCallback } from "react";
import { linkTo } from "@storybook/addon-links";
import NavigationRoot from "../src/NavigationRoot";
import { useFocusManager } from "../src/FocusManagerContext";
import Leaf from "./components/Leaf";

function RootDecorator(storyFn) {
  return <NavigationRoot>{storyFn()}</NavigationRoot>;
}

export default {
  title: "Navigation",
  decorators: [RootDecorator],
};

function Leaf2Button() {
  const focusManager = useFocusManager();
  const onClick = useCallback(() => {
    focusManager.setFocusPath(["root", "leaf-2"]);
  });
  return <button onClick={onClick}>Focus 2</button>;
}

export const BasicNavigation = () => (
  <div>
    <Leaf focusKey="leaf-1" />
    <Leaf focusKey="leaf-2" />
    <Leaf focusKey="leaf-3" />
    <Leaf2Button />
  </div>
);

BasicNavigation.story = {
  name: "Basic Navigation",
};
