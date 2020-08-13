import { Element, ElementProps as Props, render } from "../pkg/index.js";

let tree = new Element("div", new Props("main", ""), [
  new Element("h1", new Props("", ""), [new Element("_T", new Props("", "Hello wasm!"), [])])
]);

function createElement(type, props = {}, ...rawChildren) {
  props = {} || props;
  let children = rawChildren.map(x => {
    if (typeof x === "string") {
      return createElement("_T", null, { nodeValue: x });
    } else {
      return x;
    }
  }).filter(x => x instanceof Element);
  let elementProps = new Props(props.className || "", props.nodeValue || "");

  return new Element(type, elementProps, children);
}

export default {
  createElement,
  render
};
