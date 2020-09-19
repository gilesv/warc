import {
  create_element,
  create_text_element,
  create_functional_component,
  create_props,
  get_context,
  work_loop,
  render as render_internal,
} from "../pkg/fusion_wasm.js";

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
  let children = rawChildren.flat().map(x => {
    if (typeof x === "string") {
      return new create_text_element(x);
    } else {
      return x;
    }
  })
  
  children = children.filter(x => {
    return x.constructor.name === "Element";
  });

  let isFunctionalComponent = typeof type === "function";

  if (isFunctionalComponent) {
    props.children = children;

    return create_functional_component(type, props);
  } else {
    let elementProps = create_props(
      props.className || null,
      props.nodeValue || null
    );

    return create_element(type, elementProps, children);
  }
}

export default {
  createElement,
  render
};
