import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);
  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem('todos'));
      setTodos(todos);
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => {
      return item.id === id;
    });
    setTodo(t[0].todo);
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleDelete = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo('');
    saveToLocalStorage();
  };

  const handleTick = (e) => {
    const id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
        <div className="addTodo">
          <h2 className="text-3xl font-bold text-center">
            SnapTask : Think, Note, Do!
          </h2>
          <div className="flex flex-col gap-3 m-3">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter Your Task"
              className="w-full rounded-md px-2 h-8 flex placeholder:text-center"
            />
            <button
              onClick={handleAdd}
              className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 p-2 py-1 text-sm font-bold text-white rounded-md"
              disabled={todo.length <= 3}
            >
              Save
            </button>
          </div>
        </div>
        <input
          type="checkbox"
          onChange={toggleFinished}
          checked={showFinished}
          name=""
          id=""
        />
        <label htmlFor="show" className="mx-2">
          Show Finished
        </label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-lg font-bold">YOUR TODOS</h2>
        <div className="Todos">
          {todos.length === 0 && <div className="m-5">No ToDos to Display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex justify-between w-full m-2"
                >
                  <div className="flex gap-5">
                    <input
                      type="checkbox"
                      onChange={handleTick}
                      checked={item.isCompleted}
                      name={item.id}
                    />

                    <div className={item.isCompleted ? 'line-through' : ''}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
