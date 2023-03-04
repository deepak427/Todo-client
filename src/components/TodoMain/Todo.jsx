import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCheckCircle,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteTodo, checkTodo } from "../../actions/todo";

const Todo = ({
  checked,
  todo,
  currentDate,
  dragStarted,
  dragDropped,
  index,
  dragOver,
}) => {
  const dispatch = useDispatch();

  const handledeleteTodo = () => {
    dispatch(
      deleteTodo({
        date: currentDate,
        todo,
      })
    );
  };

  const handleCheckTodo = () => {
    dispatch(
      checkTodo({
        date: currentDate,
        todo,
      })
    );
  };

  return (
    <>
      {checked ? (
        <div className="todo-container">
          {checked ? (
            <FontAwesomeIcon
              style={{ padding: "0.8rem 0.8rem 0.8rem 0", cursor: "pointer" }}
              icon={faCheckCircle}
              onClick={handleCheckTodo}
            />
          ) : (
            <FontAwesomeIcon
              style={{ padding: "0.8rem 0.8rem 0.8rem 0", cursor: "pointer" }}
              icon={faCircleDot}
              onClick={handleCheckTodo}
            />
          )}
          {todo}
          <FontAwesomeIcon
            style={{ padding: "0.8rem 0.8rem 0.8rem 0", cursor: "pointer" }}
            icon={faTrash}
            onClick={handledeleteTodo}
          />
        </div>
      ) : (
        <div
          draggable
          id={index}
          onDragStart={(e) => dragStarted(e, index)}
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => dragDropped(e, index)}
          className="todo-container"
        >
          {checked ? (
            <FontAwesomeIcon
              style={{ padding: "0.8rem 0.8rem 0.8rem 0", cursor: "pointer" }}
              icon={faCheckCircle}
              onClick={handleCheckTodo}
            />
          ) : (
            <FontAwesomeIcon
              style={{ padding: "0.8rem 0.8rem 0.8rem 0", cursor: "pointer" }}
              icon={faCircleDot}
              onClick={handleCheckTodo}
            />
          )}
          {todo}
          <FontAwesomeIcon
            style={{ padding: "0.8rem 0.8rem 0.8rem 0", cursor: "pointer" }}
            icon={faTrash}
            onClick={handledeleteTodo}
          />
        </div>
      )}
    </>
  );
};

export default Todo;
