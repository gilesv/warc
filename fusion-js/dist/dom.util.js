export function createDomNode(fiber) {
    let node = fiber.type === "TEXT_ELEMENT"
        ? document.createTextNode(fiber.props.nodeValue)
        : document.createElement(fiber.type);
    updateDomNode(node, {}, fiber.props);
    return node;
}
export function updateDomNode(dom, prevProps, nextProps) {
    let isEvent = (key) => key.startsWith("on");
    let isProperty = (key) => key !== "children" && !isEvent(key);
    let isNew = (prev, next) => (key) => prev[key] !== next[key];
    let isGone = (prev, next) => (key) => !(key in next);
    // Remove old or changed event listeners
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(key => !(key in nextProps) ||
        isNew(prevProps, nextProps)(key))
        .forEach(name => {
        const eventType = name
            .toLowerCase()
            .substring(2);
        dom.removeEventListener(eventType, prevProps[name]);
    });
    // Remove old properties
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, nextProps))
        .forEach(name => {
        dom[name] = "";
    });
    // Set new or changed properties
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
        dom[name] = nextProps[name];
    });
    // Add event listeners
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
        const eventType = name
            .toLowerCase()
            .substring(2);
        dom.addEventListener(eventType, nextProps[name]);
    });
}
