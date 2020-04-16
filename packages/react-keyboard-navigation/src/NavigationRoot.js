import React, { useRef } from "react";
import RootContext from "./NodeContext";
import FocusManagerContext from "./FocusManagerContext";
import FocusManager from "keyboard-navigation/src/reactive/FocusManager";
import RootNode from "keyboard-navigation/src/reactive/RootNode";

export default function NavigationRoot({ children }) {
  const rootNode = useRef(new RootNode()).current;
  const focusManager = useRef(new FocusManager(rootNode)).current;
  return (
    <FocusManagerContext.Provider value={focusManager}>
      <RootContext.Provider value={rootNode}>
        Root:
        {children}
      </RootContext.Provider>
    </FocusManagerContext.Provider>
  );
}
