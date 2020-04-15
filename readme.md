# Laserscope

This is a collection of libraries and tools to support Keyboard Navigation as well as the Command UI Pattern used by VSCode

## Status

- [ ] Library for pure focus management
- [ ] React bindings for focus management
- [ ] Command Pattern Library (standalone)
- [ ] Command Pattern Library integration with Focus
- [ ] React Bindings for Command Library

## Focus Management

The focus management Library supports following behaviour

- Directed Lists so you can only navigate children in one dimension (Horizontal / Vertical)
- Ignore: You can templorary ignore elements e.g. when you need to keep them in the DOM for animation purposes, but they are not visible
- FocusLock: When you want to lock the focus within a sub list until the user finishes an action
