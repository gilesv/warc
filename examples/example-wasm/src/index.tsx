export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any
    }
  }
}

// @ts-ignore
import("fusion-wasm").then(({ default: Fusion }: any) => {
  let a = <div className="main"><h1>Hey</h1></div>;

  Fusion.render(a, document.getElementById("root") as any);
})



