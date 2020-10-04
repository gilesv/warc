import * as Fusion from "fusion-wasm";

export default function Hello({ name }) {
  let [clickNumber, setClickNumber] = Fusion.useState(0);
  let onClick = () => { console.log(clickNumber); setClickNumber(clickNumber + 1) };

  return (
    <div>
      <h1>Hello {name}!</h1>
      <button onClick={onClick}>Clica!</button>
      <span>Você clicou {clickNumber.toString()} vezes.</span>
    </div>
  );
}
