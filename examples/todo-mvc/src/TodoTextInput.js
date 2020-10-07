import Fusion from "fusion-wasm";

let ENTER_KEY = 13;

export default function TodoTextInput({ value, onSave, newTodo, editing, placeholder }) {
  let [text, setText] = Fusion.useState(value || "");

  let handleSubmit = (e) => {
    let value = e.target.value.trim();

    if (e.which === ENTER_KEY) {
      onSave(value);

      if (newTodo) {
        setText("");
      }
    }
  };

  let handleBlur = (e) => {
    if (!newTodo) {
      onSave(e.target.value);
    }
  };

  let className = `${editing ? "editing " : ""}${newTodo ? "new-todo" : ""}`

  return (
    <input
      className={className}
      type="text"
      placeholder="What needs to be done?"
      autoFocus={true}
      value={text}
      onBlur={handleBlur}
      onKeyDown={handleSubmit}
    />
  );
}
