import React, { useState } from "react";
import Todo from "./Todo";

const TodoList = ({ todayTodo, currentDate }) => {
  const dragStarted = (e, index) => {
    var array;
    array = Array.from(
      Array(
        document.getElementsByClassName("todo-main-bar-uncompleted")[0]
          .childNodes.length - 1
      ).keys()
    );

    const arrayMain = [];

    array.map((index) => {
      arrayMain.push(
        parseInt(
          document.getElementsByClassName("todo-main-bar-uncompleted")[0]
            .childNodes[index + 1].id
        )
      );
    });

    const jsonObj = JSON.stringify({ arrayMain, indexDrop: index });
    e.dataTransfer.setData("TodoIndex", jsonObj);
  };

  const dragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const arrange = (array) => {
    const headerOne = document.getElementsByClassName(
      "todo-main-bar-uncompleted"
    )[0].childNodes[0];
    const swapedTodos = [];

    array.map((index) => {
      swapedTodos.push(document.getElementById(index.toString()));
    });

    document.getElementsByClassName("todo-main-bar-uncompleted")[0].innerHTML =
      "";
    document
      .getElementsByClassName("todo-main-bar-uncompleted")[0]
      .appendChild(headerOne);

    swapedTodos.map((element) => {
      document
        .getElementsByClassName("todo-main-bar-uncompleted")[0]
        .appendChild(element);
    });
  };

  const dragDropped = (e, index) => {
    e.preventDefault();
    var { arrayMain, indexDrop } = JSON.parse(
      e.dataTransfer.getData("TodoIndex")
    );

    indexDrop = arrayMain.indexOf(indexDrop);
    index = arrayMain.indexOf(index);

    const temp = arrayMain[indexDrop];
    arrayMain[indexDrop] = arrayMain[index];
    arrayMain[index] = temp;

    arrange(arrayMain);
  };

  return (
    <>
      {todayTodo?.totalTodos ? (
        <>
          <div className="todo-main-bar-uncompleted">
            <p>Today you have total {todayTodo.totalTodos.length} tasks</p>
            {todayTodo.totalTodos
              .reduce((acc, item) => [item].concat(acc), [])
              .map((todo, index) => (
                <Todo
                  dragStarted={dragStarted}
                  dragDropped={dragDropped}
                  dragOver={dragOver}
                  key={index}
                  checked={false}
                  currentDate={currentDate}
                  todo={todo}
                  index={index}
                />
              ))}
          </div>
          <h4 className="completed-h">Completed Tasks</h4>
          <p>Today you have completed {todayTodo.checkedTodos.length} tasks</p>
          {todayTodo.checkedTodos
            .reduce((acc, item) => [item].concat(acc), [])
            .map((todo, index) => (
              <Todo
                key={index}
                checked={true}
                currentDate={currentDate}
                todo={todo}
                index={index}
              />
            ))}
        </>
      ) : (
        <p>Today you have total 0 tasks</p>
      )}
    </>
  );
};

export default TodoList;
