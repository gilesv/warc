import {
  create_element,
  create_text_element,
  create_functional_component,
  create_props,
  get_context,
  work_loop,
  render as _render,
  use_state as _use_state
} from "../pkg/fusion_wasm.js";

let context = get_context();

function render(element, parentDom) {
  context = _render(context, element, parentDom);
  window.requestIdleCallback(workLoop);
}

function useState(initialValue) {
  let result = _use_state(context, initialValue);

  return result;
}

function workLoop(deadline) {
  context = work_loop(context, deadline.didTimeout);
  window.requestIdleCallback(workLoop);
}

function createElement(type, props = {}, ...rawChildren) {
  let children = rawChildren.flat().map(x => {
    if (typeof x === "string") {
      return create_text_element(x);
    } else {
      return x;
    }
  })

  let isFunctionalComponent = typeof type === "function";

  if (isFunctionalComponent) {
    props.children = children;
    return create_functional_component(type, props);
  } else {
    let elementProps = create_props(
      props ? props.className : null,
      props ? props.nodeValue: null,
      props ? props.onClick : null,
    );
    return create_element(type, elementProps, children);
  }
}

export default {
  createElement,
  render,
  useState,
};
