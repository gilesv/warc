let render = () => {};
let useState = () => {};
let createElement = () => {};

export {
  render,
  createElement,
  useState,
};

export default import("../pkg/fusion_wasm_bg.js").then((glue) => {
  let context = glue.get_context();

  function workLoop(deadline) {
    context = glue.work_loop(context, deadline.didTimeout);
    window.requestIdleCallback(workLoop);
  }

  render = (element, parentDom) => {
    context = glue.render(context, element, parentDom);
    window.requestIdleCallback(workLoop);
  }

  useState = (initialValue) => {
    let result = glue.use_state(context, initialValue);
    return result;
  }

  createElement = (type, props, ...rawChildren) => {
    props = props || {};
    let children = rawChildren
      .flat()
      .filter((x) => x)
      .map((x) => {
        return typeof x === "string"
          ? glue.create_text_element(x)
          : x;
      });

    let isFunctionalComponent = typeof type === "function";

    if (isFunctionalComponent) {
      props.children = children;
      return glue.create_functional_component(type, props);
    } else {
      let elementProps = glue.create_props(
        props ? props.className : null,
        props ? props.nodeValue: null,
        props ? props.onClick : null,
      );
      return glue.create_element(type, elementProps, children);
    }
  }
});
