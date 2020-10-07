import Fusion from "fusion-wasm";
import TodoList from "./TodoList.js";
import Footer from "./Footer.js";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "./TodoFilters.js";

export default function MainSection({
  todos,
  deleteTodo,
  editTodo,
  toggleTodo,
  toggleAllTodo,
  clearCompleted
}) {
  let [visibilityFilter, setFilter] = Fusion.useState(SHOW_ALL);

  let todosCount = todos.length;
  let visibleTodos;
  let completedCount = todos.filter(({ completed }) => completed).length;

  switch (visibilityFilter) {
    case SHOW_ALL:
      visibleTodos = todos;
      break;
    case SHOW_COMPLETED:
      visibleTodos = todos.filter(t => t.completed);
      break;
    case SHOW_ACTIVE:
      visibleTodos = todos.filter(t => !t.completed);
      break;
    default:
      throw new Error("Unknown filter: " + visibilityFilter);
  }

  return (
    <section className="main">
      { todosCount > 0 ? (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
          />
          <label onClick={toggleAllTodo} />
        </span>
      ) : null}

      <TodoList
        todos={visibleTodos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleTodo={toggleTodo}
      />

      {todosCount > 0 ? (
        <Footer
          visibilityFilter={visibilityFilter}
          setFilter={setFilter}
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          clearCompleted={clearCompleted}
        />
      ) : null}
    </section>
  );
};