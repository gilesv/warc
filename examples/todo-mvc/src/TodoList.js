import Fusion from "fusion-wasm";
import TodoItem from "./TodoItem.js";

export default function TodoList({ todos, editTodo, deleteTodo, toggleTodo }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          editTodo={editTodo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};
