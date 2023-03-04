import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "./TodoList";
import "./TodoMain.css";
import { addTodo } from "../../actions/todo";
import { fetchAllTodos } from "../../actions/todo";

const TodoMain = () => {
  const date = new Date();
  const dispatch = useDispatch();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate =
    monthNames[date.getMonth() - 1].slice(0, 3) +
    "' " +
    date.getDate().toString();

  const [showAddTodo, setShowAddTodo] = useState(false);
  const [todoBtnText, setTodoBtnText] = useState("Add Task");
  const [todo, setTodo] = useState("");

  const todoChange = () => {
    setShowAddTodo(!showAddTodo);
    !showAddTodo ? setTodoBtnText("Cancel") : setTodoBtnText("Add Task");
  };

  const handleAddTodo = () => {
    if (!todo) {
      alert("Todo can't be blank.");
      return;
    }
    dispatch(addTodo({
      date: currentDate,
      todo,
    }));
    setTodo("");
    todoChange();
  };

  const todoList = useSelector((state) => state.todosReducer);
  const todayTodo = todoList?.data?.filter(
    (Todo) => Todo.date === currentDate
  )[0];

  return (
    <div className="todo-main-bar">
      <div className="todo-main-header">
        <h1>Today's Tasks</h1>
        <button className="add-todo-btn" onClick={todoChange}>
          {todoBtnText}
        </button>
      </div>
      {showAddTodo && (
        <div className="add-todo-container">
          <div className="add-todo-container-header">
            <h4>Add a Task</h4>
            <button className="add-todo-btn" onClick={handleAddTodo}>
              Add Task
            </button>
          </div>
          <input
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            type="text"
          />
        </div>
      )}
      {todoList ? <TodoList currentDate={currentDate} todayTodo={todayTodo} /> : <h3>Loading...</h3>}
    </div>
  );
};

export default TodoMain;
