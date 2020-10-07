import Fusion from "fusion-wasm";
import "todomvc-app-css/index.css";
import App from "./App.js";

Fusion.load().then(() => {
  Fusion.render(<App />, document.getElementById("root"));
});
