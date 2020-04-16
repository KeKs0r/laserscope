import React, { useCallback } from "react";
import useFocusable from "../../src/useFocusable";
import { useObserver } from "mobx-react-lite";
import styled from "styled-components";

const FocusableText = styled.div`
  &:focus {
    outline: none;
  }
  border-left: 3px solid ${({ focused }) => (focused ? "blue" : "white")};
`;

export default function FocusableNode({ focusKey }) {
  const { ref, node } = useFocusable({ focusKey });
  const onClick = useCallback(() => {
    node.acquireFocus();
  }, [node]);
  return useObserver(() => (
    <FocusableText focused={node.isFocused} ref={ref} onClick={onClick}>
      {focusKey}
      {console.log("rendering")}
    </FocusableText>
  ));
}
