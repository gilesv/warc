interface Element {
  type: string,
  props: {
    [key: string]: any,
    children: Element[]
  }
}

export function createElement(type: string, props: any, ...args: any[]): Element {
  let children: any[] = [].concat(...args)
    .filter((child: any) => child !== null && child !== undefined)
    .map((child: any) => {
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
  }
}

function createTextElement(value: string): Element {
  return createElement("TEXT_ELEMENT", { nodeValue: value });
}
