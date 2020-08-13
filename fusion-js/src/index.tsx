import Fusion from "./fusion.js";

function random(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let SimpleComponent = ({ title }: {title:string}) => {
  return <div class="simple" style={"display: 'inline'"}>
    <div class={`$simple-{title}`}>
      <span>{title}</span>
    </div>
  </div>
};

function FizzBuzz() {
  let [todos, setTodos] = Fusion.useState([]);
  let [todo, setTodo] = Fusion.useState("");
  
  let handleChange = (e: any) => {
    setTodo(e.target.value);
  }

  let addTodo = () => {
    setTodos(todos.concat(todo));
    setTodo("");
  };

  Fusion.useEffect(() => {
    console.log("Todo list updated");
  }, [todos]);

  return (
    <div className="todo-list">
      <input type="text" value={todo} onChange={handleChange} />
      <button onClick={addTodo}>Add todo</button>
      <ul>
        {
          todos.map((todo: string) =>  <li>{todo}</li> )
        }
      </ul>
    </div>
  )
}

const Benchmark = () => {
  let [childNumber, setChildNumber] = Fusion.useState(1);
  let children = [];

  for (let i = 0; i < childNumber; i++) {
    let title;
    let n = random(0, 10);

    if (n % 2 === 0) {
      title = `abc${i}`;
    } else {
      title = `def${i}`
    }

    children.push(<SimpleComponent title={title} />);
  }

  if (childNumber < 5) {
    setTimeout(() => {
      setChildNumber(childNumber + 1);
    }, 0);
  }

  return children;
};

Fusion.render(<FizzBuzz />, document.getElementById('root')!);
