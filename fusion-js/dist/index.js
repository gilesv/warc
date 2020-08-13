import Fusion from "./fusion.js";
function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
let SimpleComponent = ({ title }) => {
    return Fusion.createElement("div", { class: "simple", style: "display: 'inline'" },
        Fusion.createElement("div", { class: `$simple-{title}` },
            Fusion.createElement("span", null, title)));
};
function FizzBuzz() {
    let [todos, setTodos] = Fusion.useState([]);
    let [todo, setTodo] = Fusion.useState("");
    let handleChange = (e) => {
        setTodo(e.target.value);
    };
    let addTodo = () => {
        setTodos(todos.concat(todo));
        setTodo("");
    };
    Fusion.useEffect(() => {
        console.log("Todo list updated");
    }, [todos]);
    return (Fusion.createElement("div", { className: "todo-list" },
        Fusion.createElement("input", { type: "text", value: todo, onChange: handleChange }),
        Fusion.createElement("button", { onClick: addTodo }, "Add todo"),
        Fusion.createElement("ul", null, todos.map((todo) => Fusion.createElement("li", null, todo)))));
}
const Benchmark = () => {
    let [childNumber, setChildNumber] = Fusion.useState(1);
    let children = [];
    for (let i = 0; i < childNumber; i++) {
        let title;
        let n = random(0, 10);
        if (n % 2 === 0) {
            title = `abc${i}`;
        }
        else {
            title = `def${i}`;
        }
        children.push(Fusion.createElement(SimpleComponent, { title: title }));
    }
    if (childNumber < 5) {
        setTimeout(() => {
            setChildNumber(childNumber + 1);
        }, 0);
    }
    return children;
};
Fusion.render(Fusion.createElement(FizzBuzz, null), document.getElementById('root'));
