import { useState, useRef, useEffect, useContext } from "react";
import { nanoid } from "nanoid";
import FocusNode from "keyboard-navigation/src/reactive/FocusNode";
import NodeContext from "./NodeContext";

export default function useFocusable(props) {
  const { focusKey } = props;
  const [generated] = useState(nanoid());
  const name = focusKey || `focusable:${generated}`;
  //@TODO: do something with the domRef
  const domRef = useRef();
  const node = useRef(new FocusNode(name)).current;
  const parent = useContext(NodeContext);

  useEffect(() => {
    parent.addChild(node);
    return () => {
      parent.removeChild(node.id);
    };
  }, []);

  return {
    node,
    ref: domRef,
  };
}
