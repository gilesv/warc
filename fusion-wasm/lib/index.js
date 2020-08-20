import { Element, ElementProps as Props, get_context, work_loop, render as render_internal } from "../pkg/fusion_wasm.js";

let TEXT_ELEMENT = "_T";
let NULL = "";

let context = get_context();

function render(element, parentDom) {
  context = render_internal(context, element, parentDom);
}

function workLoop(deadline) {
  context = work_loop(context, deadline.didTimeout);

  // window.requestIdleCallback(workLoop);
}

window.requestIdleCallback(workLoop);

function createElement(type, props = {}, ...rawChildren) {
  props = props || {};
  let children = rawChildren.map(x => {
    if (typeof x === "string") {
      return new Element(TEXT_ELEMENT, new Props(NULL, x), []);
    } else {
      return x;
    }
  }).filter(x => x instanceof Element);

  let elementProps = new Props(
    props.className || NULL,
    props.nodeValue || NULL
  );

  return new Element(type, elementProps, children);
}

export default {
  createElement,
  render
};
