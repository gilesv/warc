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
  let a = <div className="yeah">
    <style>{".yeah { background: red; }"}</style>
    <h2>If you can read this...</h2>
    <h1>it's WORKING!</h1>
    <span>p.s.: WASM Reconciler</span>
  </div>;

  Fusion.render(a, document.getElementById("root") as any);
})



