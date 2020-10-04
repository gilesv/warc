import init, * as Fusion from "fusion-wasm";
import Hello from "./Hello.js";

init.then(() => {
  Fusion.render(<Hello name="WOOOORLD" />, document.getElementById("root"));
});
