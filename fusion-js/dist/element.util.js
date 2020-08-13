export function createElement(type, props, ...args) {
    let children = [].concat(...args)
        .filter((child) => child !== null && child !== undefined)
        .map((child) => {
        return typeof child === "object"
            ? child
            : createTextElement(child);
    });
    return {
        type,
        props: {
            ...props,
            children,
        },
    };
}
function createTextElement(value) {
    return createElement("TEXT_ELEMENT", { nodeValue: value });
}
