import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaSave } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

const API_URL = "http://localhost:5000/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");
  const [updateUI, setUpdateUI] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setTodos(res.data.data))
      .catch((err) => console.log(err));
  }, [updateUI]);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    axios
      .post(API_URL, { title: newTodo })
      .then((res) => {
        console.log(res.data);
        setNewTodo("");
        setUpdateUI((prevState) => !prevState);
      })
      .catch((err) => console.log(err));
  };
  const startEditing = (id, title) => {
    setEditTodoId(id);
    setEditTodoText(title);
  };

  const saveEdit = async () => {
    axios
      .put(`${API_URL}/${editTodoId}`, { title: editTodoText })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setEditTodoId(null);
        setEditTodoText("");
      })
      .catch((err) => console.log(err));
  };

  const deleteTodo = async (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="w-full max-w-md p-4 bg-[#1E201E] rounded shadow">
          <h1 className="text-2xl font-bold text-center mb-4 text-white">
            Todo App
          </h1>

          <div className="flex items-center mb-4">
            <input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              type="text"
              placeholder="Add a new task..."
              className="flex-1 p-2  rounded-l focus:outline-none bg-[#3C3D37] text-white "
            />
            <button
              className="bg-[#8b8b8b] text-white px-4 py-2 rounded-r hover:bg-[#555] duration-200"
              onClick={addTodo}
            >
              Add
            </button>
          </div>
          <ul className="space-y-2 overflow-y-auto max-h-96 pr-2">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex items-center justify-between bg-[#3C3D37] p-2 rounded text-white max-w-[472px] overflow-hidden"
              >
                {editTodoId === todo._id ? (
                  <input
                    type="text"
                    className="flex-1 p-1 mr-2  border rounded focus:outline-none bg-[#3C3D37] text-white"
                    value={editTodoText}
                    spellCheck
                    onChange={(e) => setEditTodoText(e.target.value)}
                  />
                ) : (
                  <span>{todo.title}</span>
                )}

                <div className="flex items-center space-x-2">
                  {editTodoId === todo._id ? (
                    <FaSave
                      className="text-[#8b8b8b] text-2xl hover:text-[#555] cursor-pointer duration-200"
                      onClick={saveEdit}
                    />
                  ) : (
                    <FaEdit
                      className="text-[#8b8b8b] text-2xl hover:text-[#555] cursor-pointer duration-200"
                      onClick={() => startEditing(todo._id, todo.title)}
                    />
                  )}
                  <MdDeleteSweep
                    className="text-[#8b8b8b] text-3xl hover:text-[#555] cursor-pointer duration-200"
                    onClick={() => deleteTodo(todo._id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
