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

  let element;

  if (editing) {
    element = (
      <TodoTextInput
        text={todo.text}
        editing={editing}
        onSave={text => handleSave(todo.id, text)}
      />
    );
  } else {
    element = (
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
    );
  }
  
  let className = `${todo.completed ? "completed ":""}${editing ? "editing" : ""}`

  return (
    <li className={className} >
      {element}
    </li>
  );
}
