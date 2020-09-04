import {
  create_element,
  create_text_element,
  create_props,
  get_context,
  work_loop,
  render as render_internal,
} from "../pkg/fusion_wasm.js";

let NULL = "";

let context = get_context();

function render(element, parentDom) {
  context = render_internal(context, element, parentDom);
  window.requestIdleCallback(workLoop);
}

function workLoop(deadline) {
  context = work_loop(context, deadline.didTimeout);

  window.requestIdleCallback(workLoop);
}


function createElement(type, props = {}, ...rawChildren) {
  props = props || {};
  let children = rawChildren.map(x => {
    if (typeof x === "string") {
      return new create_text_element(x);
    } else {
      return x;
    }
  })
  
  children = children.filter(x => {
    return x.constructor.name === "Element";
  });

  let elementProps = create_props(
    props.className || NULL,
    props.nodeValue || NULL
  );

  return create_element(type, elementProps, children);
}

export default {
  createElement,
  render
};
