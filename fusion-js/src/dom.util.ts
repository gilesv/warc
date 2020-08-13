import { Fiber } from "./fusion";

type DomNode = HTMLElement | Text;

export function createDomNode(fiber: Fiber): DomNode {
  let node = fiber.type === "TEXT_ELEMENT"
    ? document.createTextNode(fiber.props.nodeValue)
    : document.createElement(fiber.type as string);

  updateDomNode(node, {}, fiber.props);

  return node;
}

export function updateDomNode(dom: DomNode, prevProps: any, nextProps: any) {
  let isEvent = (key: string) => key.startsWith("on");
  let isProperty = (key: string) => key !== "children" && !isEvent(key);
  let isNew = (prev: any, next: any) => (key: string) => prev[key] !== next[key];
  let isGone = (prev: any, next: any) => (key: string) => !(key in next)

  // Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key =>
        !(key in nextProps) ||
        isNew(prevProps, nextProps)(key)
    )
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.removeEventListener(
        eventType,
        prevProps[name]
      )
    });

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      (dom as any)[name] = "";
    });
​
  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      (dom as any)[name] = nextProps[name]
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.addEventListener(
        eventType,
        nextProps[name]
      )
    });
}
