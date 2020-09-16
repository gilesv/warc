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

  // let a = <h1>Hello</h1>;
  Fusion.render(a, document.getElementById("root") as any);

  setTimeout(() => {
    let b = <div className="yeahH">
      <style>{".yeah { background: red; }"}</style>
      <h2>If you can read this...</h2>
      <h1>it's UPDATING!!!! AND DELETING</h1>
      <h3>hai</h3>
      <span>p.s.: WASM Reconciler</span>
      <br></br><span>COBRA KAAAI!!!</span>
    </div>;

    // let b = <h1>World</h1>;
    Fusion.render(b, document.getElementById("root") as any);
  }, 3000);
})



