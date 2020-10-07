import Fusion from "fusion-wasm";
import TodoTextInput from './TodoTextInput.js';

export default function Header({ addTodo }) {
  let onSave = (text) => {
    if (text.length !== 0) {
      addTodo(text)
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo={true}
        onSave={onSave}
      />
    </header>
  );
}
