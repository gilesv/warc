import Fusion from "fusion-wasm";
import Hello from "./Hello.js";

Fusion.load().then(() => {
  Fusion.render(<Hello name="WOOOORLD" />, document.getElementById("root"));
});
