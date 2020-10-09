import Fusion from "fusion-wasm";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "./TodoFilters.js";

const FILTER_TITLES = {
  [SHOW_ALL]: "All",
  [SHOW_ACTIVE]: "Active",
  [SHOW_COMPLETED]: "Completed"
};

export default function Footer({
  visibilityFilter,
  activeCount,
  completedCount,
  setFilter,
  clearCompleted
}) {
  const itemWord = activeCount === 1 ? "item" : "items";

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{`${activeCount}` || "No"}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {Object.keys(FILTER_TITLES).map(filter => (
          <li key={filter}>
            <a
              className={filter === visibilityFilter ? "selected" : ""}
              onClick={() => setFilter(filter)}
            >
              {FILTER_TITLES[filter]}
            </a>
          </li>
        ))}
      </ul>
      {completedCount > 0 ? (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      ) : null}
    </footer>
  );
};
