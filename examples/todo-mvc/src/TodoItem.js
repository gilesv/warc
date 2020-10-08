import Fusion from "fusion-wasm";
import TodoTextInput from "./TodoTextInput.js";

export default function TodoItem({ todo, toggleTodo, editTodo, deleteTodo }) {
  let [editing, setEditing] = Fusion.useState(false);

  let handleDoubleClick = () => setEditing(true);

  let handleSave = (id, text) => {
    if (text.length === 0) {
      deleteTodo(id);
    } else {
      editTodo(id, text);
    }
    setEditing(false);
  };


  return (
    <li className={`${todo.completed ? "completed ":""}${editing ? "editing" : ""}`} >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <label onClick={handleDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={() => deleteTodo(todo.id)} />
      </div>

      <TodoTextInput
        value={todo.text}
        editing={editing}
        onSave={text => handleSave(todo.id, text)}
        placeholder=""
      />
    </li>
  );
}
