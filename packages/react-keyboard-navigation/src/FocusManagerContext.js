import { createContext, useContext } from "react";

const FocusManagerContext = createContext();

export function useFocusManager() {
  return useContext(FocusManagerContext);
}

export default FocusManagerContext;
