import { useState } from 'react';
import Navbar from './Components/Navbar';
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = () => {

  };

  const handleDelete = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo('');
  };

  const handleTick = (e) => {
    const id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  
  return (
    <>
      <Navbar />
      <div className="md:container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
        <div className="addTodo">
          <h2 className="text-lg font-bold">Add a ToDo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-3/4"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6"
          >
            Add
          </button>
        </div>
        <h2 className="text-lg font-bold">YOUR TODOS</h2>
        <div className="Todos"> 
          {todos.length===0&&<div className='m-5'>No ToDos to Display</div>}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex justify-between w-1/2 m-2"
              >
                <div className='flex gap-5'>
                <input
                  type="checkbox"
                  onChange={handleTick}
                  value={item.isCompleted}
                  name={item.id}
                />

                <div className={item.isCompleted ? 'line-through' : ''}>
                  {item.todo}
                </div>
                </div>

                <div className="buttons">
                  <button
                    onClick={handleEdit}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    Save
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
